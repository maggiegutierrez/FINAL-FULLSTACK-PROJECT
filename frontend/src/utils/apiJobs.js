import { BASE_URL } from "./constants";

const MUSE_BASE_URL = "https://www.themuse.com/api/public/jobs";
const MUSE_API_KEY = import.meta.env.VITE_MUSE_API_KEY;

export const getSavedJobs = () => {
  return fetch(`${BASE_URL}/job-cards`, {
    method: "GET",
    credentials: "include",
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Get saved jobs error ${res.status}`),
  );
};

export const saveJob = (jobId, { title, company, location, link }) => {
  return fetch(`${BASE_URL}/job-cards/${jobId}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, company, location, link }),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Save job error ${res.status}`),
  );
};

export const unsaveJob = (jobId) => {
  return fetch(`${BASE_URL}/job-cards/${jobId}`, {
    method: "DELETE",
    credentials: "include",
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Unsave job error ${res.status}`),
  );
};

export const searchJobs = ({ category, level, page = 1 }) => {
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (level) params.append("level", level);
  params.append("page", page);
  if (MUSE_API_KEY) {
    params.append("api_key", MUSE_API_KEY);
  }

  return fetch(`${MUSE_BASE_URL}?${params.toString()}`)
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Job search error ${res.status}`),
    )
    .then((data) => ({
      jobs: data.results.map((job) => ({
        id: job.id,
        title: job.name,
        company: job.company?.name,
        location: job.locations?.[0]?.name || "Not specified",
        link: job.refs?.landing_page || "",
      })),
      page: data.page,
      pageCount: data.page_count,
    }));
};
