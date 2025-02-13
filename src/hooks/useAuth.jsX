const { default: axios } = require("axios");
const { useRouter } = require("next/router");
const { useState, useEffect } = require("react");

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter;
  useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);
  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        email: email,
        password: password,
      });
      localStorage.setItem("authData", JSON.stringify(res?.data?.data));
      setIsAuthenticated(true);
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      setError(error.message);
    }
  };

  const logout = () => {
    console.log("TEs");
    localStorage.removeItem("authData");
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    loading,
    error,
    login,
    logout,
  };
};

export default useAuth;
