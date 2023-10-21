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
    <div
      className={cn(
        className,
        'md:flex md:flex-col md:justify-between w-[100%] md:h-[45rem] '
      )}
    >
      <div className="flex justify-between items-center h-[20%] ">
        <div className=" h-[6rem] md:mb-8 flex flex-col justify-between items-center w-full">
          <div className=" w-full flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col space-y-4">
              {jobs && (jobs.length > 0) ? (
                <Label className="text-secondary-foreground mb-3 md:mb-0">
                  Total Jobs: {jobs.length}
                </Label>
              ) : ""}
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
          {isJobError && (
            <Label className="text-red-500 md:w-full">
              One or more jobs are missing some data.
            </Label>
          )}
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center mt-[4rem] mb-[2rem] h-full">
          <Loading />
        </div>
      ) : (
        <ScrollArea className="mt-[2rem] md:mt-0 mb-6 md:mb-0 h-full">
          <div className="flex flex-col space-y-[2rem] md:mr-4">
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
