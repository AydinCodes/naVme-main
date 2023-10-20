import { create } from "zustand";

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

interface JobsState {
  jobs: JobObject[];
  addJob: (newJob: JobObject) => void;
  deleteJob: (jobId: string) => void;
  getJobById: (jobId: string) => JobObject | undefined;
  editJobById: (jobId: string, updatedJobDetails: Partial<JobObject>) => void;
}

export const useJobs = create<JobsState>((set, get) => ({
  jobs: [],
  addJob: (newJob: JobObject) =>
    set((state) => ({
      jobs: [...state.jobs, newJob],
    })),
    
  deleteJob: (jobId: string) =>
    set((state) => ({
      jobs: state.jobs.filter((job) => job.jobId !== jobId),
    })),
  getJobById: (jobId: string) => {
    return get().jobs.find((job) => job.jobId === jobId);
  },
  editJobById: (jobId: string, updatedJobDetails: Partial<JobObject>) =>
    set((state) => {
      const updatedJobs = state.jobs.map((job) => {
        if (job.jobId === jobId) {
          return { ...job, ...updatedJobDetails };
        }
        return job;
      });
      return {
        jobs: updatedJobs,
      };
    }),
}));
