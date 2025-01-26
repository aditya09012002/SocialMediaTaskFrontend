"use client";
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authEndpoints = {
  loginUser: "user/auth/login",
  registerUser: "user/auth/register",
  verifyToken: "user/auth/verify",
  updateProfile: "user/update-interests",
};

export const taskEndpoints = {
  submitTask: "task/submit",
  getTasks: (page: number, limit: number) =>
    `task/getAllTasks?page=${page}&limit=${limit}`,
  getOwnTasks: (page: number, limit: number) =>
    `task/getOwnTasks?page=${page}&limit=${limit}`,
};
