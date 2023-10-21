'use client';

import JobList from './job-list';
import { useJobs } from '@/hooks/use-jobs';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';
import { CenterPageLoading } from '@/components/loading';
import UploadButton from './upload-button';

interface Origin {
  lat: number;
  lng: number;
}

interface MapWithJobsProps {
  origin: Origin;
}
const libraries: ('places' | 'geometry' | 'drawing' | 'visualization')[] = [
  'places',
];

const MapWithJobs: React.FC<MapWithJobsProps> = ({ origin }) => {
  const center = useMemo(
    () => ({ lat: origin.lat, lng: origin.lng }),
    [origin.lat, origin.lng]
  );
  const { jobs } = useJobs();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
  });

  if (!isLoaded) {
    return <CenterPageLoading />;
  }

  return (
    <div className="flex flex-col justify-between md:flex-row md:h-[85vh] h-[100vh]">
      <div className="w-full md:w-[46%] md:h-[100%] relative flex flex-col justify-between">
        <UploadButton />
        <JobList jobs={jobs} className="md:absolute z-[1] mt-[2rem]" />
      </div>
      <div className="w-full md:w-[50%] h-full">
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="w-full h-full rounded-[0.5rem]"
      >
        {jobs.map((job) => (
          <MarkerF
            key={job.jobId}
            position={{ lat: job.lat, lng: job.lng }}
            icon={{
              url: '/red.svg',
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            zIndex={1000}
          />
        ))}
        <MarkerF
          key={'origin'}
          position={center}
          icon={{
            url: '/green.svg',
            scaledSize: new window.google.maps.Size(45, 45),
          }}
        />
      </GoogleMap>
      </div>
    </div>
  );
};

export default MapWithJobs;
