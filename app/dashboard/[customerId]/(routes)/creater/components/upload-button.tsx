import React from 'react';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import './styles.scss';
import { UploadedJobObject, JobObject, useJobs } from '@/hooks/use-jobs';

interface UploadButtonProps {}

const UploadButton: React.FC<UploadButtonProps> = () => {
  const { addJob } = useJobs();

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/json') {
        const reader = new FileReader();

        reader.onload = (e) => {
          const uploadedJobs = e.target?.result ?? '';
          try {
            const jobArray = JSON.parse(uploadedJobs as string);
            // Convert the uploadedJobs to the JobObject structure
            const convertedJobs: JobObject[] = jobArray.map((uploadedJob: UploadedJobObject) => ({
              jobId: uploadedJob.jobId,
              address: uploadedJob.address,
              suburb: '', // Add default value for missing string
              state: '', // Add default value for missing string
              country: '', // Add default value for missing string
              placeId: '', // Add default value for missing string
              lat: 0, // Add default value for missing number
              lng: 0, // Add default value for missing number
            }));
            addJob(convertedJobs[2]);
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
