"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import GooglePlacesSearch from "@/components/google-places-search";
import { JobObject } from "@/hooks/useJobs";
import { useLoadScript } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Your name is too short. Please enter a valid name.")
    .max(50, "Your name is too long. Please enter a valid name."),
  vehicles: z.number().int().gte(1).lte(30),
});

type SettingsFormValues = z.infer<typeof formSchema>;

type CustomerSettings = {
  name: string;
  address: string;
  vehicles: number;
};

interface SettingsFormProps {
  initialSettings: CustomerSettings;
}

interface NewAddressDetails
  extends Omit<JobObject, "jobId" | "placeId" | "suburb"> {}

const SettingsForm: React.FC<SettingsFormProps> = ({ initialSettings }) => {
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [newAddressDetails, setNewAddressDetails] = useState<NewAddressDetails>(
    {
      address: "",
      state: "",
      country: "",
      lat: 0,
      lng: 0,
    }
  );

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialSettings,
  });
  
  const { register, handleSubmit } = form;
  

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
        console.log(typeof(data.vehicles))
      
      let newData = {
        name: data.name,
        vehicles: data.vehicles,
      };

      if (newAddressDetails.address.length > 0) {
        newData = {
          ...newData,
          ...newAddressDetails,
        };
      }

      await axios.patch(`/api/${params.customerId}/settings`, newData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (selectedAddress: JobObject) => {
    setNewAddressDetails({
      address: selectedAddress.address,
      state: selectedAddress.state,
      country: selectedAddress.country,
      lat: selectedAddress.lat,
      lng: selectedAddress.lng,
    });
    setEditAddress(false);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      disabled={loading}
                      maxLength={64}
                      placeholder="Enter your name/business name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoaded ? (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <GooglePlacesSearch
                    handleSelected={handleSelect}
                    placeholder="Enter origin address."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            ) : (
              <div>Loading...</div>
            )}

<FormField
  control={form.control}
  name="vehicles"
  render={() => (
    <FormItem>
      <FormLabel>Vehicles</FormLabel>
      <FormControl>
        <Input
          type="number"
          {...register('vehicles', { valueAsNumber: true })}
          min={1}
          max={30}
          autoComplete="off"
          disabled={loading}
          maxLength={64}
          placeholder="Enter the number of vehicles you are operating with."
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

          </div>
          <Button disabled={loading} type="submit">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SettingsForm;
