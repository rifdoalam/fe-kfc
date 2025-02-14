"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        ...credentials,
      });
      localStorage.setItem("authData", JSON.stringify(res?.data?.data));
      if (res?.data?.data?.users?.role !== "external") {
        window.location.href = "/";
      } else {
        window.location.href = "/request-obat";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden ">
      <div className="w-full h-full flex justify-center bg-gradient items-center px-10">
        <div className=" w-full lg:w-4/12 bg-transparent p-10 shadow-lg border rounded-lg ">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="email" className="text-[14px] font-semibold text-white">
                Email
              </label>
              <input
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                type="email"
                id="email"
                placeholder="input email...."
                className="border p-2  text-white rounded-lg bg-transparent"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="password" className="text-[14px] font-semibold text-white ">
                Password
              </label>
              <input
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                type="password"
                placeholder="input password...."
                className="border p-2 rounded-lg text-white bg-transparent"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <button type="submit" className="bg-black text-white p-2 rounded-lg">
                Login
              </button>
            </div>
          </form>
          <div>
            <ModalRegister />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

const ModalRegister = () => {
  const [data, setData] = useState({ role: "external" });
  const { toast } = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, { ...data });
      toast({
        title: "Data berhasil ditambahkan",
        description: `${new Date().toString()}`,
      });
      setData({ name: "", password: "", email: "", role: "external" });
    } catch (error) {
      toast({
        title: `${error?.response?.data?.message}`,
        description: `${new Date().toString()}`,
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="mt-3">
        <span className="text-white">Belum punya account? Register</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>Daftarkan akun anda</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[14px] font-semibold text-black">
              Nama
            </label>
            <input
              onChange={(e) => setData({ ...data, name: e.target.value })}
              type="text"
              placeholder="input nama anda...."
              className="border p-2  text-black rounded-lg bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[14px] font-semibold text-black">
              Email
            </label>
            <input
              onChange={(e) => setData({ ...data, email: e.target.value })}
              type="email"
              placeholder="input email anda...."
              className="border p-2  text-black rounded-lg bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[14px] font-semibold text-black">
              Password
            </label>
            <input
              onChange={(e) => setData({ ...data, password: e.target.value })}
              type="password"
              placeholder="input password anda...."
              className="border p-2  text-black rounded-lg bg-transparent"
            />
          </div>
          <div className="mt-4 w-full">
            <Button type="submit" variant="outline" className="w-full">
              Register
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
