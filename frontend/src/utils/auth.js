import { BASE_URL } from "./constants";

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Register error ${res.status}`),
  );
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Login error ${res.status}`),
  );
};

export const getCurrentUser = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`User unrecognized ${res.status}`),
  );
};

export const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Logout error ${res.status}`),
  );
};
