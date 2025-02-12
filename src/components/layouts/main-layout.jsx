"use client";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

const MainLayout = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = "/login";
    }
  }, []);
  return <div className="w-screen">{children}</div>;
};

export default MainLayout;
