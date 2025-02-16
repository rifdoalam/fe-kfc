"use client";
import MainLayout from "@/components/layouts/main-layout";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [user, setUser] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("authData"));
    if (!userData) {
      window.location.href = "/login";
    }
    setUser(userData);
    fetchApi();
  }, []);
  const fetchApi = async () => {
    try {
      const dataAuth = JSON.parse(localStorage.getItem("authData"));
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profile/${dataAuth?.user?.id}`, {
        headers: {
          Authorization: `Bearer ${dataAuth.token}`,
        },
      });
      setData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authData");
    window.location.href = "/login";
  };

  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl">Hi, Welcome to the page {data?.name}</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </MainLayout>
  );
}
