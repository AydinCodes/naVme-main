'use client';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import UploadButton from './upload-button';
import { Loading } from '@/components/loading';
import { useLoading } from '@/hooks/use-loading';
import Job from '@/components/job';
import { JobObject } from '@/types/job-types';

interface JobListProps {
  className?: string;
  jobs?: JobObject[];
}

const JobList: React.FC<JobListProps> = ({ className, jobs }) => {
  const { loading } = useLoading();

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
      {loading ? (
        <div className="flex justify-center mt-[4rem]">
          <Loading />
        </div>
      ) : (
        <ScrollArea className="h-[92%]">
          <div className="flex flex-col space-y-[2rem] pr-6">
            {jobs?.map((job) => (
              <Job key={job.jobId} job={job} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default JobList;
