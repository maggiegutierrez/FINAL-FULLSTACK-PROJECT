import { useSavedJobs } from "../../context/SavedJobsContext";
import JobCard from "./JobCard/JobCard";
import "./Main.css";

const FILTERS = {
  category: "Software engineering",
  level: "Entry level",
  location: "Remote",
};

const MOCK_JOBS = [
  { id: 1, title: "Frontend developer", company: "Nubank", location: "Remote" },
  {
    id: 2,
    title: "Product designer",
    company: "Shopify",
    location: "Mexico City",
  },
  { id: 3, title: "Backend engineer", company: "Datadog", location: "Remote" },
];

function Main() {
  const { isJobSaved, toggleSaveJob } = useSavedJobs();

  function handleSearch() {
    // TODO: Fase 4 — llamar al endpoint backend que consulta The Muse con los filtros actuales
  }

  return (
    <section className="main">
      <div className="main__card">
        <h1 className="main__title">FIND A JOB</h1>
        <p className="main__subtitle">
          Filter by category, level, and location
        </p>

        <div className="main__filters">
          <button className="main__filter" type="button">
            <span className="main__filter-label">Category</span>
            <span className="main__filter-value">{FILTERS.category}</span>
          </button>

          <button className="main__filter" type="button">
            <span className="main__filter-label">Level</span>
            <span className="main__filter-value">{FILTERS.level}</span>
          </button>

          <button className="main__filter" type="button">
            <span className="main__filter-label">Location</span>
            <span className="main__filter-value">{FILTERS.location}</span>
          </button>
        </div>

        <button className="main__search" type="button" onClick={handleSearch}>
          Search
        </button>

        <div className="main__jobs">
          {MOCK_JOBS.map((job) => (
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
      </div>
    </section>
  );
}

export default Main;
