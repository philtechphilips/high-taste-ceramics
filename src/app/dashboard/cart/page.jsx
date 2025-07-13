"use client";

import React, { useState } from "react";
import ReportDashboardLayout from "../../../components/ReportDashboardLayout";
import SimpleTable from "../../../components/ui/SimpleTable";
import Link from "next/link";

const cartItems = [
  {
    id: 1,
    customer: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    items: [
      { name: "Ceramic Vase Set", quantity: 2, price: "$89.99" },
      { name: "Kitchen Tiles", quantity: 1, price: "$245.50" },
    ],
    total: "$425.48",
    status: "Active",
    date: "Today, 10:30 AM",
  },
  {
    id: 2,
    customer: "Mike Chen",
    email: "mike.chen@email.com",
    items: [{ name: "Bathroom Fittings", quantity: 1, price: "$156.75" }],
    total: "$156.75",
    status: "Abandoned",
    date: "Yesterday, 3:42 PM",
  },
  {
    id: 3,
    customer: "Emma Davis",
    email: "emma.davis@email.com",
    items: [
      { name: "Ceramic Plates", quantity: 4, price: "$67.25" },
      { name: "Terrazzo Flooring", quantity: 2, price: "$189.99" },
    ],
    total: "$647.98",
    status: "Active",
    date: "Jul 25, 2023",
  },
  {
    id: 4,
    customer: "David Wilson",
    email: "david.wilson@email.com",
    items: [{ name: "Kitchen Tiles", quantity: 3, price: "$245.50" }],
    total: "$736.50",
    status: "Converted",
    date: "Jul 23, 2023",
  },
];

const CartPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const statuses = ["All", "Active", "Abandoned", "Converted"];

  const filteredCarts = cartItems.filter((cart) => {
    const matchesSearch =
      cart.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cart.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" || cart.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800";
      case "Abandoned":
        return "bg-red-100 text-red-800";
      case "Converted":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTotalItems = (items) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <ReportDashboardLayout
      title="Shopping Carts"
      description="Monitor customer shopping carts and abandoned carts"
      showActionButtons={false}
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Carts
              </label>
              <input
                type="text"
                placeholder="Search by customer name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="md:w-48">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCarts.map((cart) => (
            <div
              key={cart.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {cart.customer}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {cart.email}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(cart.status)}`}
                >
                  {cart.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                {cart.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-background-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getTotalItems(cart.items)} items • {cart.date}
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    Total: {cart.total}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-primary-400 hover:text-primary-600 text-sm font-medium">
                    Send Reminder
                  </button>
                  <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              All Carts ({filteredCarts.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <SimpleTable
              data={filteredCarts}
              columns={[
                {
                  header: "Customer",
                  key: "customer",
                  render: (value, row) => (
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {value}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {row.email}
                      </p>
                    </div>
                  ),
                },
                {
                  header: "Items",
                  key: "items",
                  render: (value) => (
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {getTotalItems(value)} items
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {value.map((item) => item.name).join(", ")}
                      </p>
                    </div>
                  ),
                },
                {
                  header: "Total",
                  key: "total",
                  render: (value) => (
                    <span className="font-semibold text-gray-900 dark:text-white">
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
                  header: "Date",
                  key: "date",
                  render: (value) => (
                    <span className="text-gray-500 dark:text-gray-400">
                      {value}
                    </span>
                  ),
                },
                {
                  header: "Actions",
                  key: "id",
                  render: (value) => (
                    <div className="flex items-center space-x-2">
                      <button className="text-primary-400 hover:text-primary-600 text-sm font-medium">
                        Send Reminder
                      </button>
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

        {/* Cart Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Carts
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {cartItems.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <i className="ri-shopping-cart-line text-blue-600 dark:text-blue-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Carts
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {cartItems.filter((c) => c.status === "Active").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <i className="ri-shopping-bag-line text-green-600 dark:text-green-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Abandoned
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {cartItems.filter((c) => c.status === "Abandoned").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <i className="ri-close-circle-line text-red-600 dark:text-red-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Converted
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {cartItems.filter((c) => c.status === "Converted").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <i className="ri-check-double-line text-green-600 dark:text-green-400 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReportDashboardLayout>
  );
};

export default CartPage;
