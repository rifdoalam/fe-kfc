"use client";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

const LoginPage = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
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
                id="email"
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
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
