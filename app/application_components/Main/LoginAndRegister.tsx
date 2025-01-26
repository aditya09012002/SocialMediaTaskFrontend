"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import { useState } from "react";

const LoginAndRegister = () => {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <Tabs value={activeTab} defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger onClick={()=>setActiveTab("login")} value="login">Login</TabsTrigger>
            <TabsTrigger onClick={()=>setActiveTab("register")} value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginComponent />
          </TabsContent>
          <TabsContent value="register">
            <RegisterComponent changeTab={setActiveTab} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginAndRegister;
