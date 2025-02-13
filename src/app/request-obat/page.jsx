"use client";
const { default: MainLayout } = require("@/components/layouts/main-layout");
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";

const RequestPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchApi();
  }, []);
  const fetchApi = async () => {
    setLoading(true);
    try {
      const dataAuth = JSON.parse(localStorage.getItem("authData"));
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/obat`, {
        headers: {
          Authorization: `Bearer ${dataAuth.token}`,
        },
      });
      setData(res?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="w-full h-full">
        <div className="w-full h-full overflow-scroll flex flex-col gap-2 py-10 ">
          <div className="w-full flex justify-end  md:flex-row gap-2 ">
            <ModalList />
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nama Obat
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Jenis Obat
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Harga
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Expired
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  data?.map((item, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td className="px-6 py-4">{item?.nama_obat}</td>
                      <td className="px-6 py-4">{item?.jenis_obat}</td>
                      <td className="px-6 py-4">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item?.harga)}</td>{" "}
                      <td className="px-6 py-4">{item?.stock}</td>
                      <td className="px-6 py-4">{item?.expired}</td>
                      <td className="px-6 py-4">
                        <ModalRequest key={index} id={item?.id} data={item} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
const ModalList = () => {
  const [data, setData] = useState([]);
  const fetchApi = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/external/request-obat`, {
        headers: {
          Authorization: `Bearer ${authData?.token}`,
        },
      });
      setData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">List Request</Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>List Request</DialogTitle>
          <DialogDescription>List request obat anda</DialogDescription>
        </DialogHeader>
        <div className="w-full ">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nama Obat
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <td className="px-6 py-4">{item?.obat?.nama_obat}</td>
                    <td className="px-6 py-4">{item?.quantity}</td>
                    <td className="px-6 py-4">
                      {item?.status === "pending" && <span className="text-yellow-400">Pending</span>}
                      {item?.status === "approved_admin" && <span className="text-green-400">Approved</span>}
                      {item?.status === "approved_distributor" && <span className="text-green-400">Dikirim</span>}
                      {item?.status === "rejected" && <span className="text-red-400">Rejected</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ModalRequest = ({ id, data }) => {
  const [qty, setQty] = useState(0);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/external/request-obat`,
        { obat_id: id, quantity: qty },
        {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        }
      );
      toast({
        title: "Request Berhasil",
        description: "Anda berhasil request obat",
      });
      setQty(0);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Request</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Obat</DialogTitle>
          <DialogDescription>Request obat anda </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <div className="w-full flex items-center justify-between gap-2">
            <label>Quantity</label>
            <div className="flex gap-4 items-center">
              <button className="py-2 px-4 text-black border rounded" type="button" onClick={() => setQty(qty - 1)} disabled={qty === 0}>
                -
              </button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty(qty + 1)} disabled={qty === data?.stock} className="py-2 px-4 text-black border rounded">
                +
              </button>
            </div>
          </div>
          <div className="w-full flex items-center justify-between gap-2 bg-gradient px-4 py-2 mt-4 rounded ">
            <label className="text-[14px] text-white">Total</label>
            <div className="flex gap-4 items-center">
              <span className="text-[14px] text-white font-semibold">Rp. 100.000.00</span>
            </div>
          </div>

          <DialogFooter className="sm:justify-start">
            <Button className="w-full">Request Obat </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestPage;
