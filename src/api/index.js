import axios from "axios";

const api = axios.create({
  baseURL: "//localhost:8000/api"
});

// api.interceptors.response.use(
//   res => res,
//   err => {
//     sendErrorReport(err);
//     return Promise.reject(err);
//   }
// );

export default api;
