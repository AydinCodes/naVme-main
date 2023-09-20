"use client";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { au } from "@/lib/coordinates";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

interface AddressObject {
  description: string;
  place_id: string;
  lat: number;
  lng: number;
}

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
  const [addresses, setAddresses] = useState<AddressObject[]>([]);
  return (
    <div className="flex justify-between">
      <div className="w-[40%] relative">
        <PlacesAutocomplete
          setAddresses={setAddresses}
          className="w-[80%] z-[2] absolute"
          setSelected={setSelected}
        />
        <AddressList
          addresses={addresses}
          className="absolute top-[6rem] left-0 z-[1]"
        />
      </div>
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

interface PlacesAutocompleteProps {
  setSelected: any;
  setAddresses: any;
  className: string;
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
  setSelected,
  setAddresses,
  className,
}) => {
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

  const handleSelect = async (address: string, place_id: string) => {
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);

    // Create an address object with description, place_id, and lat/lng
    const selectedAddress: AddressObject = {
      description: address,
      place_id: place_id,
      lat,
      lng,
    };

    setAddresses((prevAddresses: AddressObject[]) => [...prevAddresses, selectedAddress]);
    setValue('', false);
    clearSuggestions();

    setSelected({ lat, lng });
  };

  return (
    <div className={className}>
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

        <CommandList className="bg-white dark:bg-slate-950">
          <CommandEmpty hidden={!showResults}>No results found.</CommandEmpty>
          {status === "OK" &&
            data.map(({ place_id, description}) => (
              <CommandItem
                onSelect={() => handleSelect(description, place_id)}
                key={place_id}
              >
                {description}
              </CommandItem>
            ))}
        </CommandList>
      </Command>
    </div>
  );
};

interface AddressListProps {
  className?: string;
  addresses?: AddressObject[];
}

const AddressList: React.FC<AddressListProps> = ({ className, addresses }) => {
  return (
    <div className={className}>
      <div className="flex flex-col space-y-[2rem]">
      {addresses?.map((address) => (
        <Label key={address.place_id}>{address.description}</Label>
      ))}</div>
    </div>
  );
};

export default Google;

// save address value in a state to keep the capitalization
