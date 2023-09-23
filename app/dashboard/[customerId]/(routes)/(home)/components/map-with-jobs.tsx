"use client";

import GooglePlacesSearch from "./google-places-search";
import JobList from "./job-list";
import { JobObject, useJobs } from "@/hooks/useJobs";
import GoogleMapContainer from "./google-map-container";

const MapWithJobs = () => {

  const { addJob, jobs } = useJobs();

  const handleSelect = (selectedJob: JobObject) => {
    addJob(selectedJob);
  };

  return (
    <div className="flex justify-between h-[85vh]">
      <div className="w-[38%] h-[100%] relative flex flex-col justify-between">
        <GooglePlacesSearch
          className="w-[100%] z-[2]"
          handleSelected={handleSelect}
        />
        <JobList jobs={jobs} className="absolute bottom-0 z-[1]" />
      </div>
      <GoogleMapContainer jobs={jobs} />
    </div>
  );
};

export default MapWithJobs;
