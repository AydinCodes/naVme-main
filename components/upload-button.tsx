'use client';
import React, { useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import '@/styles/upload.scss';
import { useJobs } from '@/hooks/use-jobs';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useLoading } from '@/hooks/use-loading';
import { cn } from '@/lib/utils';
import { JobObject } from '@/types/job-types';
import { v4 as uuidv4 } from 'uuid';

interface UploadButtonProps {}

const UploadButton: React.FC<UploadButtonProps> = () => {
  const params = useParams();
  const { addJob, jobs } = useJobs();
  const { loading, setLoading } = useLoading();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    const file = event.target.files?.[0];

    if (file) {
      if (file.type === 'application/json') {
        const reader = new FileReader();

        reader.onload = async (e) => {
          const uploadedJobs = e.target?.result ?? '';
          try {
            const jobsArray = JSON.parse(uploadedJobs as string);
            const formatJobs = await axios.post(
              `/api/${params.customerId}/format-jobs`,
              jobsArray
            );
            const formattedJobs = await formatJobs.data;

            formattedJobs.forEach((job: JobObject) => {
              if (jobs.some((existingJob) => existingJob.jobId === job.jobId)) {
                const newJobId = uuidv4();
                job.jobId = newJobId;
              }
              addJob(job);
            });
          } catch (error) {
            console.error('Error parsing JSON file content:', error);
          } finally {
            setLoading(false);
          }
          if (fileInputRef.current) {
            fileInputRef.current.value = ''; // This clears the input field
          }
        };

        reader.readAsText(file);
      } else {
        console.log('Unsupported file type. Only JSON files are allowed.');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  return (
    <>
      <input
        disabled={loading}
        ref={fileInputRef} // Add a ref to the input element
        className="file-input"
        type="file"
        id="import-file"
        onChange={handleFileUpload}
      />
      <Label
        className={cn(
          'import-label bg-primary text-primary-foreground hover:bg-primary/90 ',
          loading && ' hover:cursor-not-allowed'
        )}
        htmlFor="import-file"
      >
        <span
          className={cn(
            'flex items-center w-full justify-center',
            loading && 'hover:cursor-not-allowed'
          )}
        >
          <Upload />
          &nbsp; &nbsp;Import Jobs
        </span>
      </Label>
    </>
  );
};

export default UploadButton;
