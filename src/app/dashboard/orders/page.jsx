"use client";

import React, { useState } from "react";
import ReportDashboardLayout from "../../../components/ReportDashboardLayout";
import SimpleTable from "../../../components/ui/SimpleTable";
import Link from "next/link";

const orders = [
  {
    id: "#ORD-001",
    customer: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    products: "Ceramic Vase Set",
    total: "$89.99",
    status: "Delivered",
    date: "Today, 10:30 AM",
    payment: "Paid",
  },
  {
    id: "#ORD-002",
    customer: "Mike Chen",
    email: "mike.chen@email.com",
    products: "Kitchen Tiles",
    total: "$245.50",
    status: "Processing",
    date: "Yesterday, 3:42 PM",
    payment: "Paid",
  },
  {
    id: "#ORD-003",
    customer: "Emma Davis",
    email: "emma.davis@email.com",
    products: "Bathroom Fittings",
    total: "$156.75",
    status: "Shipped",
    date: "Jul 25, 2023",
    payment: "Paid",
  },
  {
    id: "#ORD-004",
    customer: "David Wilson",
    email: "david.wilson@email.com",
    products: "Ceramic Plates",
    total: "$67.25",
    status: "Pending",
    date: "Jul 23, 2023",
    payment: "Pending",
  },
  {
    id: "#ORD-005",
    customer: "Lisa Brown",
    email: "lisa.brown@email.com",
    products: "Terrazzo Flooring",
    total: "$189.99",
    status: "Cancelled",
    date: "Jul 22, 2023",
    payment: "Refunded",
  },
];

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const statuses = [
    "All",
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-gray-100 text-gray-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentColor = (payment) => {
    switch (payment) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Refunded":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <ReportDashboardLayout
      title="Orders"
      description="Manage your customer orders"
      showActionButtons={false}
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Orders
              </label>
              <input
                type="text"
                placeholder="Search by customer name or order ID..."
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

        {/* Orders Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Orders ({filteredOrders.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <SimpleTable
              data={filteredOrders}
              columns={[
                {
                  header: "Order",
                  key: "id",
                  render: (value, row) => (
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {value}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {row.date}
                      </p>
                    </div>
                  ),
                },
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
                  header: "Products",
                  key: "products",
                  render: (value) => (
                    <span className="text-gray-900 dark:text-white">
                      {value}
                    </span>
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
                  header: "Payment",
                  key: "payment",
                  render: (value) => (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentColor(value)}`}
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
                        href={`/dashboard/orders/${value}`}
                        className="text-primary-400 hover:text-primary-600 text-sm font-medium"
                      >
                        View
                      </Link>
                      <button className="text-primary-400 hover:text-primary-600 text-sm font-medium">
                        Update
                      </button>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>

        {/* Order Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {orders.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <i className="ri-shopping-bag-line text-blue-600 dark:text-blue-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Pending
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {orders.filter((o) => o.status === "Pending").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-yellow-600 dark:text-yellow-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Delivered
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {orders.filter((o) => o.status === "Delivered").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <i className="ri-check-line text-green-600 dark:text-green-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  $
                  {orders
                    .reduce(
                      (sum, order) =>
                        sum + parseFloat(order.total.replace("$", "")),
                      0,
                    )
                    .toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-green-600 dark:text-green-400 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReportDashboardLayout>
  );
};

export default OrdersPage;
