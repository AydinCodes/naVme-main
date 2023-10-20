import { JobObject } from "@/types/job-types";
import { create } from "zustand";

interface JobsState {
  jobs: JobObject[];
  isJobError: boolean; // New state for error checking
  addJob: (newJob: JobObject) => void;
  deleteJob: (jobId: string) => void;
  getJobById: (jobId: string) => JobObject | undefined;
  editJobById: (jobId: string, updatedJobDetails: Partial<JobObject>) => void;
}

export const useJobs = create<JobsState>((set, get) => ({
  jobs: [],
  isJobError: false, // Initialize isJobError as false

  addJob: (newJob: JobObject) =>
    set((state) => {
      const updatedJobs = [...state.jobs, newJob];
      const isJobError = updatedJobs.some((job) => job.suburb === "Address not found");
      return {
        jobs: updatedJobs,
        isJobError,
      };
    }),
    
  deleteJob: (jobId: string) =>
    set((state) => {
      const updatedJobs = state.jobs.filter((job) => job.jobId !== jobId);
      const isJobError = updatedJobs.some((job) => job.suburb === "Address not found");
      return {
        jobs: updatedJobs,
        isJobError,
      };
    }),

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
      const isJobError = updatedJobs.some((job) => job.suburb === "Address not found");
      return {
        jobs: updatedJobs,
        isJobError,
      };
    }),
}));
