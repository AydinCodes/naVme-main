'use client'

import { JobObject } from "@/hooks/useJobs";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useMemo } from "react";

interface GoogleMapSettingsProps {

}

const GoogleMapSettings: React.FC<GoogleMapSettingsProps> = ({  }) => {
  const center = useMemo(() => ({ lat: -37.8176665, lng: 144.9672122 }), []);

  return (
    <GoogleMap
      zoom={15}
      center={center}
      mapContainerClassName="w-[60%] rounded-[0.5rem]"
    >
    </GoogleMap>
  );
};

export default GoogleMapSettings;
