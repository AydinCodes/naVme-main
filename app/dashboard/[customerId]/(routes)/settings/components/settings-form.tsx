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

const formSchema = z.object({
  name: z.string().min(2).max(50),
  address: z.string().min(2).max(50),
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

const SettingsForm: React.FC<SettingsFormProps> = ({ initialSettings }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialSettings,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    console.log(data);
  };

  const handleSelect = (selectedJob: JobObject) => {
    console.log("Selected settings form: ", selectedJob);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}></form>

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
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
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
            )}
          />
          <FormField
            control={form.control}
            name="vehicles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicles</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    disabled={loading}
                    maxLength={64}
                    placeholder="Enter the number of vehicles you are opperating with."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </div>
  );
};

export default SettingsForm;
