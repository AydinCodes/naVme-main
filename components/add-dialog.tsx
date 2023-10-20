'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CheckSquare, Edit, Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { JobObject, useJobs } from '@/hooks/use-jobs';
import GooglePlacesSearch from '@/components/google-places-search';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

interface AddDialogProps {}

type SelctedJobObject = Omit<JobObject, 'customerName'>;

const AddDialog: React.FC<AddDialogProps> = ({}) => {
  const [customerName, setCustomerName] = useState('');
  const [editAddress, setEditAddress] = useState(false);
  const [newJobDetails, setNewJobDetails] = useState<SelctedJobObject>({
    address: '',
    suburb: '',
    country: '',
    jobId: '',
    state: '',
    placeId: '',
    lat: 0,
    lng: 0,
  });
  const { addJob } = useJobs();

  const handleCancel = () => {
    setNewJobDetails({
      address: '',
      suburb: '',
      country: '',
      jobId: '',
      state: '',
      placeId: '',
      lat: 0,
      lng: 0,
    });
    setEditAddress(false);
    setCustomerName("")

  };

  const handleChanges = () => {
    if (newJobDetails.address.length > 0 && customerName.length > 0) {
      const jobDetails = {
        customerName: customerName,
        address: newJobDetails.address,
        state: newJobDetails.state,
        country: newJobDetails.country,
        jobId: newJobDetails.jobId,
        suburb: newJobDetails.suburb,
        placeId: newJobDetails.placeId,
        lat: newJobDetails.lat,
        lng: newJobDetails.lng,
      };
      addJob(jobDetails)
      handleCancel();
    } else {
      handleCancel();
    }
  };

  const handleSelect = (selectedJob: SelctedJobObject) => {
    setNewJobDetails({
      address: selectedJob.address,
      suburb: selectedJob.suburb,
      state: selectedJob.state,
      country: selectedJob.country,
      jobId: selectedJob.jobId,
      placeId: selectedJob.placeId,
      lat: selectedJob.lat,
      lng: selectedJob.lng,
    });
    setEditAddress(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'default'}>
          <span className="flex flex-row items-center w-full space-x-4 justify-center">
            <Plus className="mr-2" />
            Add Job
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add Job</DialogTitle>
          <DialogDescription>
            Click add once you have added a customer name and address.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-between items-center space-y-6">
          <div className="flex flex-row w-full items-center justify-between">
            <Label className={cn("font-bold", (customerName.length === 0) && "text-red-600")}>Customer Name: </Label>
            <Input
              className="outline-none w-[70%]"
              onChange={(e) => setCustomerName(e.target.value)}
              value={customerName}
            />
          </div>
          <div className="flex items-center gap-4 w-[100%]">
            <Label className={cn("text-right font-bold", (newJobDetails.suburb === '') && "text-red-600")}>Address:</Label>
            <div className="relative w-[80%] h-[2rem] flex items-center">
              {!editAddress && newJobDetails.address.length > 0 ? (
                <Label>{newJobDetails.address}</Label>
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
            {!editAddress && newJobDetails.address.length > 0 ? (
              <Button
                onClick={() => setEditAddress(true)}
                size={'icon'}
                variant={'ghost'}
              >
                <Edit />
              </Button>
            ) : (
              <Button
                onClick={() => setEditAddress(false)}
                size={'icon'}
                variant={'ghost'}
              >
                <CheckSquare />
              </Button>
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger>
            <Button onClick={handleCancel} variant={'secondary'}>
              Cancel
            </Button>
          </DialogTrigger>
          <DialogTrigger
          className={cn(
            (customerName.length === 0 ||
              newJobDetails.suburb === '') &&
              'hover:cursor-not-allowed'
          )}
          disabled={
            customerName.length === 0 ||
            newJobDetails.suburb === ''
          }>
            <Button
              disabled={
                customerName.length === 0 ||
                newJobDetails.suburb === ''
              }
              onClick={handleChanges}
              variant={'default'}
            >
              Add
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
