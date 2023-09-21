"use client";

import { Label } from "@/components/ui/label";
import { useJobs } from "@/hooks/useJobs";
import { Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import DeleteDialog from "./delete-dialog";

interface JobListProps {
  className?: string;
}

const JobList: React.FC<JobListProps> = ({ className }) => {
  const { jobs } = useJobs();

  return (
    <div className={cn(className, "w-[100%] h-[87%]")}>
      <ScrollArea className="h-[100%]">
        <div className="flex flex-col space-y-[2rem] pr-6">
          {jobs?.map((job) => (
            <div
              key={job.jobId}
              className="flex items-center justify-between border rounded-[.5rem] p-4"
            >
              <Label className="mr-4">{job.address}</Label>
              <div className="space-x-2">
                <EditDialog jobId={job.jobId} />
                <DeleteDialog jobId={job.jobId} />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

interface EditDialogProps {
  jobId: string;
}

const EditDialog: React.FC<EditDialogProps> = ({ jobId }) => {
  const { getJobById } = useJobs();
  const address = getJobById(jobId)?.address;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Job</DialogTitle>
          <DialogDescription>
            Click save once the changes are finished.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <Label className="text-right font-bold">Address:</Label>
          <Label>{address}</Label>
        </div>

        <DialogFooter>
          <DialogTrigger>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogTrigger>
          <DialogTrigger>
            <Button variant={"default"}>
              Save
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobList;
