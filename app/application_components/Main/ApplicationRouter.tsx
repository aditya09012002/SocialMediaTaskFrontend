"use client";

import { useAuthStore } from "@/app/client/lib/store/useAuthStore";
import { AdminDashboard } from "./AdminDashboard";
import { UserScreen } from "./UserScreen";
import { useWebSocket } from "@/app/client/hooks/useWebSocket";

export const ApplicationRouter = () => {
  const { loggedInUser, setUser, setToken, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center bg-gray-100 px-4 py-2 border-b border-gray-200">
        <div>Top Header</div>
        {loggedInUser && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>
      {loggedInUser && loggedInUser.role === "admin" ? (
        <AdminDashboard />
      ) : (
        <UserScreen />
      )}
    </div>
  );
};
