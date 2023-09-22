"use client";
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
import { useEffect, useState } from "react";
import GooglePlacesSearch from "./google-places-search";

interface EditDialogProps {
  jobId: string;
}

const EditDialog: React.FC<EditDialogProps> = ({ jobId }) => {
  const [editAddress, setEditAddress] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const { getJobById, editJobById } = useJobs();
  const address = getJobById(jobId)?.address;
  
  const handleCancel = () => {
    setNewAddress("");
    setEditAddress(false);
  };

  const handleChanges = () => {
    const updatedDetails = {
      address: newAddress,
    };

    editJobById(jobId, updatedDetails);
  };

  const handleSelect = (selectedJob: JobObject) => {
    setNewAddress(selectedJob.address);
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
                <Label>{newAddress.length > 0 ? newAddress : address}</Label>
              ) : (
                <div className="absolute left-0 top-[-0.4rem] w-[100%]">
                  <GooglePlacesSearch
                    className="z-[2]"
                    handleSelected={handleSelect}
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
