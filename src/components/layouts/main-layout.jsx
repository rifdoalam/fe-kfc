"use client";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import { Button } from "../ui/button";
import MobileNavbar from "./mobile-nav";
import { usePathname } from "next/navigation";

const MainLayout = ({ children }) => {
  const pathname = usePathname();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("authData"));
    if (!userData) {
      window.location.href = "/login";
    }
  }, []);
  const { loading, isAuthenticated, logout } = useAuth();
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };
  useEffect(() => {
    if (!isAuthenticated !== true) {
      console.log("Tes");
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="w-screen h-screen bg-white">
      {" "}
      <div className="w-full h-full grid grid-cols-12 py-14 md:py-0 ">
        <Navbar />
        <MobileNavbar />
        <div className="w-full h-full p-10 col-span-12 md:col-span-10">
          {" "}
          <div className="header w-full flex justify-between">
            {pathname === "/" && <h6 className="font-semibold text-[28px] text-center text-black">Dashboard</h6>}
            {pathname === "/request-listing" && <h6 className="font-semibold text-[28px] text-center text-black">Request List</h6>}
            {pathname === "/request-obat" && <h6 className="font-semibold text-[28px] text-center text-black">Request Obat</h6>}
            {pathname === "/obat" && <h6 className="font-semibold text-[28px] text-center text-black">Obat</h6>}

            <div>
              <Button onClick={handleLogout} disabled={loading} type="button" className="py-2 px-4 text-white bg-rose-600 border rounded">
                Logout
              </Button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
