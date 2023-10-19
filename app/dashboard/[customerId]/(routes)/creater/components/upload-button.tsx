import React from 'react';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import './styles.scss';
import { UploadedJobObject, JobObject, useJobs } from '@/hooks/use-jobs';
import { au } from '@/lib/coordinates';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useLoading } from '@/hooks/use-loading';
import { cn } from '@/lib/utils';

interface UploadButtonProps {}

const UploadButton: React.FC<UploadButtonProps> = () => {
  const params = useParams();
  const { addJob } = useJobs();
  const { loading, setLoading } = useLoading();

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

            formattedJobs.map((job: JobObject) => addJob(job));
          } catch (error) {
            console.error('Error parsing JSON file content:', error);
          } finally {
            setLoading(false);
          }
        };

        reader.readAsText(file);
      } else {
        console.log('Unsupported file type. Only JSON files are allowed.');
        setLoading(false);
      }
    }
  }

  return (
    <>
      <input
        disabled={loading}
        className="file-input"
        type="file"
        id="import-file"
        onChange={handleFileUpload}
      />
      <Label
        className={cn(
          'import-label',
          loading && 'text-gray-400 hover:cursor-not-allowed'
        )}
        htmlFor="import-file"
      >
        <span
          className={cn(
            'flex items-center',
            loading && 'text-gray-400 hover:cursor-not-allowed'
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
