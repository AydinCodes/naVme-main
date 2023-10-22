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

interface DeleteAllDialogProps {
  className?: string
}

const DeleteAllDialog: React.FC<DeleteAllDialogProps> = ({ className }) => {
  const { deleteAllJobs } = useJobs();


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className} variant={'destructive'}>
          Delete All Jobs
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[22rem]">

        <DialogHeader>
          <DialogTitle>Delete All Jobs</DialogTitle>
          <DialogDescription className="">
            Are you sure you want to delete all jobs?
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 justify-center md:justify-start">
          <Label>This action cannot be undone.</Label>
        </div>
        <DialogFooter>
          <div className="flex space-x-4 justify-center md:justify-end">
            <DialogTrigger>
              <Button variant={'secondary'}>Cancel</Button>
            </DialogTrigger>
            <DialogTrigger>
              <Button onClick={() => deleteAllJobs()} variant={'destructive'}>
                Delete
              </Button>
            </DialogTrigger>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAllDialog;
