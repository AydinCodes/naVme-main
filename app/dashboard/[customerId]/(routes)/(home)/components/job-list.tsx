"use client";

import { Label } from "@/components/ui/label";
import { useJobs } from "@/hooks/useJobs";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

import DeleteDialog from "./delete-dialog";
import EditDialog from "./edit-dialog";

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



export default JobList;
