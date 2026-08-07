import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getCurrentUser } from "../utils/auth";
import { saveJob, unsaveJob } from "../utils/jobs";

const SavedJobsContext = createContext(null);

export function SavedJobsProvider({ children, isLoggedIn }) {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      setSavedJobs([]);
      return;
    }
    getCurrentUser()
      .then((user) => setSavedJobs(user.savedJobs))
      .catch(console.error);
  }, [isLoggedIn]);

  function isJobSaved(jobId) {
    return savedJobs.some((job) => job.jobId === jobId);
  }

  function toggleSaveJob(job) {
    const jobId = job.id ?? job.jobId;

    if (isJobSaved(jobId)) {
      unsaveJob(jobId).then(setSavedJobs).catch(console.error);
    } else {
      saveJob(jobId, {
        title: job.title,
        company: job.company,
        location: job.location,
      })
        .then(setSavedJobs)
        .catch(console.error);
    }
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
  isLoggedIn: PropTypes.bool.isRequired,
};

export function useSavedJobs() {
  const context = useContext(SavedJobsContext);
  if (!context) {
    throw new Error("useSavedJobs must be used within a SavedJobsProvider");
  }
  return context;
}
