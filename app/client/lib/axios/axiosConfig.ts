"use client";

import axios from "axios";
import { API_URL } from "./endpoints";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (
      accessToken &&
      !config.url?.startsWith("/public") &&
      !config.url?.includes("/auth/login") &&
      !config.url?.includes("/auth/register")
    ) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
