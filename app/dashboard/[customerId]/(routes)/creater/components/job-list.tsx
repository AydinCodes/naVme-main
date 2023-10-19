'use client';

import { Label } from '@/components/ui/label';
import { JobObject, useJobs } from '@/hooks/use-jobs';

import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

import DeleteDialog from './delete-dialog';
import EditDialog from './edit-dialog';
import { Button } from '@/components/ui/button';
import UploadButton from "./upload-button";

interface JobListProps {
  className?: string;
  jobs?: JobObject[];
}

const JobList: React.FC<JobListProps> = ({ className, jobs }) => {
  return (
    <div className={cn(className, 'w-[100%] h-[87%] mb-[4rem]')}>
      <div className="flex justify-between items-center h-[20%]">
        <Label className="text-secondary-foreground">
          Total Jobs: {jobs?.length}
        </Label>
        <div className="flex flex-row space-x-4 items-center">
          <UploadButton />
          <Button>Create Runs</Button>
        </div>
      </div>
      <ScrollArea className="h-[92%]">
        <div className="flex flex-col space-y-[2rem] pr-6">
          {jobs?.map((job) => (
            <div
              key={job.jobId}
              className={cn(
                'flex items-center justify-between border rounded-[.5rem] p-4 transition-all'
              )}
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
