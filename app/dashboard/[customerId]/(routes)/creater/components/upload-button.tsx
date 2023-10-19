import React from 'react';
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import "./styles.scss";

interface UploadButtonProps {}

const UploadButton: React.FC<UploadButtonProps> = () => {
    function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]; // Use optional chaining (?.) to safely access files
        if (file) {
          const reader = new FileReader();
      
          reader.onload = (e) => {
            const fileContent = e.target?.result ?? ''; // Use nullish coalescing operator (??) for a default value
            console.log(fileContent);
          };
      
          if (file.type === 'application/json' || file.type === 'text/plain') {
            reader.readAsText(file);
          } else {
            console.log('Unsupported file type');
          }
        }
      }
      

  return (
    <>
      <input className="file-input" type="file" id="import-file" onChange={handleFileUpload}/>
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
