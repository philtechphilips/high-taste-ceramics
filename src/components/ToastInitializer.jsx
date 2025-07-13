"use client";

import { useEffect } from "react";
import { useToast } from "../contexts/ToastContext";
import { setToastFunction, setLogoutFunction } from "../services/axiosInstance";
import useAuthStore from "../store/authStore";

const ToastInitializer = () => {
  const { showToast } = useToast();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    // Set the global toast function for axios interceptor
    setToastFunction(showToast);
    // Set the global logout function for axios interceptor
    setLogoutFunction(logout);
  }, [showToast, logout]);

  return null; // This component doesn't render anything
};

export default ToastInitializer;
