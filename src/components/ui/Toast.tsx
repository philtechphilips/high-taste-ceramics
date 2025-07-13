import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export interface ToastProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 3000,
}) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      const timer = setTimeout(() => {
        setIsShowing(false);
        setTimeout(onClose, 300); // Wait for fade out animation
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const typeClasses = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const iconClasses = {
    success: "ri-check-line text-green-500",
    error: "ri-error-warning-line text-red-500",
    warning: "ri-alert-line text-yellow-500",
    info: "ri-information-line text-blue-500",
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 max-w-sm w-full p-4 rounded-lg border shadow-lg transition-all duration-300",
        typeClasses[type],
        isShowing ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
      )}
    >
      <div className="flex items-start space-x-3">
        <i className={cn("text-xl mt-0.5", iconClasses[type])}></i>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsShowing(false);
            setTimeout(onClose, 300);
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <i className="ri-close-line text-lg"></i>
        </button>
      </div>
    </div>
  );
};

export { Toast };
