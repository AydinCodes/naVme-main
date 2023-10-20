'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useJobs } from '@/hooks/use-jobs';
import { Trash2 } from 'lucide-react';

interface DeleteDialogProps {
  jobId: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ jobId }) => {
  const { getJobById, deleteJob } = useJobs();

  const job = getJobById(jobId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'destructive'}>
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[10rem] h-[14rem]">
        <DialogHeader>
          <DialogTitle>Delete Job</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this job?
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <Label className="text-right font-bold">Customer:</Label>
          <Label>{job?.customerName}</Label>
        </div>
        <Label className='font-bold'>{job?.suburb}</Label>
        <DialogFooter>
          <DialogTrigger>
            <Button variant={'secondary'}>Cancel</Button>
          </DialogTrigger>
          <DialogTrigger>
            <Button onClick={() => deleteJob(jobId)} variant={'destructive'}>
              Delete 
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
