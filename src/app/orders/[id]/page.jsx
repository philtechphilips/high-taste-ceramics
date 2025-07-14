"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MainLayout from "../../../components/MainLayout";
import withAuth from "../../../components/withAuth";
import { getUserOrderById } from "../../../services/order.service";
import useAuthStore from "../../../store/authStore";
import { useParams } from "next/navigation";

const OrderDetailsPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const token = user?.token;
  const params = useParams();
  const orderId = params.id;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getUserOrderById(orderId, token);
        if (response.payload) {
          setOrder(response.payload);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token && orderId) {
      fetchOrder();
    }
  }, [token, orderId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <section className="w-full md:px-10 px-5 bg-white pt-60 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#242222]"></div>
            </div>
          </div>
        </section>
      </MainLayout>
    );
  }

  if (!order) {
    return (
      <MainLayout>
        <section className="w-full md:px-10 px-5 bg-white pt-60 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <p className="text-xl text-[#5a5a5a] mb-4">Order not found</p>
              <Link
                href="/orders"
                className="inline-block bg-[#242222] text-white px-6 py-2 rounded-full hover:bg-[#3a3a3a] transition-colors"
              >
                Back to Orders
              </Link>
            </div>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="w-full md:px-10 px-5 bg-white pt-60 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/orders"
              className="text-[#242222] hover:text-[#5a5a5a] transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </Link>
            <h1
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="true"
              data-aos-anchor-placement="top-center"
              className="md:text-5xl text-3xl !font-[300] text-[#242222] font-[Publicko] leading-18"
            >
              Order Details
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Information */}
            <div className="bg-white border border-[#242222]/10 rounded-lg p-6">
              <h2 className="text-2xl font-medium text-[#242222] mb-6">
                Order Information
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#5a5a5a]">Order Number</p>
                  <p className="text-lg font-medium text-[#242222]">
                    {order.order_number}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#5a5a5a]">Order Date</p>
                  <p className="text-lg font-medium text-[#242222]">
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#5a5a5a]">Status</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-[#5a5a5a]">Payment Status</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.payment_status === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.payment_status.charAt(0).toUpperCase() +
                      order.payment_status.slice(1)}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-[#5a5a5a]">Total Amount</p>
                  <p className="text-2xl font-bold text-[#242222]">
                    ${parseFloat(order.total_amount).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white border border-[#242222]/10 rounded-lg p-6">
              <h2 className="text-2xl font-medium text-[#242222] mb-6">
                Shipping Information
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#5a5a5a]">Customer</p>
                  <p className="text-lg font-medium text-[#242222]">
                    {order.customer_name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#5a5a5a]">Email</p>
                  <p className="text-lg font-medium text-[#242222]">
                    {order.customer_email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#5a5a5a]">Phone</p>
                  <p className="text-lg font-medium text-[#242222]">
                    {order.customer_phone}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#5a5a5a]">Address</p>
                  <p className="text-lg font-medium text-[#242222]">
                    {order.shipping_address}
                    {order.apartment && `, Apt ${order.apartment}`}
                    {order.street && `, ${order.street}`}
                    {order.city && `, ${order.city}`}
                    {order.state && `, ${order.state}`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mt-8 bg-white border border-[#242222]/10 rounded-lg p-6">
            <h2 className="text-2xl font-medium text-[#242222] mb-6">
              Order Items
            </h2>

            <div className="space-y-4">
              {Array.isArray(order.order_items) &&
                order.order_items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 border border-[#242222]/10 rounded-lg"
                  >
                    <div className="relative w-16 h-16 overflow-hidden rounded-md bg-white border border-[#eee]">
                      {item.productImage && (
                        <Image
                          src={item.productImage}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-[#242222]">
                        {item.productName}
                      </h3>
                      <p className="text-sm text-[#5a5a5a]">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-[#5a5a5a]">
                        Price: ${parseFloat(item.price).toFixed(2)} each
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-medium text-[#242222]">
                        ${parseFloat(item.total).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Back to Orders Button */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/orders"
              className="bg-[#242222] text-white px-8 py-3 text-lg hover:bg-[#3a3a3a] transition-colors duration-200 rounded-full"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default withAuth(OrderDetailsPage, { requireAuth: true });
