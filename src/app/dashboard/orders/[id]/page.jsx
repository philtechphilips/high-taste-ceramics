"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ReportDashboardLayout from "../../../../components/ReportDashboardLayout";
import {
  getOrderById,
  updateOrderStatus,
} from "../../../../services/order.service";
import useAuthStore from "../../../../store/authStore";
import Link from "next/link";

const ViewOrderPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const token = user?.token;

  const orderId = params.id;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await getOrderById(orderId, token);
        if (response.payload) {
          setOrder(response.payload);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    if (token && orderId) {
      fetchOrder();
    }
  }, [orderId, token]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdating(true);
      await updateOrderStatus(orderId, { status: newStatus }, token);
      // Refresh order data
      const response = await getOrderById(orderId, token);
      if (response.payload) {
        setOrder(response.payload);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      setError("Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

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

  const statusOptions = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  if (loading) {
    return (
      <ReportDashboardLayout
        title="Order Details"
        description="View order information"
        showActionButtons={false}
      >
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
        </div>
      </ReportDashboardLayout>
    );
  }

  if (error || !order) {
    return (
      <ReportDashboardLayout
        title="Order Details"
        description="View order information"
        showActionButtons={false}
      >
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">
            {error || "Order not found"}
          </p>
          <Link
            href="/dashboard/orders"
            className="text-primary-400 hover:text-primary-600 text-sm font-medium mt-2 inline-block"
          >
            ← Back to Orders
          </Link>
        </div>
      </ReportDashboardLayout>
    );
  }

  return (
    <ReportDashboardLayout
      title="Order Details"
      description="View order information"
      showActionButtons={false}
    >
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard/orders"
            className="text-primary-400 hover:text-primary-600 text-sm font-medium"
          >
            ← Back to Orders
          </Link>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Order ID:
            </span>
            <span className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {order.id}
            </span>
          </div>
        </div>

        {/* Order Status Update */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Order Status
            </h3>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
            >
              {order.status}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={order.status}
              onChange={(e) => handleStatusUpdate(e.target.value)}
              disabled={updating}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {updating && (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-400"></div>
            )}
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Customer Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Customer Name
              </label>
              <p className="text-gray-900 dark:text-white font-medium">
                {order.customer_name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <p className="text-gray-900 dark:text-white">
                {order.customer_email}
              </p>
            </div>
            {order.customer_phone && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </label>
                <p className="text-gray-900 dark:text-white">
                  {order.customer_phone}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Shipping Address
          </h3>
          <div className="space-y-2">
            {order.street && (
              <p className="text-gray-900 dark:text-white">{order.street}</p>
            )}
            {order.apartment && (
              <p className="text-gray-900 dark:text-white">{order.apartment}</p>
            )}
            <p className="text-gray-900 dark:text-white">
              {order.city && `${order.city}, `}
              {order.state && `${order.state}`}
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Order Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Order Date
              </label>
              <p className="text-gray-900 dark:text-white">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Order Number
              </label>
              <p className="text-gray-900 dark:text-white font-mono">
                {order.order_number}
              </p>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Order Items
          </h3>
          <div className="space-y-4">
            {order.order_items && Array.isArray(order.order_items) ? (
              order.order_items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  {/* Product Image */}
                  {item.productImage && (
                    <div className="flex-shrink-0">
                      <img
                        src={item.productImage}
                        alt={item.productName || "Product"}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white text-lg">
                          {item.productName || `Product ${index + 1}`}
                        </h4>
                        {item.productDetails && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {item.productDetails}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          Product ID: {item.productId}
                        </p>
                      </div>

                      {/* Price and Quantity */}
                      <div className="text-right ml-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Price: ${item.price}
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white text-lg">
                          Total: ${item.total}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No order items available
              </p>
            )}
          </div>
        </div>

        {/* Additional Notes */}
        {order.notes && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Additional Notes
            </h3>
            <p className="text-gray-900 dark:text-white">{order.notes}</p>
          </div>
        )}
      </div>
    </ReportDashboardLayout>
  );
};

export default ViewOrderPage;
