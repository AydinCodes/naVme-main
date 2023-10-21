'use client';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/loading';
import { useLoading } from '@/hooks/use-loading';
import Job from '@/components/job';
import { JobObject } from '@/types/job-types';
import AddDialog from './add-dialog';
import { useJobs } from '@/hooks/use-jobs';

interface JobListProps {
  className?: string;
  jobs?: JobObject[];
}

const JobList: React.FC<JobListProps> = ({ className, jobs }) => {
  const { loading } = useLoading();
  const { isJobError } = useJobs();

  return (
    <div className={cn(className, 'w-[100%] h-full md:h-[87%] mb-[4rem]')}>
      <div className="flex justify-between items-center h-[20%]">
        <div className="flex flex-col space-y-4">
          <Label className="text-secondary-foreground">
            Total Jobs: {jobs ? jobs.length : '0'}
          </Label>
          {isJobError && (
            <Label className="text-red-500">
              One or more jobs are missing some data.
            </Label>
          )}
        </div>
        <div className="flex flex-row space-x-4 items-center">
          <AddDialog />
          <Button
            disabled={isJobError}
            className={cn(isJobError && 'hover:cursor-not-allowed')}
          >
            Create Runs
          </Button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center mt-[4rem]">
          <Loading />
        </div>
      ) : (
        <ScrollArea className="h-[92%] mt-[2rem] md:mt-0">
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
