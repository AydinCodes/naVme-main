"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckSquare, Edit, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { JobObject, useJobs } from "@/hooks/useJobs";
import GooglePlacesSearch from "@/components/google-places-search";

interface EditDialogProps {
  jobId: string;
}

interface NewJobDetails extends Omit<JobObject, "jobId" | "suburb" | "state" | "country"> {}


const EditDialog: React.FC<EditDialogProps> = ({ jobId }) => {
  const [editAddress, setEditAddress] = useState(false);
  const [newJobDetails, setNewJobDetails] = useState<NewJobDetails>({
    address: "",
    placeId: "",
    lat: 0,
    lng: 0,
  });
  const { getJobById, editJobById } = useJobs();
  const address = getJobById(jobId)?.address;

  const handleCancel = () => {
    setNewJobDetails({
      address: "",
      placeId: "",
      lat: 0,
      lng: 0,
    });
    setEditAddress(false);
  };

  const handleChanges = () => {
    if (newJobDetails.address.length > 0) {
      const updatedDetails = {
        address: newJobDetails.address,
        placeId: newJobDetails.placeId,
        lat: newJobDetails.lat,
        lng: newJobDetails.lng,
      };

      editJobById(jobId, updatedDetails);
      handleCancel();
    } else {
      handleCancel();
    }
  };

  const handleSelect = (selectedJob: JobObject) => {
    console.log(selectedJob);
    setNewJobDetails({
      address: selectedJob.address,
      placeId: selectedJob.placeId,
      lat: selectedJob.lat,
      lng: selectedJob.lng,
    });
    setEditAddress(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[10rem] h-[14rem]">
        <DialogHeader>
          <DialogTitle>Update Job</DialogTitle>
          <DialogDescription>
            Click save once the changes are finished.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 w-[100%]">
            <Label className="text-right font-bold">Address:</Label>
            <div className="relative w-[80%] h-[2rem] flex items-center">
              {!editAddress ? (
                <Label>
                  {newJobDetails.address.length > 0
                    ? newJobDetails.address
                    : address}
                </Label>
              ) : (
                <div className="absolute left-0 top-[-0.4rem] w-[100%]">
                  <GooglePlacesSearch
                    className="z-[2]"
                    handleSelected={handleSelect}
                    placeholder="Type an address."
                  />
                </div>
              )}
            </div>
          </div>
          {!editAddress ? (
            <Button
              onClick={() => setEditAddress(true)}
              size={"icon"}
              variant={"ghost"}
            >
              <Edit />
            </Button>
          ) : (
            <Button
              onClick={() => setEditAddress(false)}
              size={"icon"}
              variant={"ghost"}
            >
              <CheckSquare />
            </Button>
          )}
        </div>
        <DialogFooter>
          <DialogTrigger>
            <Button onClick={handleCancel} variant={"secondary"}>
              Cancel
            </Button>
          </DialogTrigger>
          <DialogTrigger>
            <Button onClick={handleChanges} variant={"default"}>
              Save
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
