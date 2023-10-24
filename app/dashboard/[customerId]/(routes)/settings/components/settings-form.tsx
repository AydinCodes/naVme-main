'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect, useMemo, useState } from 'react';
import GooglePlacesSearch from '@/components/google-places-search';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { CheckSquare, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Loading } from '@/components/loading';
import { JobObject } from '@/types/job-types';
import { CenterPageLoading } from '@/components/loading';
import { CustomerSettingsInterface } from '@/types/customer-types';

const formSchema = z.object({
  name: z
    .string()
    .min(3, 'Your name is too short. Please enter a valid name.')
    .max(50, 'Your name is too long. Please enter a valid name.'),
  vehicles: z.number().int().gte(1).lte(30),
});

type SettingsFormValues = z.infer<typeof formSchema>;

interface InitialSettingsInterface {
  name: string;
  lat: number;
  lng: number;
  vehicles: number;
  address: string;
}

interface SettingsFormProps {
  initialSettings: InitialSettingsInterface;
}

const libraries: ('places' | 'geometry' | 'drawing' | 'visualization')[] = [
  'places',
];

const SettingsForm: React.FC<SettingsFormProps> = ({ initialSettings }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const [newAddressDetails, setNewAddressDetails] =
    useState<CustomerSettingsInterface>({
      address: initialSettings.address,
      lat: initialSettings.lat,
      lng: initialSettings.lng,

    });



  useEffect(() => {
    if (initialSettings.address.length > 0) {
      setEditAddress(false);
    } else {
      setEditAddress(true);
    }
  }, [initialSettings]);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialSettings.name,
      vehicles: initialSettings.vehicles,
    },
  });

  const { register, handleSubmit } = form;

  const onSubmit = async (data: SettingsFormValues) => {
    if (newAddressDetails.address.length > 0) {
      try {
        setLoading(true);

        let newData = {
          name: data.name,
          vehicles: data.vehicles,
        };

        if (newAddressDetails.address.length > 0) {
          newData = {
            ...newData,
            ...newAddressDetails,
          };
        }

        await axios.patch(`/api/${params.customerId}/settings`, newData);

        router.refresh();

        toast({
          variant: 'default',
          title: 'Awesome!',
          description: 'Your settings have been updated.',
        });
        router.push(`/dashboard/${params.customerId}`);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh.',
          description: 'Something went wrong.',
        });
      } finally {
        setLoading(false);
      }
    } else {
      setAddressError(true);
    }
  };

  const handleSelect = (selectedAddress: JobObject) => {
    setNewAddressDetails({
      ...newAddressDetails,
      address: selectedAddress.address,
      lat: selectedAddress.lat,
      lng: selectedAddress.lng,
    });
    setEditAddress(false);
    setAddressError(false);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
  });

  if (!isLoaded) {
    return <CenterPageLoading />;
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      disabled={loading}
                      maxLength={64}
                      placeholder="Enter your name/business name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vehicles"
              render={() => (
                <FormItem>
                  <FormLabel className="font-bold">Vehicles</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...register('vehicles', { valueAsNumber: true })}
                      min={1}
                      max={30}
                      autoComplete="off"
                      disabled={loading}
                      maxLength={64}
                      placeholder="Enter the number of vehicles you are operating with."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel
                className={cn(
                  'font-bold',
                  newAddressDetails.address.length === 0
                    ? 'text-destructive'
                    : ''
                )}
              >
                Address
              </FormLabel>
              <div>
                <div className="flex items-center gap-4 w-[100%] justify-between">
                  <FormControl>
                    <div className="relative w-[80%] md:w-[90%] lg:w-[95%] h-[2rem] flex items-center">
                      {editAddress ? (
                        isLoaded ? (
                          <div className="absolute left-0 top-[-0.4rem] w-[100%]">
                            <GooglePlacesSearch
                              className="absolute top-0 left-0"
                              handleSelected={handleSelect}
                              placeholder="Enter origin address."
                              restrictions={false}
                            />
                          </div>
                        ) : (
                          <Loading />
                        )
                      ) : (
                        <Label>{newAddressDetails.address}</Label>
                      )}
                    </div>
                  </FormControl>
                  <Button
                    disabled={newAddressDetails.address.length === 0}
                    onClick={() => setEditAddress(!editAddress)}
                    size={'icon'}
                    variant={'ghost'}
                    type="button"
                  >
                    {editAddress === true ? <CheckSquare /> : <Edit />}
                  </Button>
                </div>
              </div>
              {newAddressDetails.address.length === 0 && (
                <p className={'text-sm font-medium text-destructive'}>
                  Please enter an address before starting.
                </p>
              )}
            </FormItem>

            <div className="w-full flex justify-end">
              <Button
                className="md:w-auto w-full"
                disabled={loading || newAddressDetails.address.length === 0}
                type="submit"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SettingsForm;
