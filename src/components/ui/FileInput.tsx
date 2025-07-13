import React, { forwardRef, InputHTMLAttributes, useState } from "react";
import { cn } from "../../lib/utils";

export interface FileInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  error?: string;
  helperText?: string;
  accept?: string;
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  onFileSelect?: (base64: string, fileName: string) => void;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      accept = "image/*",
      variant = "default",
      size = "md",
      disabled,
      onFileSelect,
      ...props
    },
    ref,
  ) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");

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
      "rounded-lg",
      className,
    );

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);

      // Convert to base64
      const base64Reader = new FileReader();
      base64Reader.onload = (e) => {
        const base64 = e.target?.result as string;
        if (onFileSelect) {
          onFileSelect(base64, file.name);
        }
      };
      base64Reader.readAsDataURL(file);
    };

    return (
      <div className="w-full mb-4">
        {label && (
          <label className="block text-sm font-base text-[#718096] mb-2">
            {label}
          </label>
        )}

        <div className="space-y-3">
          <input
            type="file"
            accept={accept}
            className={inputClasses}
            ref={ref}
            disabled={disabled}
            onChange={handleFileChange}
            {...props}
          />

          {preview && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Preview:
              </p>
              <div className="relative w-32 h-32 border border-gray-200 rounded-lg overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreview("");
                    if (onFileSelect) {
                      onFileSelect("", "");
                    }
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {selectedFile && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Selected: {selectedFile.name}
            </p>
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

FileInput.displayName = "FileInput";

export { FileInput };
