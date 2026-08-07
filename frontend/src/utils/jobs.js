import { BASE_URL } from "./constants";

export const saveJob = (jobId, { title, company, location }) => {
  return fetch(`${BASE_URL}/job-cards/${jobId}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, company, location }),
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

  return fetch(`${BASE_URL}/job-cards?${params.toString()}`, {
    credentials: "include",
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Job search error ${res.status}`),
  );
};
