const ModalRequest = ({ setCloseModal, selected }) => {
  const [qty, setQty] = useState(0);
  const handleRequestObat = async () => {
    try {
      const dataAuth = JSON.parse(localStorage.getItem("authData"));
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/external/request-obat`,
        {
          obat_id: selected?.id,
          quantity: qty,
        },
        {
          headers: {
            Authorization: `Bearer ${dataAuth?.token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-4/12 h-[50vh] border rounded-lg p-6 bg-white shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 ">
      <div className="relative">
        <div className="header flex items-center justify-between">
          <h6 className="font-semibold text-black">Modal Request</h6>
          <button className="py-2 px-4 text-black border rounded" type="button" onClick={() => setCloseModal(0)}>
            X
          </button>
        </div>
        <div className="body w-full h-full overflow-scroll mt-4 flex flex-col gap-2">
          <div className="flex justify-between items-center border-b py-2">
            <label className="text-[14px] font-semibold text-black">Nama Obat</label>
            <span className="text-[14px] text-black">{selected?.nama_obat}</span>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <label className="text-[14px] font-semibold text-black">Jenis Obat</label>
            <span className="text-[14px] text-black">{selected?.jenis_obat}</span>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <label className="text-[14px] font-semibold text-black">Stock</label>
            <span className="text-[14px] text-black">{selected?.stock} pcs</span>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <label className="text-[14px] font-semibold text-black">Quantity</label>
            <div className="flex gap-2 items-center">
              <button className="p-2 text-black border rounded" onClick={() => setQty(qty - 1)} disabled={qty === 0} type="button">
                -
              </button>
              <span className="text-[14px] text-black">{qty}</span>
              <button className="p-2 text-black border rounded" onClick={() => setQty(qty + 1)} disabled={qty === selected?.stock} type="button">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer w-full gap-2 fixed bottom-0 left-0 p-4">
        <button onClick={handleRequestObat} type="button" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Request
        </button>
      </div>
    </div>
  );
};

export default ModalRequest;
