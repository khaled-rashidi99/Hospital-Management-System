import axios from "axios";
import store, { RootState } from "../store/store";
import { keysToSnake, keysToCamel } from "./utils";

const API_URL = import.meta.env.VITE_API_URL;

const config = {
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

const api = axios.create(config);

api.interceptors.request.use(
  (config) => {
    const state: RootState = store.getState();
    const token = state.auth.token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data) {
      config.data = keysToSnake(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = keysToCamel(response.data);
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      error.response.data = keysToCamel(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
