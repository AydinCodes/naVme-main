"use client";
import { v4 as uuidv4 } from "uuid";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { JobObject } from "@/hooks/useJobs";
import { au } from "@/lib/coordinates";
import { useRef, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
const country = au;

interface GooglePlacesSearchProps {
  handleSelected: any;
  className?: string;
  placeholder: string;
}

const GooglePlacesSearch: React.FC<GooglePlacesSearchProps> = ({
  handleSelected,
  className,
  placeholder,
}) => {
  const [showResults, setShowResults] = useState(false);
  const itemSelectedRef = useRef(false);

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

  const handleSelect = async (
    address: string,
    place_id: string,
    suburb: string,
    state: string,
    country: string
  ) => {
    setShowResults(false);
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    const jobId = uuidv4();
    const selectedJob: JobObject = {
      jobId: jobId,
      address: address,
      suburb: suburb,
      state: state,
      country: country,
      placeId: place_id,
      lat,
      lng,
    };

    handleSelected(selectedJob);
    setValue("", false);
    clearSuggestions();
  };

  return (
    <div className={className}>
      <Command
        onFocus={() => setShowResults(true)}
        onBlur={() => {
          setTimeout(() => {
            if (!itemSelectedRef.current) {
              setShowResults(false);
            }
            itemSelectedRef.current = false;
          }, 120);
        }}
        className="border"
      >
        <CommandInput
          placeholder={placeholder}
          value={value}
          onValueChange={(e) => setValue(e)}
          disabled={!ready}
          className=""
        />

        <CommandList className="bg-white dark:bg-slate-950">
          <CommandEmpty hidden={!showResults}>No results found.</CommandEmpty>
          {status === "OK" &&
            showResults &&
            data.map(({ place_id, description, terms }) => (
              <CommandItem
                onSelect={() => {
                  itemSelectedRef.current = true;
                  const suburb = terms[2].value;
                  const state = terms[3].value;
                  const country = terms[4].value;
                  handleSelect(description, place_id, suburb, state, country);
                }}
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

export default GooglePlacesSearch;
