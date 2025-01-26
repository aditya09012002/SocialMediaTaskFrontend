import axiosInstance from "../axiosConfig";
import { taskEndpoints } from "../endpoints";

export const GetAllTasks = async (page: number, limit: number) => {
  try {
    const response = await axiosInstance.get(
      taskEndpoints.getTasks(page, limit)
    );
    return response.data?.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const GetOwnTasks = async (page: number, limit: number) => {
  try {
    const response = await axiosInstance.get(
      taskEndpoints.getOwnTasks(page, limit)
    );
    return response.data?.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const submitTask = async (formData: FormData) => {
  try {
    const resp = await axiosInstance.post(taskEndpoints.submitTask, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return resp.data?.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
