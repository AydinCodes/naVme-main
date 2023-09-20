"use client";

import React, { useState } from "react";
import usePlacesAutoComplete from "use-places-autocomplete";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";


interface PlacesAutocompleteProps {
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}

type LatLng = {
  lat: number;
  lng: number;
};

type LatLngBoundsLiteral = {
  south: number;
  west: number;
  north: number;
  east: number;
};

function getBounds(center: LatLng, radiusInMeters: number): LatLngBoundsLiteral {
  const LATITUDE_IN_METERS = 111000; // Approximate latitude distance in meters per degree
  const dLat = radiusInMeters / LATITUDE_IN_METERS;
  const dLng = radiusInMeters / (LATITUDE_IN_METERS * Math.cos((Math.PI / 180) * center.lat));

  return {
    north: center.lat + dLat,
    south: center.lat - dLat,
    east: center.lng + dLng,
    west: center.lng - dLng
  };
}

// Usage:
const centerPoint = { lat: -37.577706570838934, lng: 143.80130135745281 };
const radius = 10000; // 10 kilometers
const bounds = getBounds(centerPoint, radius);

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({selectedValue, setSelectedValue}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      types: ["address"],
      componentRestrictions: {
        country: "au",
      },
      locationRestriction: bounds
  }});

  const [open, setOpen] = useState(false);

  const handleSelect = (address: string) => {
    setValue(address);
    setSelectedValue(() => address);
    clearSuggestions();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100%] justify-between"
        >
          {selectedValue ? selectedValue : "Event/Dropoff Address..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[20rem] sm:w-[29rem] p-0 translate-x-0 translate-y-0">
        <Command>
          <CommandInput
            value={value}
            onValueChange={(e) => setValue(e)}
            placeholder="Enter your event's address..."
            disabled={!ready}
          />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <CommandItem
                  onSelect={() => handleSelect(description)}
                  key={place_id}
                >
                  {description}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PlacesAutocomplete;