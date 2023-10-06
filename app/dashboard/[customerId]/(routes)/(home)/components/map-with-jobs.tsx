"use client";

import GooglePlacesSearch from "@/components/google-places-search";
import JobList from "./job-list";
import { JobObject, useJobs } from "@/hooks/use-jobs";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import nxtIcon from "../../../../../../public/next.svg"

interface Origin {
  lat: number;
  lng: number;
}

interface MapWithJobsProps {
  origin: Origin;
}
const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = ["places"];


const MapWithJobs: React.FC<MapWithJobsProps> = ({ origin }) => {


  const center = useMemo(
    () => ({ lat: origin.lat, lng: origin.lng }),
    [origin.lat, origin.lng]
  );
  const { addJob, jobs } = useJobs();

  const handleSelect = (selectedJob: JobObject) => {
    addJob(selectedJob);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
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
          <MarkerF key={job.jobId} position={{ lat: job.lat, lng: job.lng }} icon={{url: "/red.svg", scaledSize: new window.google.maps.Size(40, 40)}} zIndex={1000}/>
        ))}
        <MarkerF
          key={"origin"}
          onClick={() => console.log("origin clicked")}
          position={center}
          icon={{url: "/green.svg", scaledSize: new window.google.maps.Size(45, 45)}}
        />
      </GoogleMap>
    </div>
  );
};

export default MapWithJobs;


