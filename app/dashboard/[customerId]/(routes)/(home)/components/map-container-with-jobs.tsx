"use client";


import { useLoadScript} from "@react-google-maps/api";

import MapWithJobs from "./map-with-jobs";



const MapContainerWithJobs = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MapWithJobs />
    </div>
  );
};




export default MapContainerWithJobs;
