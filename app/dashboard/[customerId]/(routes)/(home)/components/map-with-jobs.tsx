"use client";

import { useMemo, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import GooglePlacesSearch from "./google-places-search";
import JobList from "./job-list";
import { JobObject, useJobs } from "@/hooks/useJobs";

const MapWithJobs = () => {
  const center = useMemo(() => ({ lat: -37.8176665, lng: 144.9672122 }), []);
  const [selected, setSelected] = useState(null);

  const { addJob } = useJobs();

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
        <JobList className="absolute bottom-0 z-[1]" />
      </div>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="w-[60%] rounded-[0.5rem]"
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </div>
  );
};

export default MapWithJobs;
