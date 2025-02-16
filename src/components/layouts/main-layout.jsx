"use client";
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import { Button } from "../ui/button";
import MobileNavbar from "./mobile-nav";
import { usePathname } from "next/navigation";

import { Toaster } from "@/components/ui/toaster";
const MainLayout = ({ children }) => {
  const pathname = usePathname();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("authData"));
    if (!userData) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="w-screen h-screen bg-white">
      <Toaster />
      <div className="w-full h-full ">{children}</div>
    </div>
  );
};

export default MainLayout;
