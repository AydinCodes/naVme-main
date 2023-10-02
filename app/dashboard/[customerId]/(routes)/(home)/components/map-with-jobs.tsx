"use client";

import GooglePlacesSearch from "@/components/google-places-search";
import JobList from "./job-list";
import { JobObject, useJobs } from "@/hooks/useJobs";
import GoogleMapContainer from "./google-map-container";
import { useLoadScript } from "@react-google-maps/api";

const MapWithJobs = () => {

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
      <GoogleMapContainer jobs={jobs} />
    </div>
  );
};

export default MapWithJobs;
