"use client";

import React, { useState, useEffect } from "react";
import ReportDashboardLayout from "../../../components/ReportDashboardLayout";
import SimpleTable from "../../../components/ui/SimpleTable";
import Link from "next/link";
import { getAllOrders } from "../../../services/order.service";
import useAuthStore from "../../../store/authStore";

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const token = user?.token;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders(token);
        if (response.payload) {
          setOrders(response.payload);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

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
        {/* Info Banner */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center">
            <i className="ri-check-line text-green-500 mr-2"></i>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Orders are now stored in the database and can be managed directly
              from this dashboard. When customers checkout, orders are
              automatically created and email notifications are sent to the
              admin.
            </p>
          </div>
        </div>

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
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </ReportDashboardLayout>
  );
};

export default OrdersPage;
