"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";
import { FileInput } from "./ui/FileInput";
import { createBlog, updateBlog } from "../services/blog.service";
import useAuthStore from "../store/authStore";

const AddBlogModal = ({ isOpen, onClose, onSuccess, editBlog = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    tags: [],
    featured_image: "",
    status: "draft",
    meta_title: "",
    meta_description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = useAuthStore((state) => state.user);
  const token = user?.token;

  useEffect(() => {
    if (editBlog) {
      setFormData({
        title: editBlog.title || "",
        content: editBlog.content || "",
        excerpt: editBlog.excerpt || "",
        tags: editBlog.tags || [],
        featured_image: editBlog.featured_image || "",
        status: editBlog.status || "draft",
        meta_title: editBlog.meta_title || "",
        meta_description: editBlog.meta_description || "",
      });
    } else {
      setFormData({
        title: "",
        content: "",
        excerpt: "",
        tags: [],
        featured_image: "",
        status: "draft",
        meta_title: "",
        meta_description: "",
      });
    }
  }, [editBlog, isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTagsChange = (e) => {
    const value = e.target.value;
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    setFormData((prev) => ({
      ...prev,
      tags,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (editBlog) {
        await updateBlog(editBlog.id, formData, token);
      } else {
        await createBlog(formData, token);
      }
      onSuccess();
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
    { value: "archived", label: "Archived" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editBlog ? "Edit Blog Post" : "Add New Blog Post"}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
          </div>
        )}

        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter blog title"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FileInput
            label="Featured Image (Optional)"
            accept="image/*"
            onFileSelect={(base64, fileName) =>
              handleInputChange("featured_image", base64)
            }
            helperText="Upload an image for your blog post. Max 5MB."
          />
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            options={statusOptions}
            placeholder="Select status"
          />
        </div>

        <Input
          label="Tags (comma-separated)"
          name="tags"
          value={formData.tags.join(", ")}
          onChange={handleTagsChange}
          placeholder="Enter tags separated by commas"
        />

        <Textarea
          label="Excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleInputChange}
          placeholder="Enter a brief excerpt"
          rows={3}
        />

        <Textarea
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          placeholder="Enter blog content"
          rows={8}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Meta Title"
            name="meta_title"
            value={formData.meta_title}
            onChange={handleInputChange}
            placeholder="SEO meta title"
          />
          <Textarea
            label="Meta Description"
            name="meta_description"
            value={formData.meta_description}
            onChange={handleInputChange}
            placeholder="SEO meta description"
            rows={2}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : editBlog ? "Update Blog" : "Create Blog"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBlogModal;
