'use client';
import DeleteDialog from '@/components/delete-dialog';
import EditDialog from '@/components/edit-dialog';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { JobObject } from '@/types/job-types';

interface JobProps {
  className?: string;
  job: JobObject;
}

const Job: React.FC<JobProps> = ({ className, job }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between border rounded-[.5rem] p-4 transition-all',
        job.suburb === 'Address not found' &&
          'bg-red-100 border-[1px] border-gray-400 dark:bg-red-950 dark:border-gray-600'
      )}
    >
      <div className="flex flex-col space-y-4 w-[60%] lg:w-[70%] md:w-[60%] ">
        <Label className="">{job.customerName}</Label>
        <Label
          className={cn(
            'font-bold',
            job.suburb === 'Address not found' && 'text-red-600'
          )}
        >
          {job.suburb}
        </Label>
      </div>
      <div className="space-x-2 ">
        <EditDialog jobId={job.jobId} />
        <DeleteDialog jobId={job.jobId} />
      </div>
    </div>
  );
};

export default Job;
