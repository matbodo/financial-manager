import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

API.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";
    const isAuthRequest =
      requestUrl.includes("/login") || requestUrl.includes("/register");

    if (status === 401 && !isAuthRequest) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default API;
