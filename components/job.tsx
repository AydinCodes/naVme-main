"use client"
import DeleteDialog from '@/components/delete-dialog';
import EditDialog from '@/components/edit-dialog';
import { Label } from '@/components/ui/label';
import { JobObject } from '@/hooks/use-jobs';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

interface JobProps {
  className?: string;
  job: JobObject;
}

const Job: React.FC<JobProps> = ({ className, job }) => {

  return (

    
    <div
      className={cn(
        'flex items-center justify-between border rounded-[.5rem] p-4 transition-all', (job.suburb === 'Address not found') && "bg-red-300 border-2 border-black"
      )}
    >
      <div className="flex flex-col space-y-4">
        <Label>{job.jobId}</Label>
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
      <div className="space-x-2">
        <EditDialog jobId={job.jobId} />
        <DeleteDialog jobId={job.jobId} />
      </div>
    </div>
  );
};

export default Job;
