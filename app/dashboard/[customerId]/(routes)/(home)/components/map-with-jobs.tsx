"use client";

import GooglePlacesSearch from "@/components/google-places-search";
import JobList from "./job-list";
import { JobObject, useJobs } from "@/hooks/use-jobs";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import { LatLng } from "use-places-autocomplete";

type Origin = {
  lat: LatLng | LatLngLiteral | undefined;
  lng: LatLng | LatLngLiteral | undefined;
};

interface MapWithJobsProps {
  origin: Origin;
}

const MapWithJobs: React.FC<MapWithJobsProps> = ({ origin }) => {
  const center =
    useMemo(() => ({ lat: origin.lat, lng: origin.lng }), []) ||
    useMemo(() => ({ lat: -37.8176665, lng: 144.9672122 }), []);

  const { addJob, jobs } = useJobs();

  const handleSelect = (selectedJob: JobObject) => {
    addJob(selectedJob);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-between h-[85vh]">
      <div className="w-[43%] h-[100%] relative flex flex-col justify-between">
        <GooglePlacesSearch
          className="w-[100%] z-[2]"
          handleSelected={handleSelect}
          placeholder="Type an address."
        />
        <JobList jobs={jobs} className="absolute bottom-0 z-[1]" />
      </div>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="w-[55%] rounded-[0.5rem]"
      >
        {jobs.map((job) => (
          <Marker key={job.jobId} position={{ lat: job.lat, lng: job.lng }} />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapWithJobs;
