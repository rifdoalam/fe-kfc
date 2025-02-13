"use client";
import { useState } from "react";
import ExpiredChart from "./chart/expired";
import useAuth from "@/hooks/useAuth";
import ModalRequestList from "./modal/modal-list";
import ModalRequest from "./modal/modal-request";
const AdminLayout = () => {
  const { logout } = useAuth();

  const [openModal, setOpenModal] = useState(0);
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center bg-white container mx-auto">
      {openModal === 1 && <ModalRequest setCloseModal={() => setOpenModal(0)} selected={selected} />}
      <div className="w-full flex gap-2 items-center">
        <button onClick={() => setModal(1)} className="py-2 px-4 text-black border rounded">
          Request List
        </button>
        <button className="py-2 px-4 text-black border rounded">Daftar Obat</button>
        <button className="py-2 px-4 text-white border bg-rose-600  rounded" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="w-full flex gap-2">
        <div className="w-6/12">
          <ExpiredChart />
        </div>
        <div className="w-6/12">
          <ExpiredChart />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
