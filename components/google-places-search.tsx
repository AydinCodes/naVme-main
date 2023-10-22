'use client';
import { v4 as uuidv4 } from 'uuid';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { au } from '@/lib/coordinates';
import { useRef, useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { JobObject, SelectedJobObject } from '@/types/job-types';
import { cn } from '@/lib/utils';
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
      types: ['address'],
      componentRestrictions: {
        country: 'au',
      },
      locationRestriction: country.vic,
    },
  });

  const handleSelect = async (
    address: string,
    place_id: string,
    terms: google.maps.places.PredictionTerm[]
  ) => {
    setShowResults(false);
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    const jobId = uuidv4();
    if (terms.length === 5) {
      const selectedJob: SelectedJobObject = {
        jobId: jobId,
        address: address,
        suburb: terms[2].value,
        state: terms[3].value,
        country: terms[4].value,
        placeId: place_id,
        lat,
        lng,
      };
      handleSelected(selectedJob);
    } else if (terms.length === 4) {
      const selectedJob: SelectedJobObject = {
        jobId: jobId,
        address: address,
        suburb: terms[1].value,
        state: terms[2].value,
        country: terms[3].value,
        placeId: place_id,
        lat,
        lng,
      };
      handleSelected(selectedJob);
    }

    setValue('', false);
    clearSuggestions();
  };

  return (
    <div className={cn(className, "relative z-[40]")}>
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
        className="border "
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
          {status === 'OK' &&
            showResults &&
            data.map(({ place_id, description, terms }) => (
              <CommandItem
                onSelect={() => {
                  itemSelectedRef.current = true;
                  handleSelect(description, place_id, terms);
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
