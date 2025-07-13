import React, { forwardRef, SelectHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      options,
      placeholder,
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

    const selectClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      stateClasses,
      error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
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

        <select
          className={selectClasses}
          ref={ref}
          disabled={disabled}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
