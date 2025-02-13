"use client";
import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
const RequestListing = () => {
  const [data, setData] = useState([]);
  const { toast } = useToast();
  const [user, setUser] = useState({});
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("authData"));
    setUser(userData);
    if (user?.users?.role == "admin") {
      fetchApi();
    } else {
      fetchApiDistributor();
    }
  }, []);
  const fetchApi = async () => {
    const dataAuth = JSON.parse(localStorage.getItem("authData"));
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/request-obat`, {
        headers: { Authorization: `Bearer ${dataAuth?.token}` },
      });
      setData(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchApiDistributor = async () => {
    try {
      const dataAuth = JSON.parse(localStorage.getItem("authData"));
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/distributor/obat`, { headers: { Authorization: `Bearer ${dataAuth?.token}` } });
      setData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAction = async (id, status) => {
    try {
      const dataAuth = JSON.parse(localStorage.getItem("authData"));
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/request-obat/${id}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${dataAuth?.token}`,
          },
        }
      );
      toast({
        title: "Data berhasil diupdate",
        description: `${new Date().toString()}`,
      });
      fetchApi();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDistributor = async (id) => {
    try {
      const dataAuth = JSON.parse(localStorage.getItem("authData"));
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/distributor/request-obat/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${dataAuth?.token}` },
        }
      );
      fetchApiDistributor();
      toast({
        title: "Data berhasil diupdate",
        description: `${new Date().toString()}`,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MainLayout>
      <div className="w-full h-full">
        {user?.users?.role === "admin" && (
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
                {data?.map((item, index) => (
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
        )}
        {user?.users?.role === "distributor" && (
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
                {data?.map((item, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <td className="px-6 py-4">{item?.user?.name}</td>
                    <td className="px-6 py-4">{item?.obat?.nama_obat}</td>
                    <td className="px-6 py-4">{item?.quantity}</td>
                    <td className="px-6 py-4">
                      {item?.status === "pending" && <span className="text-yellow-400">Pending</span>}
                      {item?.status === "approved_admin" && <span className="text-green-400">Approved Admin</span>}
                      {item?.status === "approved_distributor" && <span className="text-green-400">Dikirim</span>}
                      {item?.status === "rejected" && <span className="text-red-400">Rejected</span>}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      {item?.status === "approved_admin" && (
                        <Button type="button" onClick={() => handleDistributor(item?.id)} variant="outline">
                          Approved
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default RequestListing;
