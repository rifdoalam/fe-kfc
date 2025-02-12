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
      const res = await axios.post(`${process.env.NEXT_URL_API}/login`, {
        email: email,
        password: password,
      });
      localStorage.setItem("authData", JSON.stringify(res.data));
      setIsAuthenticated(true);
      setLoading(false);
      router.push("/");
    } catch (error) {
      setError(err.message);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authData");
    setLoading(false);
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
