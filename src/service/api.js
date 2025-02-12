// /src/services/api.js
import axios from "axios";

const api = ({ headers, data, methode }) => {
  return axios.create({
    method: methode,
    baseURL: process.env.NEXT_URL_API, // Ganti dengan URL API yang sesuai
    data: data,
    headers: headers,
  });
};

export default api;
