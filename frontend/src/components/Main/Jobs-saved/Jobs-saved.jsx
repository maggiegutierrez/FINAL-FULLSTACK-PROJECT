import { useSavedJobs } from "../../../context/SavedJobsContext";
import JobCard from "../JobCard/JobCard";
import "./Jobs-saved.css";

function JobsSaved() {
  const { savedJobs, isJobSaved, toggleSaveJob } = useSavedJobs();

  return (
    <section className="jobs-saved">
      <div className="jobs-saved__card">
        <h1 className="jobs-saved__title">SAVED</h1>
        <p className="jobs-saved__subtitle">Jobs you bookmarked:</p>

        {savedJobs.length === 0 ? (
          <p className="jobs-saved__empty">No saved jobs yet</p>
        ) : (
          <div className="jobs-saved__list">
            {savedJobs.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
                isSaved={isJobSaved(job.id)}
                onToggleSave={() => toggleSaveJob(job)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default JobsSaved;
