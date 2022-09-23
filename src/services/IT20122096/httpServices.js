import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.API_URL;

axios.defaults.headers.common["x-auth-token"] =
  localStorage.getItem("token") || "token";

axios.interceptors.response.use(null, (err) => {
  toast.error(err.message);
  console.log(err.message);
  return Promise.reject(err);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
export default http;