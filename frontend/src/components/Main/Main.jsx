import { useState } from "react";
import { searchJobs } from "../../utils/jobs";
import { useSavedJobs } from "../../context/SavedJobsContext";
import JobCard from "./JobCard/JobCard";
import "./Main.css";

import { CATEGORY_OPTIONS, LEVEL_OPTIONS } from "../../utils/jobFilters";

const LOCATION_OPTIONS = ["Remote", "On-site"];

function Main() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const [openFilter, setOpenFilter] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const { isJobSaved, toggleSaveJob } = useSavedJobs();

  function isRemoteJob(job) {
    return /remote|flexible/i.test(job.location || ""); // Nueva expresión regular aprendida
  }

  const displayedJobs = selectedLocation
    ? jobs.filter((job) =>
        selectedLocation === "Remote" ? isRemoteJob(job) : !isRemoteJob(job),
      )
    : jobs;

  function fetchJobs(pageToLoad) {
    searchJobs({
      category: selectedCategory,
      level: selectedLevel,
      page: pageToLoad,
    })
      .then((data) => {
        setJobs(data.jobs);
        setPage(data.page);
        setPageCount(data.pageCount);
        setHasSearched(true);
      })
      .catch(console.error);
  }

  function handleSearch() {
    fetchJobs(1);
  }

  function handleNextPage() {
    fetchJobs(page + 1);
  }

  function handlePrevPage() {
    fetchJobs(page - 1);
  }

  return (
    <section className="main">
      <div className="main__card">
        <h1 className="main__title">FIND A JOB</h1>
        <p className="main__subtitle">
          Filter by category, level, and location
        </p>

        <div className="main__filter-wrapper">
          <div className="main__filter-item">
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
                      className="main__filter-option"
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
          </div>
          <div className="main__filter-item">
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
                      className="main__filter-option"
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
          </div>
          <div className="main__filter-item">
            <button
              className="main__filter"
              type="button"
              onClick={() =>
                setOpenFilter(openFilter === "location" ? null : "location")
              }
            >
              <span className="main__filter-label">Location</span>
              <span className="main__filter-value">{selectedLocation}</span>
            </button>

            {openFilter === "location" && (
              <ul className="main__filter-options">
                {LOCATION_OPTIONS.map((option) => (
                  <li key={option}>
                    <button
                      className="main__filter-option"
                      type="button"
                      onClick={() => {
                        setSelectedLocation(option);
                        setOpenFilter(null);
                      }}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <button className="main__search" type="button" onClick={handleSearch}>
          SEARCH
        </button>

        {!hasSearched && (
          <p className="main__empty">
            Choose your filters and click SEARCH to see jobs
          </p>
        )}

        {hasSearched && displayedJobs.length === 0 && (
          <p className="main__empty">
            No jobs matched this page — try NEXT below or other filter
          </p>
        )}

        <div className="main__jobs">
          {displayedJobs.map((job) => (
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

        {pageCount > 1 && (
          <div className="main__pagination">
            <button
              className="main__pagination-prev_next"
              type="button"
              onClick={handlePrevPage}
              disabled={page <= 1}
            >
              PREV
            </button>

            <span>
              {page} - {pageCount}
            </span>
            <button
              className="main__pagination-prev_next"
              type="button"
              onClick={handleNextPage}
              disabled={page >= pageCount}
            >
              NEXT
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Main;
