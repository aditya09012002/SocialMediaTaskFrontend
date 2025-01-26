"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { RegisterUser } from "@/app/client/lib/axios/services/auth.service";
import toast from "react-hot-toast";
import FullscreenLoader from "./FullScreenLoader";

type RegisterComponentProps = {
  changeTab: (tab: string) => void;
};

const RegisterComponent = ({ changeTab }: RegisterComponentProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const register = useMutation({
    mutationFn: RegisterUser,
    onSuccess: () => {
      toast.success("Account created successfully.");
      changeTab("login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const data = {
      username,
      email,
      password,
    };
    register.mutate(data);
    setLoading(true);
  };

  return (
    <>
      {register.isPending && <FullscreenLoader />}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="register-username">Username</Label>
          <Input
            id="register-username"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-email">Email</Label>
          <Input
            id="register-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-password">Password</Label>
          <Input
            id="register-password"
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-confirm-password">Confirm Password</Label>
          <Input
            className={`${
              password !== confirmPassword
                ? "border-red-500 ring-red-500 focus-visible:ring-red-500 focus-visible:border-red-500"
                : ""
            }`}
            id="register-confirm-password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </>
  );
};

export default RegisterComponent;
