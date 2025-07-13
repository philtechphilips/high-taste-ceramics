import React, { useState, useEffect } from "react";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";
import { FileInput } from "./ui/FileInput";
import { addProduct, getAllCategories } from "../services/admin.service";
import useAuthStore from "../store/authStore";
import { useToast } from "../contexts/ToastContext";

const AddProductModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    category_id: "",
    details: "",
    images: [],
    isFeatured: false,
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const token = user?.token;
  const { showToast } = useToast();

  // Fetch categories on modal open
  useEffect(() => {
    if (isOpen && token) {
      fetchCategories();
    }
  }, [isOpen, token]);

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const response = await getAllCategories(token);
      if (response.payload) {
        setCategories(response.payload);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
      newErrors.name = "Product name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Product name must be at least 2 characters";
    }

    if (!formData.category_id) {
      newErrors.category_id = "Please select a category";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Product image is required";
    }

    if (!formData.details.trim()) {
      newErrors.details = "Product details are required";
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
      // Prepare the data for submission
      const productData = {
        ...formData,
        images: formData.images.length > 0 ? formData.images : [formData.image], // Use main image if no additional images
      };

      const response = await addProduct(productData, token);

      if (response.statusCode === 201) {
        // Reset form
        setFormData({
          name: "",
          image: "",
          category_id: "",
          details: "",
          images: [],
          isFeatured: false,
        });
        setErrors({});

        // Show success message
        showToast("Product added successfully!", "success");

        // Close modal and refresh data
        setTimeout(() => {
          onClose();
          if (onSuccess) {
            onSuccess();
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to add product. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Product" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
            error={errors.name}
            required
          />
        </div>

        <Select
          label="Category"
          name="category_id"
          value={formData.category_id}
          onChange={handleInputChange}
          options={categoryOptions}
          placeholder="Select a category"
          error={errors.category_id}
          disabled={categoriesLoading}
          required
        />

        <FileInput
          label="Main Image"
          name="image"
          onFileSelect={handleFileSelect}
          placeholder="Select or drag and drop an image"
          error={errors.image}
          helperText="Supported formats: JPG, PNG, GIF. Max size: 5MB."
          required
        />

        <Textarea
          label="Product Details"
          name="details"
          value={formData.details}
          onChange={handleInputChange}
          placeholder="Enter product details and description"
          error={errors.details}
          rows={4}
          required
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isFeatured"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleInputChange}
            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
          />
          <label
            htmlFor="isFeatured"
            className="text-sm text-gray-700 dark:text-gray-300"
          >
            Mark as featured product
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            disabled={loading || categoriesLoading}
          >
            Add Product
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductModal;
