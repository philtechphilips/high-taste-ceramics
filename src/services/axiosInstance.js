import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api", // Adjust as needed
  withCredentials: false,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optionally, redirect to sign-in or show a toast
      // window.location.href = "/sign-in";
      // Or use a toast notification
      // toast.error("Session expired. Please sign in again.");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
