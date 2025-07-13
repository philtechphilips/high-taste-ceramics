"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import useAuthStore from "../../store/authStore";
import { getAllOrders, getOrderById } from "../../services/order.service";
import MainLayout from "../../components/MainLayout";
import "remixicon/fonts/remixicon.css";

const ProfilePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("orders");
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    const fetchOrders = async () => {
      try {
        const token = user.token;
        if (!token) {
          router.push("/sign-in");
          return;
        }

        const ordersData = await getAllOrders(token);
        setOrders(ordersData.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, router]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };

  const handleOrderClick = async (orderId) => {
    try {
      const token = user.token;
      const orderDetails = await getOrderById(orderId, token);
      setSelectedOrder(orderDetails);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pt-32 pb-10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#242222] rounded-full flex items-center justify-center text-white text-xl font-semibold">
                {user.firstName?.[0] || ""}
                {user.lastName?.[0] || ""}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "orders"
                      ? "border-[#242222] text-[#242222]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  My Orders
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "profile"
                      ? "border-[#242222] text-[#242222]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Profile Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-lg shadow-sm">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#242222] mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="p-8 text-center">
                  <i className="ri-shopping-bag-line text-4xl text-gray-400 mb-4"></i>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No orders yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start shopping to see your orders here
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center px-4 py-2 bg-[#242222] text-white rounded-md hover:bg-[#3a3838] transition-colors"
                  >
                    <i className="ri-shopping-cart-line mr-2"></i>
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Order History
                  </h2>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order._id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleOrderClick(order._id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-4">
                              <div className="text-sm text-gray-500">
                                Order #
                                {order.orderNumber || order._id.slice(-8)}
                              </div>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  order.status,
                                )}`}
                              >
                                {order.status}
                              </span>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                              Placed on {formatDate(order.createdAt)}
                            </div>
                            <div className="mt-1 text-sm text-gray-600">
                              {order.items?.length || 0} items
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">
                              {formatPrice(order.totalAmount)}
                            </div>
                            <i className="ri-arrow-right-s-line text-gray-400"></i>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Profile Settings
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user.firstName}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#242222] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user.lastName}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#242222] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                  />
                </div>
                <div className="pt-4">
                  <button className="px-4 py-2 bg-[#242222] text-white rounded-md hover:bg-[#3a3838] transition-colors">
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order Details
                  </h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Order Number</p>
                    <p className="font-medium">
                      #
                      {selectedOrder.orderNumber || selectedOrder._id.slice(-8)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-medium">
                      {formatDate(selectedOrder.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        selectedOrder.status,
                      )}`}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-medium">
                      {formatPrice(selectedOrder.totalAmount)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Order Items
                  </h4>
                  <div className="space-y-4">
                    {selectedOrder.items?.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          {item.product?.images?.[0] ? (
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              width={64}
                              height={64}
                              className="rounded-lg object-cover"
                            />
                          ) : (
                            <i className="ri-image-line text-gray-400"></i>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {item.product?.name || "Product"}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedOrder.shippingAddress && (
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Shipping Address
                    </h4>
                    <div className="text-sm text-gray-600">
                      <p>{selectedOrder.shippingAddress.street}</p>
                      <p>
                        {selectedOrder.shippingAddress.city},{" "}
                        {selectedOrder.shippingAddress.state}{" "}
                        {selectedOrder.shippingAddress.zipCode}
                      </p>
                      <p>{selectedOrder.shippingAddress.country}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
