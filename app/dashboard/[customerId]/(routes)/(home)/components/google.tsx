"use client";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { au } from "@/lib/coordinates";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const country = au;

const Google = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Map />
    </div>
  );
};

const Map = () => {
  const center = useMemo(() => ({ lat: -37.8176665, lng: 144.9672122 }), []);
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex space-x-[10rem]">
      <PlacesAutocomplete setSelected={setSelected} />
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="w-[60%] h-[80vh]"
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </div>
  );
};

const PlacesAutocomplete = ({ setSelected }: any) => {
  const [showResults, setShowResults] = useState(false);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["address"],
      componentRestrictions: {
        country: "au",
      },
      locationRestriction: country.vic,
    },
  });

  const handleSelect = async (address: any) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <div className="w-[80%]">
      <Command
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
      >
        <CommandInput
          placeholder="Type an address."
          value={value}
          onValueChange={(e) => setValue(e)}
          disabled={!ready}
        />

        <CommandList>
          <CommandEmpty hidden={!showResults}>No results found.</CommandEmpty>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <CommandItem onSelect={handleSelect} key={place_id}>
                {description}
              </CommandItem>
            ))}
        </CommandList>
      </Command>
    </div>
  );
};

export default Google;


// save address value in a state to keep the capitalization