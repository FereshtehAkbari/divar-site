import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";
import { getNewTokens } from "../services/token";
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  Headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `bearer ${accessToken}`;
    }
    return request;
  },
  async (error) => {
    const originalRequest = error.confige;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await getNewTokens();
      if (!res?.response) return;
      setCookie(res.response.data);
      return api(originalRequest);
    }
  }
);

export default api;
