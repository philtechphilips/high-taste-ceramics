"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import MainLayout from "../../components/MainLayout";
import withAuth from "../../components/withAuth";
import { getUserOrders } from "../../services/order.service";
import useAuthStore from "../../store/authStore";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const token = user?.token;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getUserOrders(token);
        if (response.payload) {
          setOrders(response.payload);
        } else if (Array.isArray(response)) {
          setOrders(response);
        } else {
          setOrders([]);
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

  return (
    <MainLayout>
      <section className="w-full md:px-10 px-5 bg-white pt-60 pb-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="md:text-5xl text-3xl !font-[300] text-[#242222] font-[Publicko] leading-18">
            My Orders
          </h1>

          <p className="text-lg mt-5 text-[#242222]">
            Track your order history and current status
          </p>

          <div className="border-b border-[#242222]/20 my-8"></div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#242222]"></div>
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-[#242222]/10 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-lg font-medium text-[#242222]">
                          Order #{order.id}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            order.status,
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-[#5a5a5a] mb-2">
                        {order.date}
                      </p>
                      <p className="text-sm text-[#5a5a5a] mb-2">
                        {order.products}
                      </p>
                      <p className="text-lg font-medium text-[#242222]">
                        Total: {order.total}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/orders/${order.id}`}
                        className="bg-[#242222] text-white px-4 py-2 rounded-full hover:bg-[#3a3a3a] transition-colors duration-200 text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-[#5a5a5a] mb-4">
                You haven't placed any orders yet
              </p>
              <Link
                href="/products"
                className="inline-block bg-[#242222] text-white px-6 py-2 rounded-full hover:bg-[#3a3a3a] transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default withAuth(OrdersPage, { requireAuth: true });
