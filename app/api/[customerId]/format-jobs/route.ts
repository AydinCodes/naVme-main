import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { Client, GeocodeResult } from '@googlemaps/google-maps-services-js';
import { JobObject, UploadedJobObject } from '@/hooks/use-jobs';

  var api_key: string = process.env.PRIVATE_GOOGLE_MAPS_API_KEY!;

const client = new Client({});

const formatJobDetails = async (uploadedJobs: UploadedJobObject[]) => {
  const formattedJobs: JobObject[] = [];

  await Promise.all(
    uploadedJobs.map(async (uploadedJob) => {
      try {
        const r = await client.geocode({
          params: {
            key: api_key,
            address: uploadedJob.address,
          },
          timeout: 1000,
        });

        if (
          r.data &&
          r.data.results &&
          r.data.results[0] &&
          /^\d/.test(r.data.results[0].formatted_address)
        ) {
          const placeId = r.data.results[0].place_id;
          const address = r.data.results[0].formatted_address;
          const suburb = r.data.results[0].address_components[2].short_name;
          const state = r.data.results[0].address_components[4].short_name;
          const country = r.data.results[0].address_components[5].long_name;
          const lat = r.data.results[0].geometry.location.lat;
          const lng = r.data.results[0].geometry.location.lng;

          formattedJobs.push({
            customerName: uploadedJob.customer_name,
            jobId: uploadedJob.id,
            placeId: placeId,
            address: address,
            suburb: suburb,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
          });
        } else {
          formattedJobs.push({
            customerName: uploadedJob.customer_name,
            jobId: uploadedJob.id,
            placeId: '',
            address: uploadedJob.address,
            suburb: 'Address not found',
            state: '',
            country: '',
            lat: 0,
            lng: 0,
          });
        }
      } catch (e: any) {
        console.log(e.response?.data?.error_message);
      }
    })
  );
  return formattedJobs;
};

export async function POST(
  req: Request,
  { params }: { params: { customerId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    const customer = await prismadb.customer.findFirst({
      where: {
        id: params.customerId,
        userId,
      },
    });

    if (!customer) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const formattedJobDetails = await formatJobDetails(body);

    return NextResponse.json(formattedJobDetails);
  } catch (error) {
    console.log('[FORMAT-POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
