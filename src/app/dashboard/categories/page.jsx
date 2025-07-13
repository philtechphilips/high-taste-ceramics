"use client";

import React, { useState } from "react";
import ReportDashboardLayout from "../../../components/ReportDashboardLayout";
import SimpleTable from "../../../components/ui/SimpleTable";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Home Decor",
    description: "Ceramic vases, decorative items, and home accessories",
    products: 24,
    status: "Active",
    image: "/images/Avatar.png",
  },
  {
    id: 2,
    name: "Tiles",
    description: "Kitchen and bathroom tiles, floor tiles",
    products: 18,
    status: "Active",
    image: "/images/Avatar.png",
  },
  {
    id: 3,
    name: "Bathroom",
    description: "Bathroom fittings, sinks, and accessories",
    products: 12,
    status: "Active",
    image: "/images/Avatar.png",
  },
  {
    id: 4,
    name: "Kitchenware",
    description: "Plates, bowls, cups, and kitchen accessories",
    products: 31,
    status: "Active",
    image: "/images/Avatar.png",
  },
  {
    id: 5,
    name: "Flooring",
    description: "Terrazzo and ceramic flooring materials",
    products: 8,
    status: "Active",
    image: "/images/Avatar.png",
  },
];

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <ReportDashboardLayout
      title="Categories"
      description="Manage your product categories"
      showActionButtons={true}
      onCreateNew={() => console.log("Add new category")}
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
                    src={category.image}
                    alt={category.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {category.name}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {category.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/dashboard/categories/edit/${category.id}`}
                    className="text-primary-400 hover:text-primary-600 text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {category.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <i className="ri-shopping-bag-line text-gray-400"></i>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {category.products} products
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
                        src={row.image}
                        alt={value}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {value}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {row.description}
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  header: "Products",
                  key: "products",
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
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
                        href={`/dashboard/categories/edit/${value}`}
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

export default CategoriesPage;
