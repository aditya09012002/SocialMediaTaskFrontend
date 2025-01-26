"use client";

import React, { useCallback, useState } from "react";
import { useGetAllTasks } from "@/app/client/lib/react-query/TaskHooks";
import { format } from "date-fns";
import { ImageDrawer } from "./ImageDrawer";
import { PaginatedTable } from "./PaginatedTable";
import { useWebSocket } from "@/app/client/hooks/useWebSocket";
import { queryClient } from "@/app/client/lib/react-query/queryClient";
import toast from "react-hot-toast";
import { useAuthStore } from "@/app/client/lib/store/useAuthStore";

export const AdminDashboard: React.FC = () => {
  const { loggedInUser } = useAuthStore();
  console.log("Here is the url", process.env);

  const handleWebSocketMessage = (data: any) => {
    console.log("websocket message", data);
    if (data.event === "task_submission") {
      toast("A new task has been submitted. Please refresh the page.", {
        duration: 5000,
        position: "bottom-center",
        icon: "🚀",
      });
      invalidateCurrentPage();
    }
  };

  useWebSocket(
    process.env.NEXT_PUBLIC_WEBSOCKET_URL as string,
    handleWebSocketMessage
  );

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const invalidateCurrentPage = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["tasks", currentPage, pageSize, loggedInUser?._id],
    });
  }, [currentPage, pageSize, loggedInUser?.id]);

  const { data, isLoading, isError, error } = useGetAllTasks(
    currentPage,
    pageSize
  );

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-4 text-red-500">
        Error: {error?.message}
      </div>
    );
  }

  const columns = [
    { key: "name", label: "Name" },
    { key: "socialMediaHandle", label: "Social Media" },
    {
      key: "images",
      label: "Images",
      render: (_: any, row: any) => (
        <ImageDrawer images={row.images} taskName={row.name} />
      ),
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (value: any) => format(new Date(value), "PPP"),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <PaginatedTable
          data={data?.tasks}
          totalPages={data.totalPages}
          columns={columns}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};
