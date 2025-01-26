import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  GetAllTasks,
  GetOwnTasks,
  submitTask,
} from "../axios/services/task.service";
import { useAuthStore } from "../store/useAuthStore";

export const useGetAllTasks = (page: number, limit: number) => {
  const { loggedInUser } = useAuthStore();
  return useQuery({
    queryKey: ["tasks", page, limit, loggedInUser?._id],
    queryFn: () => GetAllTasks(page, limit),
  });
};

export const useGetOwnTasks = (page: number, limit: number) => {
  const { loggedInUser } = useAuthStore();
  return useQuery({
    queryKey: ["ownTasks", page, limit, loggedInUser?._id],
    queryFn: () => GetOwnTasks(page, limit),
  });
};

export const useSubmitTask = () => {
  return useMutation({
    mutationFn: (formData: FormData) => submitTask(formData),
    onSuccess: () => {
      toast.success("Task submitted successfully");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Error submitting task");
    },
  });
};
