import React, { useState } from "react";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Button } from "./ui/Button";
import { FileInput } from "./ui/FileInput";
import { addCategory } from "../services/admin.service";
import useAuthStore from "../store/authStore";
import { useToast } from "../contexts/ToastContext";

const AddCategoryModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const token = user?.token;
  const { showToast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileSelect = (base64, fileName) => {
    setFormData((prev) => ({
      ...prev,
      image: base64,
    }));
    // Clear error when file is selected
    if (errors.image) {
      setErrors((prev) => ({
        ...prev,
        image: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Category name must be at least 2 characters";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Category image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await addCategory(formData, token);

      if (response.statusCode === 201) {
        // Reset form
        setFormData({
          name: "",
          description: "",
          image: "",
        });
        setErrors({});

        // Show success message
        showToast("Category added successfully!", "success");

        // Close modal and refresh data
        setTimeout(() => {
          onClose();
          if (onSuccess) {
            onSuccess();
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to add category. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Category" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        <Input
          label="Category Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter category name"
          error={errors.name}
          required
        />

        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter category description (optional)"
          error={errors.description}
          rows={3}
        />

        <FileInput
          label="Image"
          name="image"
          onFileSelect={handleFileSelect}
          placeholder="Select or drag and drop an image"
          error={errors.image}
          helperText="Supported formats: JPG, PNG, GIF. Max size: 5MB."
          required
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" loading={loading} disabled={loading}>
            Add Category
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
