"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the navbar visibility
  const [user, setUser] = useState({});
  const pathname = usePathname();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("authData"));

    setUser(userData);
  }, []);
  // Toggle the navbar open/close
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" block md:hidden">
      {/* Mobile Navbar */}
      <div className="w-full h-full flex-col gap-2 fixed top-0 left-0 right-0  z-50">
        <div className="w-full p-5 flex justify-between items-center bg-[#f5f5f5] border-b">
          <h6 className="text-lg font-semibold">Owbat</h6>
          <button className="text-gray-700" onClick={toggleNavbar}>
            {isOpen ? "×" : "="} {/* Change icon when navbar is open/closed */}
          </button>
        </div>

        {/* Navbar links that appear when the navbar is open */}
        {isOpen && (
          <div className="w-full bg-[#f5f5f5] p-4 flex flex-col gap-4">
            {user?.users?.role === "admin" || user?.users?.role === "distributor" ? (
              <Link href={"/"} className={""}>
                Dashboard
              </Link>
            ) : (
              ""
            )}

            {user?.users?.role === "admin" || user?.users?.role === "distributor" ? (
              <Link href={"/request-listing"} className={""}>
                Request Liting
              </Link>
            ) : (
              ""
            )}
            {user?.users?.role === "external" && (
              <Link href={"/request-obat"} className={""}>
                Request Obat
              </Link>
            )}
            {user?.users?.role === "admin" ? (
              <Link href={"/obat"} className={""}>
                Obat
              </Link>
            ) : (
              ""
            )}
          </div>
        )}
      </div>

      {/* Desktop Navbar (hidden on mobile, shown on desktop) */}
    </div>
  );
};

export default MobileNavbar;
