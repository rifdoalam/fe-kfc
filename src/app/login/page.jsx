const LoginPage = () => {
  return (
    <div className="w-screen h-screen overflow-x-hidden ">
      <div className="w-full h-full flex justify-center bg-white items-center">
        <div className="w-4/12 bg-white p-10 shadow-lg border rounded-lg ">
          <form className="flex flex-col gap-3">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="email" className="text-[14px] font-semibold text-black">
                Email
              </label>
              <input type="email" id="email" placeholder="input email...." className="border p-2  text-black rounded-lg" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="password" className="text-[14px] font-semibold text-black">
                Password
              </label>
              <input type="password" id="email" placeholder="input password...." className="border p-2 rounded-lg text-black" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <button type="submit" className="bg-black text-white p-2 rounded-lg">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
