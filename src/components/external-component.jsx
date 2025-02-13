"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
const ExternalComponent = () => {
  const [obats, setObats] = useState([]);

  const [openModal, setOpenModal] = useState(0);
  const { logout } = useAuth();
  useEffect(() => {
    getObat();
  }, []);
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Function to get all data obat from API.
   * The function will be called when component mounts.
   * The data will be stored in state obats.
   */
  /******  acbc1617-8ec0-4252-9065-ca405b471958  *******/ const getObat = async () => {
    try {
      const dataAuth = JSON.parse(localStorage.getItem("authData"));
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/obat`, {
        headers: {
          Authorization: `Bearer ${dataAuth?.token}`,
        },
      });
      setObats(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full overflow-hidden relative h-full bg-white flex justify-center items-center">
      {openModal === 1 && <ModalRequest setCloseModal={() => setOpenModal(0)} selected={selected} />}
      <div className="w-full  container mx-auto ">
        <table className="w-full overflow-y-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr className="text-white">
              <th scope="col" class="px-6 py-3">
                Nama Obat
              </th>
              <th scope="col" class="px-6 py-3">
                Jenis Obat
              </th>
              <th scope="col" class="px-6 py-3">
                Stock
              </th>
              <th scope="col" class="px-6 py-3">
                Expired
              </th>
              <th scope="col" class="px-6 py-3">
                Harga
              </th>
              <th scope="col" class="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {obats?.map((obat, index) => (
              <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td class="px-6 py-4">{obat?.nama_obat}</td>
                <td class="px-6 py-4">{obat?.jenis_obat}</td>
                <td class="px-6 py-4">{obat?.stock}</td>
                <td class="px-6 py-4">{obat?.expired}</td>
                <td class="px-6 py-4">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(obat?.harga)}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      if (openModal === 1) {
                        setOpenModal(0);
                        setSelected(null);
                      } else {
                        setOpenModal(1);
                        setSelected(obat);
                      }
                    }}
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Request Obat
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <button type="button" onClick={handleLogout} className="w-4/12 bg-[#FF0000] hover:bg-[#FF0000] text-white font-bold py-2 px-4 rounded">
            {" "}
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExternalComponent;
