"use client";

import React, { useState, useEffect } from "react";
import ReportDashboardLayout from "../../../components/ReportDashboardLayout";
import SimpleTable from "../../../components/ui/SimpleTable";
import AddProductModal from "../../../components/AddProductModal";
import EditProductModal from "../../../components/EditProductModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import {
  fetchProducts,
  deleteProduct,
  fetchProductCategories,
} from "../../../services/product.service";
import useAuthStore from "../../../store/authStore";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const token = user?.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetchProducts(),
          fetchProductCategories(),
        ]);

        if (productsResponse.payload) {
          setProducts(productsResponse.payload);
        }

        if (categoriesResponse.payload) {
          setCategories(categoriesResponse.payload);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (isFeatured) => {
    if (isFeatured) {
      return "bg-yellow-100 text-yellow-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (isFeatured) => {
    if (isFeatured) {
      return "Featured";
    } else {
      return "Active";
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEditProductModal(true);
  };

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDeleteProduct = async () => {
    if (!selectedProduct) return;

    setDeleteLoading(true);
    try {
      await deleteProduct(selectedProduct.id, token);
      // Refresh products list
      const response = await fetchProducts();
      if (response.payload) {
        setProducts(response.payload);
      }
      setShowDeleteModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const refreshProducts = async () => {
    setLoading(true);
    try {
      const response = await fetchProducts();
      if (response.payload) {
        setProducts(response.payload);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ReportDashboardLayout
        title="Products"
        description="Manage your ceramics products"
        showActionButtons={true}
        onCreateNew={() => console.log("Add new product")}
        createButtonText="Add Product"
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading products...</div>
        </div>
      </ReportDashboardLayout>
    );
  }

  return (
    <ReportDashboardLayout
      title="Products"
      description="Manage your ceramics products"
      showActionButtons={true}
      onCreateNew={() => setShowAddProductModal(true)}
      createButtonText="Add Product"
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Products
              </label>
              <input
                type="text"
                placeholder="Search by product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="md:w-48">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Products ({filteredProducts.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <SimpleTable
              data={filteredProducts}
              columns={[
                {
                  header: "Product",
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
                          {row.category?.name || "Uncategorized"}
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  header: "Details",
                  key: "details",
                  render: (value) => (
                    <span className="text-gray-900 dark:text-white text-sm">
                      {value
                        ? value.length > 50
                          ? value.substring(0, 50) + "..."
                          : value
                        : "No details"}
                    </span>
                  ),
                },
                {
                  header: "Status",
                  key: "isFeatured",
                  render: (value, row) => {
                    const status = getStatusText(row.isFeatured);
                    const statusColor = getStatusColor(row.isFeatured);
                    return (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
                      >
                        {status}
                      </span>
                    );
                  },
                },
                {
                  header: "Actions",
                  key: "id",
                  render: (value, row) => (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditProduct(row)}
                        className="text-primary-400 hover:text-primary-600 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(row)}
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

      <AddProductModal
        isOpen={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        onSuccess={refreshProducts}
      />

      <EditProductModal
        isOpen={showEditProductModal}
        onClose={() => setShowEditProductModal(false)}
        product={selectedProduct}
        onSuccess={refreshProducts}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteProduct}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete Product"
        loading={deleteLoading}
        itemName={selectedProduct?.name}
      />
    </ReportDashboardLayout>
  );
};

export default ProductsPage;
