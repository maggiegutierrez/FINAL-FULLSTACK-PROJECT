import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const SavedJobsContext = createContext(null);

export function SavedJobsProvider({ children }) {
  const [savedJobs, setSavedJobs] = useState([]);

  function isJobSaved(jobId) {
    return savedJobs.some((job) => job.id === jobId);
  }

  function toggleSaveJob(job) {
    setSavedJobs((prev) => {
      if (prev.some((saved) => saved.id === job.id)) {
        return prev.filter((saved) => saved.id !== job.id);
      }
      return [...prev, job];
    });
  }

  const value = { savedJobs, isJobSaved, toggleSaveJob };

  return (
    <SavedJobsContext.Provider value={value}>
      {children}
    </SavedJobsContext.Provider>
  );
}

SavedJobsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useSavedJobs() {
  const context = useContext(SavedJobsContext);
  if (!context) {
    throw new Error("useSavedJobs must be used within a SavedJobsProvider");
  }
  return context;
}
