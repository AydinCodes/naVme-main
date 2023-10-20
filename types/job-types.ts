export interface JobObject {
    customerName: string;
    jobId: string;
    address: string;
    suburb: string;
    state: string;
    country: string;
    placeId: string;
    lat: number;
    lng: number;
  }
  
  export interface UploadedJobObject {
    id: string;
    customer_name: string;
    address: string;
  }

export type SelectedJobObject = Omit<JobObject, 'customerName'>;
