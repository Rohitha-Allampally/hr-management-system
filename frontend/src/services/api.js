import axios from "axios";

const defaultBaseURL = "http://localhost:8080";
const apiBaseUrl = import.meta.env.VITE_API_URL || defaultBaseURL;

if (!import.meta.env.VITE_API_URL) {
  console.warn("VITE_API_URL is not set. Using fallback:", apiBaseUrl);
  console.warn("Set VITE_API_URL in Vercel Environment Variables to your deployed backend API host (no /api suffix needed). ");
}

const API = axios.create({
  baseURL: apiBaseUrl,
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
