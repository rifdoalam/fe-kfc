"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const { default: Link } = require("next/link");

const Navbar = () => {
  const [user, setUser] = useState({});
  const pathname = usePathname();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("authData"));

    setUser(userData);
  }, []);
  return (
    <div className="w-full h-full bg-gradient  hidden md:block  md:col-span-2 ">
      <div className="w-full h-full flex justify-between  p-4">
        <div className="w-full flex flex-col gap-10 ">
          <h6 className="font-semibold text-[34px] text-center  text-white">Owbat</h6>
          <div className="flex flex-col gap-3">
            {user?.users?.role === "admin" || user?.users?.role === "distributor" ? (
              <Link href={"/"} className={`py-2 px-4 text-white ${pathname === "/" && "glass-background text-black"}   `}>
                Dashboard
              </Link>
            ) : (
              ""
            )}
            {user?.users?.role === "admin" || user?.users?.role === "distributor" ? (
              <Link
                href={"/request-listing"}
                className={`py-2 px-4 text-white ${pathname === "/request-listing" && "glass-background text-black"}   `}>
                Request Liting
              </Link>
            ) : (
              ""
            )}
            {user?.users?.role === "external" && (
              <Link href={"/request-obat"} className={`py-2 px-4 text-white ${pathname === "/request-obat" && "glass-background text-black"}   `}>
                Request Obat
              </Link>
            )}
            {user?.users?.role === "admin" ? (
              <Link href={"/obat"} className={`py-2 px-4 text-white ${pathname === "/obat" && "glass-background text-black"}   `}>
                Obat
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
