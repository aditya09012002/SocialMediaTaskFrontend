"use client";
import { LoginUser } from "@/app/client/lib/axios/services/auth.service";
import { useAuthStore } from "@/app/client/lib/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import FullscreenLoader from "./FullScreenLoader";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();
  const loginUser = useMutation({
    mutationFn: LoginUser,
    onSuccess: (resp) => {
      const data = resp.data;
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      toast.success("User logged in successfully");
      router.push("/Main");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof Error) {
        const errorMessage =
          error?.message || "An error occurred during login.";
        toast.error(errorMessage);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser.mutate({ email, password });
  };

  return (
    <>
      {loginUser.isPending && <FullscreenLoader />}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <Input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassowrd(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginComponent;
