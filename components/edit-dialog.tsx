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
import { CheckSquare, Edit, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useJobs } from '@/hooks/use-jobs';
import GooglePlacesSearch from '@/components/google-places-search';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { JobObject, SelectedJobObject } from '@/types/job-types';

interface EditDialogProps {
  jobId: string;
}


const EditDialog: React.FC<EditDialogProps> = ({ jobId }) => {
  const { getJobById, editJobById } = useJobs();

  const job = getJobById(jobId);

  const [customerName, setCustomerName] = useState(job ? job.customerName : '');
  const [editAddress, setEditAddress] = useState(false);
  const [newJobDetails, setNewJobDetails] = useState<SelectedJobObject>(
    job
      ? {
          address: job.address,
          suburb: job.suburb,
          country: job.country,
          jobId: job.jobId,
          state: job.state,
          placeId: job.placeId,
          lat: job.lat,
          lng: job.lng,
        }
      : {
          address: '',
          suburb: '',
          country: '',
          jobId: '',
          state: '',
          placeId: '',
          lat: 0,
          lng: 0,
        }
  );
  const address = job ? job.address : 'No address found';

  const handleCancel = () => {
    setEditAddress(false);
  };

  const handleChanges = () => {
    if (newJobDetails.address.length > 0) {
      const updatedDetails = {
        customerName: customerName,
        address: newJobDetails.address,
        state: newJobDetails.state,
        country: newJobDetails.country,
        jobId: jobId,
        suburb: newJobDetails.suburb,
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
    setNewJobDetails({
      address: selectedJob.address,
      suburb: selectedJob.suburb,
      state: selectedJob.state,
      country: selectedJob.country,
      jobId: jobId,
      placeId: selectedJob.placeId,
      lat: selectedJob.lat,
      lng: selectedJob.lng,
    });
    setEditAddress(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Update Job</DialogTitle>
          <DialogDescription>
            Click save once the changes are finished.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-between items-center space-y-6">
          <div className="flex flex-row w-full items-center justify-between">
            <Label  className={cn("font-bold", (customerName.length === 0) && "text-red-600")}>Customer Name: </Label>
            <Input
              className="outline-none w-[70%]"
              onChange={(e) => setCustomerName(e.target.value)}
              value={customerName}
            />
          </div>
          <div className="flex items-center gap-4 w-[100%]">
            <Label className={cn("text-right font-bold", (newJobDetails.suburb === 'Address not found') && "text-red-600")}>Address:</Label>
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
            {!editAddress ? (
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
                newJobDetails.suburb === 'Address not found') &&
                'hover:cursor-not-allowed'
            )}
            disabled={
              customerName.length === 0 ||
              newJobDetails.suburb === 'Address not found'
            }
          >
            <Button
              disabled={
                customerName.length === 0 ||
                newJobDetails.suburb === 'Address not found'
              }
              onClick={handleChanges}
              variant={'default'}
            >
              Save
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
