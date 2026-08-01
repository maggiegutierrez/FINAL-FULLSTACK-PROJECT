import { useState } from "react";
import { useSavedJobs } from "../../context/SavedJobsContext";
import JobCard from "./JobCard/JobCard";
import "./Main.css";

import { CATEGORY_OPTIONS, LEVEL_OPTIONS } from "../../utils/jobFilters";

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
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_OPTIONS[0]);
  const [selectedLevel, setSelectedLevel] = useState(LEVEL_OPTIONS[0]);
  const [openFilter, setOpenFilter] = useState(null);

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

        <div className="main__filter-wrapper">
          <button
            className="main__filter"
            type="button"
            onClick={() =>
              setOpenFilter(openFilter === "category" ? null : "category")
            }
          >
            <span className="main__filter-label">Category</span>
            <span className="main__filter-value">{selectedCategory}</span>
          </button>

          {openFilter === "category" && (
            <ul className="main__filter-options">
              {CATEGORY_OPTIONS.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory(option);
                      setOpenFilter(null);
                    }}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button
            className="main__filter"
            type="button"
            onClick={() =>
              setOpenFilter(openFilter === "level" ? null : "level")
            }
          >
            <span className="main__filter-label">Level</span>
            <span className="main__filter-value">{selectedLevel}</span>
          </button>

          {openFilter === "level" && (
            <ul className="main__filter-options">
              {LEVEL_OPTIONS.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLevel(option);
                      setOpenFilter(null);
                    }}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button className="main__filter" type="button" disabled>
            <span className="main__filter-label">Location</span>
            <span className="main__filter-value">Remote / Flexible</span>
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
