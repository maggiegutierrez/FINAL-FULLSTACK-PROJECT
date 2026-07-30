import { BASE_URL, TOKEN_KEY } from "./constants";

export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
      name: name,
    }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Register error ${res.status}`);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Login error ${res.status}`);
    })
    .then((data) => {
      localStorage.setItem(TOKEN_KEY, data.token);
      return data;
    });
};

export const login = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    },
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`User unrecognized  ${res.status}`);
  });
};

export const logout = () => {
  return Promise.resolve(localStorage.removeItem(TOKEN_KEY));
};
