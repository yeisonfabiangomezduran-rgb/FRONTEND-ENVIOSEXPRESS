import axios from "axios";

export const API_BASE_URL = "https://bakend-enviosexpress.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL
});

export const apiFetch = (endpoint, options) => {
  return fetch(`${API_BASE_URL}${endpoint}`, options);
};

export default api;
