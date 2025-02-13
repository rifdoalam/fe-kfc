"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const { default: MainLayout } = require("@/components/layouts/main-layout");

const ObatPage = () => {
  const [data, setData] = useState([]);
  const { toast } = useToast();
  useEffect(() => {
    fetchApi();
  }, []);
  const fetchApi = async () => {
    try {
      const dataAuth = JSON.parse(localStorage.getItem("authData"));
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/obat`, {
        headers: {
          Authorization: `Bearer ${dataAuth.token}`,
        },
      });
      setData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const dataAuth = JSON.parse(localStorage.getItem("authData"));
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/obat/${id}`, {
        headers: {
          Authorization: `Bearer ${dataAuth.token}`,
        },
      });
      toast({
        title: "Data berhasil dihapus",
        description: `${new Date().toString()}`,
      });
      fetchApi();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MainLayout>
      <div className="w-full h-full">
        <div className="w-full h-full overflow-scroll flex flex-col gap-2 py-10 ">
          <div className="w-full flex justify-end  md:flex-row gap-2 ">
            <ModalAdd fetchApi={fetchApi} />
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
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Expired
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Harga
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => {
                  return (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td className="px-6 py-4">{item?.nama_obat}</td>
                      <td className="px-6 py-4">{item?.jenis_obat}</td>
                      <td className="px-6 py-4">{item?.stock}</td>
                      <td className="px-6 py-4">{item?.expired}</td>
                      <td className="px-6 py-4">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item?.harga)}</td>
                      <td className="px-6 py-4">
                        <Button variant="destructive" onClick={() => handleDelete(item?.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const ModalAdd = ({ fetchApi }) => {
  const [data, setData] = useState({ jenis_obat: "Tablet" });
  const { toast } = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataAuth = JSON.parse(localStorage.getItem("authData"));
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/obat`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${dataAuth.token}`,
          },
        }
      );
      toast({
        title: "Data berhasil ditambahkan",
        description: `${new Date().toString()}`,
      });
      setData({ jenis_obat: "Tablet" });
      fetchApi();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Tambah Obat</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Obat</DialogTitle>
          <DialogDescription>Tambah data obat</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[14px] font-semibold text-black">
              Nama Obat
            </label>
            <input
              onChange={(e) => setData({ ...data, nama_obat: e.target.value })}
              type="text"
              placeholder="input nama obat...."
              className="border p-2  text-black rounded-lg bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[14px] font-semibold text-black">
              Jenis Obat
            </label>
            <select onChange={(e) => setData({ ...data, jenis_obat: e.target.value })} className="border p-2  text-black rounded-lg bg-transparent">
              <option value="obat">Tablet</option>
              <option value="vaksin">Vaksin</option>
              <option value="vaksin">Sirup</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[14px] font-semibold text-black">
              Stock
            </label>
            <input
              onChange={(e) => setData({ ...data, stock: e.target.value })}
              type="number"
              placeholder="input nama stock...."
              className="border p-2  text-black rounded-lg bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[14px] font-semibold text-black">
              Harga
            </label>
            <input
              onChange={(e) => setData({ ...data, harga: e.target.value })}
              type="number"
              placeholder="input nama harga...."
              className="border p-2  text-black rounded-lg bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[14px] font-semibold text-black">
              Expired
            </label>
            <input
              onChange={(e) => setData({ ...data, expired: e.target.value })}
              type="date"
              placeholder="input nama expired...."
              className="border p-2  text-black rounded-lg bg-transparent"
            />
          </div>
          <Button className="py-2 px-4 text-white border rounded">Simpan</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ObatPage;
