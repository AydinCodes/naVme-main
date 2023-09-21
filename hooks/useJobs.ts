import { create } from "zustand";

export interface JobObject {
  jobId: string;
  address: string;
  placeId: string;
  lat: number;
  lng: number;
}

interface JobsState {
  jobs: JobObject[];
  addJob: (newJob: JobObject) => void;
  deleteJob: (jobId: string) => void;
  getJobById: (jobId: string) => JobObject | undefined;
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
}));
