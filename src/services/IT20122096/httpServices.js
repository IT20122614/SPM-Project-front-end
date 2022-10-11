import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:8081/api/v1";

axios.defaults.headers.common["Authorization"] ="Bearer " + localStorage.getItem("token") || "token";

// axios.interceptors.response.use(null, (err) => {
//   let errorMessage = ""
//   if (typeof err.response.data === "string") {
//     errorMessage = err.response.data;
//   } else {
//     errorMessage = err.response.data.errors[0].defaultMessage;
//   }
//     toast.error(errorMessage,{autoClose:1000});
//   return Promise.reject(err);
// });

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
export default http;
