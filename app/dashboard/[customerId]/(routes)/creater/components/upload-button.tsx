import React from 'react';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import './styles.scss';
import { UploadedJobObject, JobObject, useJobs } from '@/hooks/use-jobs';
import { au } from '@/lib/coordinates';
import axios from 'axios';
import { useParams } from 'next/navigation';

const country = au;

interface UploadButtonProps {}

const UploadButton: React.FC<UploadButtonProps> = () => {

    const params = useParams();
  const { addJob } = useJobs();

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/json') {
        const reader = new FileReader();

        reader.onload = async (e) => {
          const uploadedJobs = e.target?.result ?? '';
          try {
            const jobsArray = JSON.parse(uploadedJobs as string);
            await axios.post(`/api/${params.customerId}/format-jobs`, jobsArray);
            const convertedJobs: JobObject[] = [];
            for (let i = 0; i < jobsArray.length; i++) {
              const uploadedJob = jobsArray[i];
              
              const job: JobObject = {
                jobId: uploadedJob.id,
                address: uploadedJob.address,
                suburb: '', // Add default value for missing string
                state: '', // Add default value for missing string
                country: '', // Add default value for missing string
                placeId: '', // Add default value for missing string
                lat: 0, // Add default value for missing number
                lng: 0, // Add default value for missing number
              };
              convertedJobs.push(job);
            }

            convertedJobs.map((job) => addJob(job));
          } catch (error) {
            console.error('Error parsing JSON file content:', error);
          }
        };

        reader.readAsText(file);
      } else {
        console.log('Unsupported file type. Only JSON files are allowed.');
      }
    }
  }

  return (
    <>
      <input
        className="file-input"
        type="file"
        id="import-file"
        onChange={handleFileUpload}
      />
      <Label className="import-label" htmlFor="import-file">
        <span className="flex items-center">
          <Upload />
          &nbsp; &nbsp;Import Jobs
        </span>
      </Label>
    </>
  );
};

export default UploadButton;
