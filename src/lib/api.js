import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Attach bearer token as a fallback for environments where cookies
// (e.g. cross-site on some mobile browsers) are unreliable.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("foa_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
