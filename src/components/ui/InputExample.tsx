"use client";

import React, { useState } from "react";
import { Input } from "./Input";

export const InputExample: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    search: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Input Component Examples
        </h1>
        <p className="text-gray-600">
          Demonstrating the reusable Input component features
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Input */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Basic Input</h2>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            error={errors.name}
            helperText="This is a helper text example"
          />
        </div>

        {/* Email Input with Icon */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Email Input with Icon</h2>
          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={errors.email}
            leftIcon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            }
          />
        </div>

        {/* Password Input with Right Icon */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Password Input</h2>
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            error={errors.password}
            rightIcon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            }
          />
        </div>

        {/* Search Input */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Search Input</h2>
          <Input
            type="search"
            placeholder="Search for anything..."
            value={formData.search}
            onChange={(e) => handleInputChange("search", e.target.value)}
            leftIcon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
          />
        </div>

        {/* Different Variants */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Input Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Default Variant"
              placeholder="Default style"
              variant="default"
            />
            <Input
              label="Filled Variant"
              placeholder="Filled style"
              variant="filled"
            />
            <Input
              label="Outlined Variant"
              placeholder="Outlined style"
              variant="outlined"
            />
          </div>
        </div>

        {/* Different Sizes */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Input Sizes</h2>
          <div className="space-y-4">
            <Input label="Small Size" placeholder="Small input" size="sm" />
            <Input
              label="Medium Size (Default)"
              placeholder="Medium input"
              size="md"
            />
            <Input label="Large Size" placeholder="Large input" size="lg" />
          </div>
        </div>

        {/* Disabled Input */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Disabled Input</h2>
          <Input
            label="Disabled Field"
            placeholder="This field is disabled"
            value="Disabled value"
            disabled
            helperText="This input is disabled and cannot be edited"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};
