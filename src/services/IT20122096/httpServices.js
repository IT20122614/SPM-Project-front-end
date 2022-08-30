import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:8080/api/v1";

axios.defaults.headers.common["Authorization"] ="Bearer " + localStorage.getItem("token") || "token";

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
