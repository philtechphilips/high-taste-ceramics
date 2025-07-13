import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api", // Adjust as needed
  withCredentials: false,
});

// Global toast notification function
let showToast = null;
let logout = null;

export const setToastFunction = (toastFunction) => {
  showToast = toastFunction;
};

export const setLogoutFunction = (logoutFunction) => {
  logout = logoutFunction;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Show session expired toast
      if (showToast) {
        showToast("Session expired. Please sign in again.", "error");
      }

      // Logout user using auth store
      if (logout) {
        logout();
      } else {
        // Fallback: manually clear localStorage and redirect
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
          window.location.href = "/sign-in";
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
