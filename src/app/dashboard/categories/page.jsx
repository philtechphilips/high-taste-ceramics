"use client";

import React, { useState, useEffect } from "react";
import ReportDashboardLayout from "../../../components/ReportDashboardLayout";
import SimpleTable from "../../../components/ui/SimpleTable";
import AddCategoryModal from "../../../components/AddCategoryModal";
import EditCategoryModal from "../../../components/EditCategoryModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import Link from "next/link";
import {
  fetchProductCategories,
  deleteCategory,
} from "../../../services/product.service";
import useAuthStore from "../../../store/authStore";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const token = user?.token;

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await fetchProductCategories();
        if (response.payload) {
          setCategories(response.payload);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesData();
  }, [token]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setShowEditCategoryModal(true);
  };

  const handleDeleteCategory = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const confirmDeleteCategory = async () => {
    if (!selectedCategory) return;

    setDeleteLoading(true);
    try {
      await deleteCategory(selectedCategory.id, token);
      // Refresh categories list
      const response = await fetchProductCategories();
      if (response.payload) {
        setCategories(response.payload);
      }
      setShowDeleteModal(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const refreshCategories = async () => {
    setLoading(true);
    try {
      const response = await fetchProductCategories();
      if (response.payload) {
        setCategories(response.payload);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ReportDashboardLayout
        title="Categories"
        description="Manage your product categories"
        showActionButtons={true}
        onCreateNew={() => console.log("Add new category")}
        createButtonText="Add Category"
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading categories...</div>
        </div>
      </ReportDashboardLayout>
    );
  }

  return (
    <ReportDashboardLayout
      title="Categories"
      description="Manage your product categories"
      showActionButtons={true}
      onCreateNew={() => setShowAddCategoryModal(true)}
      createButtonText="Add Category"
    >
      <div className="space-y-6">
        {/* Search Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
          <div className="max-w-md">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Categories
            </label>
            <input
              type="text"
              placeholder="Search by category name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={category.image || "/images/Avatar.png"}
                    alt={category.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {category.name}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {category.description || "No description available"}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <i className="ri-shopping-bag-line text-gray-400"></i>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {category.productCount || 0} products
                  </span>
                </div>
                <Link
                  href={`/dashboard/products?category=${category.name}`}
                  className="text-primary-400 hover:text-primary-600 text-sm font-medium"
                >
                  View Products
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Categories Table View */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              All Categories ({filteredCategories.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <SimpleTable
              data={filteredCategories}
              columns={[
                {
                  header: "Category",
                  key: "name",
                  render: (value, row) => (
                    <div className="flex items-center space-x-3">
                      <img
                        src={row.image || "/images/Avatar.png"}
                        alt={value}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {value}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {row.description || "No description"}
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  header: "Products",
                  key: "productCount",
                  render: (value) => (
                    <span className="font-medium text-gray-900 dark:text-white">
                      {value || 0}
                    </span>
                  ),
                },
                {
                  header: "Status",
                  key: "isDeleted",
                  render: (value) => (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  ),
                },
                {
                  header: "Actions",
                  key: "id",
                  render: (value, row) => (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditCategory(row)}
                        className="text-primary-400 hover:text-primary-600 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(row)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>

      <AddCategoryModal
        isOpen={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
        onSuccess={refreshCategories}
      />

      <EditCategoryModal
        isOpen={showEditCategoryModal}
        onClose={() => setShowEditCategoryModal(false)}
        category={selectedCategory}
        onSuccess={refreshCategories}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteCategory}
        title="Delete Category"
        message="Are you sure you want to delete this category? This will also delete all products in this category. This action cannot be undone."
        confirmText="Delete Category"
        loading={deleteLoading}
        itemName={selectedCategory?.name}
      />
    </ReportDashboardLayout>
  );
};

export default CategoriesPage;
