"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../lib/store/useAuthStore";
import { ReactNode, ReactElement, useEffect } from "react";
import { VerifyToken } from "../lib/axios/services/auth.service";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps): ReactElement | null => {
  const router = useRouter();
  const { loggedInUser, setUser, setToken } = useAuthStore();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const resp = await VerifyToken();
        const data = resp.data;
        setUser(data.data);
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        router.push("/");
      } finally {
      }
    };
    if (!loggedInUser && localStorage.getItem("token")) {
      verifyToken();
      setToken(localStorage.getItem("token") as string);
    } else if (!loggedInUser) {
      router.push("/");
    }
  }, [loggedInUser, router, setToken, setUser]);

  return <>{children}</>;
};

export default AuthGuard;
