import React, { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant = "default",
      size = "md",
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "w-full transition-all duration-200 font-medium text-sm bg-[#EDF2FF] dark:bg-primary-100 text-sm text-neutral-900 dark:text-neutral-100";

    const variantClasses = {
      default: "border border-neutral-200 outline-none",
      filled:
        "border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 hover:bg-gray-100",
      outlined:
        "border-2 border-gray-300 bg-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 hover:border-gray-400",
    };

    const sizeClasses = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-4 text-lg",
    };

    const stateClasses = disabled
      ? "opacity-50 cursor-not-allowed bg-gray-100"
      : "";

    const inputClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      stateClasses,
      error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
      leftIcon && "pl-10",
      rightIcon && "pr-10",
      "rounded-lg",
      className,
    );

    return (
      <div className="w-full mb-4">
        {label && (
          <label className="block text-sm font-base text-[#718096] mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            type={type}
            className={inputClasses}
            ref={ref}
            disabled={disabled}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
