"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const ModalRequestList = ({ setCloseModal, selected }) => {
  const [qty, setQty] = useState(0);
  const [lists, setLists] = useState({});
  useEffect(() => {
    fetchList();
  }, []);
  const fetchList = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/request-obat`, {
        headers: {
          Authorization: `Bearer ${authData?.token}`,
        },
      });
      setLists(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-6/12 h-[50vh] border rounded-lg p-6 bg-white shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 ">
      <div className="relative">
        <div className="header flex items-center justify-between">
          <h6 className="font-semibold text-black">Modal Request</h6>
          <button className="py-2 px-4 text-black border rounded" type="button" onClick={() => setCloseModal(0)}>
            X
          </button>
        </div>
        <div className="body w-full h-full overflow-scroll mt-4 flex flex-col gap-2">
          <table className="w-full ">
            <thead className="w-full ">
              {lists?.map((item, index) => (
                <tr key={index} className="text-black text-left text-[14px]">
                  <th className="w-1/12 py-2">No</th>
                </tr>
              ))}
            </thead>
            <tbody>
              <tr className="text-black">
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="footer w-full gap-2 fixed bottom-0 left-0 p-4">
        <button type="button" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Request
        </button>
      </div>
    </div>
  );
};

export default ModalRequestList;
