"use client";
import MainLayout from "@/components/layouts/main-layout";

import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import ExpiredChart from "@/components/chart/expired";
import axios from "axios";
import StockChart from "@/components/chart/stockl";

export default function Home() {
  const [openModal, setOpenModal] = useState(0);
  const [obats, setObats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [user, setUser] = useState({});
  const [stock, setStock] = useState([]);
  const [expired, setExpired] = useState([]);
  const { logout } = useAuth();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("authData"));
    console.log(userData?.users);
    if (!userData) {
      window.location.href = "/login";
    }
    setUser(userData);
    if (userData?.users?.role == "admin") {
      fetchApiListing();
    }
    fetchExpired();
    fetchStock();
  }, []);
  const fetchStock = async () => {
    try {
      const dataAuth = JSON.parse(localStorage.getItem("authData"));
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/obat/stock`, {
        headers: {
          Authorization: `Bearer ${dataAuth.token}`,
        },
      });
      setStock(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchExpired = async () => {
    try {
      const dataAuth = JSON.parse(localStorage.getItem("authData"));
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/obat/expired`, {
        headers: {
          Authorization: `Bearer ${dataAuth.token}`,
        },
      });
      setExpired(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchApiListing = async () => {
    const dataAuth = JSON.parse(localStorage.getItem("authData"));
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/request-obat`, {
        headers: { Authorization: `Bearer ${dataAuth?.token}` },
      });
      setLists(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <div className="w-full h-full">
        <div className="w-full h-full overflow-scroll flex flex-col gap-2 py-10 ">
          <div className="w-full flex flex-col  md:flex-row gap-3 mb-10">
            <div className="w-full h-full p-10 flex justify-center items-center bg-white shadow-lg md:w-6/12 ">
              <ExpiredChart expired={expired?.expired_more_week} nonExpired={expired?.expired_less_week} />
            </div>
            <div className="w-full h-full p-10 flex justify-center items-center bg-white shadow-lg md:w-6/12 ">
              <StockChart stockBanyak={stock?.stock_banyak} stockSedikit={stock?.stock_sedikit} />
            </div>
          </div>
          {user?.users?.role === "admin" && (
            <div className="w-full">
              <div className="relative overflow-x-aut py-10">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Nama User
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Nama Obat
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {lists?.map((item, index) => (
                      <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <td className="px-6 py-4">{item?.user?.name}</td>
                        <td className="px-6 py-4">{item?.obat?.nama_obat}</td>
                        <td className="px-6 py-4">{item?.quantity}</td>
                        <td className="px-6 py-4">
                          {item?.status === "pending" && <span className="text-yellow-400">Pending</span>}
                          {item?.status === "approved_admin" && <span className="text-green-400">Approved</span>}
                          {item?.status === "approved_distributor" && <span className="text-green-400">Dikirim</span>}
                          {item?.status === "rejected" && <span className="text-red-400">Rejected</span>}
                        </td>
                        <td className="px-6 py-4 flex gap-2">
                          {item?.status === "pending" && (
                            <Button type="button" onClick={() => handleAction(item?.id, "approved_admin")} variant="outline">
                              Accept
                            </Button>
                          )}
                          {item?.status === "pending" && (
                            <Button type="button" onClick={() => handleAction(item?.id, "rejected")}>
                              Rejected
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 
      {user?.users?.role === "admin" && <AdminLayout />}
      {user?.users?.role === "external" && <ExternalComponent />} */}
    </MainLayout>
  );
}
