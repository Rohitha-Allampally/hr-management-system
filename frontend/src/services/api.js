import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
});

// Add request interceptor to include User-Id header
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.id) {
    config.headers["User-Id"] = user.id;
  }
  return config;
});

export default API;
