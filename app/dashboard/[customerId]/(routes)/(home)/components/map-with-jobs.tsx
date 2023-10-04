"use client";

import GooglePlacesSearch from "@/components/google-places-search";
import JobList from "./job-list";
import { JobObject, useJobs } from "@/hooks/use-jobs";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import { LatLng } from "use-places-autocomplete";

interface Origin {
  lat: number
  lng: number
};

interface MapWithJobsProps {
  origin: Origin;
}

const MapWithJobs: React.FC<MapWithJobsProps> = ({ origin }) => {
  const center =
    useMemo(() => ({ lat: origin.lat, lng: origin.lng }), [origin.lat, origin.lng])
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
        zoom={15}
        center={center}
        mapContainerClassName="w-[55%] rounded-[0.5rem]"
      >
        {jobs.map((job) => (
          <Marker key={job.jobId} position={{ lat: job.lat, lng: job.lng }} />
        ))}
      {/* <Marker position={{ lat: origin.lat, lng: origin.lng }} /> */}
          {/* testing commit */}
      </GoogleMap>
    </div>
  );
};

export default MapWithJobs;
