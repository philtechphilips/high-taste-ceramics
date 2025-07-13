"use client";

import React, { useState } from "react";
import ReportDashboardLayout from "../../../components/ReportDashboardLayout";
import SimpleTable from "../../../components/ui/SimpleTable";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Ceramic Vase Set",
    category: "Home Decor",
    price: "$89.99",
    stock: 45,
    status: "Active",
    image: "/images/Avatar.png",
  },
  {
    id: 2,
    name: "Kitchen Tiles",
    category: "Tiles",
    price: "$245.50",
    stock: 12,
    status: "Active",
    image: "/images/Avatar.png",
  },
  {
    id: 3,
    name: "Bathroom Fittings",
    category: "Bathroom",
    price: "$156.75",
    stock: 8,
    status: "Low Stock",
    image: "/images/Avatar.png",
  },
  {
    id: 4,
    name: "Ceramic Plates",
    category: "Kitchenware",
    price: "$67.25",
    stock: 0,
    status: "Out of Stock",
    image: "/images/Avatar.png",
  },
  {
    id: 5,
    name: "Terrazzo Flooring",
    category: "Flooring",
    price: "$89.99",
    stock: 23,
    status: "Active",
    image: "/images/Avatar.png",
  },
];

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Home Decor",
    "Tiles",
    "Bathroom",
    "Kitchenware",
    "Flooring",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <ReportDashboardLayout
      title="Products"
      description="Manage your ceramics products"
      showActionButtons={true}
      onCreateNew={() => console.log("Add new product")}
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
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
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
                        src={row.image}
                        alt={value}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {value}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {row.category}
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  header: "Price",
                  key: "price",
                  render: (value) => (
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {value}
                    </span>
                  ),
                },
                {
                  header: "Stock",
                  key: "stock",
                  render: (value) => (
                    <span className="font-medium text-gray-900 dark:text-white">
                      {value}
                    </span>
                  ),
                },
                {
                  header: "Status",
                  key: "status",
                  render: (value) => (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(value)}`}
                    >
                      {value}
                    </span>
                  ),
                },
                {
                  header: "Actions",
                  key: "id",
                  render: (value) => (
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/dashboard/products/edit/${value}`}
                        className="text-primary-400 hover:text-primary-600 text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <button className="text-red-500 hover:text-red-700 text-sm font-medium">
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
    </ReportDashboardLayout>
  );
};

export default ProductsPage;
