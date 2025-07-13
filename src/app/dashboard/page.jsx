"use client";

import { OptionIcon } from "../../components/icons";
import SimpleTable from "../../components/ui/SimpleTable";
import ReportDashboardLayout from "../../components/ReportDashboardLayout";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  getDashboardStats,
  getRecentCartActivity,
  getAllProducts,
  getAllCategories,
  getProductAnalytics,
} from "../../services/admin.service";
import useAuthStore from "../../store/authStore";
import AddProductModal from "../../components/AddProductModal";
import AddCategoryModal from "../../components/AddCategoryModal";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: "$0",
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productAnalytics, setProductAnalytics] = useState({
    totalProducts: 0,
    featuredProducts: 0,
    categories: 0,
    productsByCategory: [],
    recentProducts: [],
  });
  const [loading, setLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(true);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const user = useAuthStore((state) => state.user);
  const token = user?.token;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch dashboard stats
        const statsResponse = await getDashboardStats(token);
        if (statsResponse.payload) {
          setStats({
            totalSales: statsResponse.payload.totalSales || "$0",
            totalOrders: statsResponse.payload.totalOrders || 0,
            totalProducts: statsResponse.payload.totalProducts || 0,
            totalCustomers: statsResponse.payload.totalCustomers || 0,
          });
        }

        // Fetch recent activity (cart items as proxy for orders)
        const activityResponse = await getRecentCartActivity(token);
        if (activityResponse.payload) {
          // Transform cart items to look like recent orders
          const transformedActivity = activityResponse.payload
            .slice(0, 4)
            .map((item, index) => ({
              id: `#CART-${String(index + 1).padStart(3, "0")}`,
              customer: item.user?.firstName
                ? `${item.user.firstName} ${item.user.lastName}`
                : "Customer",
              product: item.product?.name || "Product",
              amount: item.product?.price ? `$${item.product.price}` : "$0.00",
              status: "In Cart",
              date: new Date(item.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              quantity: item.quantity,
            }));
          setRecentActivity(transformedActivity);
        }

        // Fetch products and categories for additional stats
        const [productsResponse, categoriesResponse, analyticsResponse] =
          await Promise.all([
            getAllProducts(token),
            getAllCategories(token),
            getProductAnalytics(token),
          ]);

        if (productsResponse.payload) {
          setProducts(productsResponse.payload);
        }

        if (categoriesResponse.payload) {
          setCategories(categoriesResponse.payload);
        }

        if (analyticsResponse.payload) {
          setProductAnalytics(analyticsResponse.payload);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
        setActivityLoading(false);
      }
    };

    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const refreshDashboardData = () => {
    setLoading(true);
    setActivityLoading(true);
    fetchDashboardData();
  };

  const dashboardStats = [
    {
      title: "Total Sales",
      value: stats.totalSales,
      change: (
        <>
          <i className="ri-arrow-up-line text-green-500 dark:text-green-400 mr-1" />
          12%
        </>
      ),
      changeType: "positive",
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="8" fill="#DBEAFE" />
          <path
            d="M12 8L20 16L28 8"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 20L20 28L28 20"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Orders",
      value: stats.totalOrders.toString(),
      change: (
        <>
          <i className="ri-arrow-up-line text-green-500 dark:text-green-400 mr-1" />
          8%
        </>
      ),
      changeType: "positive",
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="8" fill="#FEE2E2" />
          <path
            d="M13 21L17 25L27 15"
            stroke="#DC2626"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Products",
      value: products.length.toString(),
      change: (
        <>
          <i className="ri-arrow-up-line text-green-500 dark:text-green-400 mr-1" />
          {products.length}
        </>
      ),
      changeType: "positive",
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="8" fill="#DCFCE7" />
          <path
            d="M17 27V21C17 20.4696 16.7893 19.9609 16.4142 19.5858C16.0391 19.2107 15.5304 19 15 19H13C12.4696 19 11.9609 19.2107 11.5858 19.5858C11.2107 19.9609 11 20.4696 11 21V27C11 27.5304 11.2107 28.0391 11.5858 28.4142C11.2107 28.7893 12.4696 29 13 29H15C15.5304 29 16.0391 28.7893 16.4142 28.4142C16.7893 28.0391 17 27.5304 17 27ZM17 27V17C17 16.4696 17.2107 15.9609 17.5858 15.5858C17.9609 15.2107 18.4696 15 19 15H21C21.5304 15 22.0391 15.2107 22.4142 15.5858C22.7893 15.9609 23 16.4696 23 17V27M17 27C17 27.5304 17.2107 28.0391 17.5858 28.4142C17.9609 28.7893 18.4696 29 19 29H21C21.5304 29 22.0391 28.7893 22.4142 28.4142C22.7893 28.0391 23 27.5304 23 27M23 27V13C23 12.4696 23.2107 11.9609 23.5858 11.5858C23.9609 11.2107 24.4696 11 25 11H27C27.5304 11 28.0391 11.2107 28.4142 11.5858C28.7893 11.9609 29 12.4696 29 13V27C29 27.5304 28.7893 28.0391 28.4142 28.4142C28.0391 28.7893 27.5304 29 27 29H25C24.4696 29 23.9609 28.7893 23.5858 28.4142C23.2107 28.0391 23 27.5304 23 27Z"
            stroke="#16A34A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Categories",
      value: categories.length.toString(),
      change: (
        <span className="text-green-500">+{categories.length} total</span>
      ),
      changeType: "positive",
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="8" fill="#F3E8FF" />
          <path
            d="M17 16H23M18 16C18.394 16 18.7841 16.0776 19.1481 16.2284C19.512 16.3791 19.8427 16.6001 20.1213 16.8787C20.3999 17.1573 20.6209 17.488 20.7716 17.8519C20.9224 18.2159 21 18.606 21 19C21 19.394 20.9224 19.7841 20.7716 20.1481C20.6209 20.512 20.3999 20.8427 20.1213 21.1213C19.8427 21.3999 19.512 21.6209 19.1481 21.7716C18.7841 21.9224 18.394 22 18 22H17L20 25M17 19H23M29 20C29 21.1819 28.7672 22.3522 28.3149 23.4442C27.8626 24.5361 27.1997 25.5282 26.364 26.364C25.5282 27.1997 24.5361 27.8626 23.4442 28.3149C22.3522 28.7672 21.1819 29 20 29C18.8181 29 17.6478 28.7672 16.5558 28.3149C15.4639 27.8626 14.4718 27.1997 13.636 26.364C12.8003 25.5282 12.1374 24.5361 11.6851 23.4442C11.2328 22.3522 11 21.1819 11 20C11 17.6131 11.9482 15.3239 13.636 13.636C15.3239 11.9482 17.6131 11 20 11C22.3869 11 24.6761 11.9482 26.364 13.636C28.0518 15.3239 29 17.6131 29 20Z"
            stroke="#9333EA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const dashboardContent = (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-2 text-gray-800 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {loading ? "..." : stat.value}
                </p>
              </div>
              <div className="rounded-lg">{stat.icon}</div>
            </div>
            <div className="mt-2">
              <span
                className={`text-sm font-medium ${
                  stat.changeType === "positive"
                    ? "text-green-500 dark:text-green-400"
                    : stat.changeType === "neutral"
                      ? ""
                      : "text-red-500 dark:text-red-400"
                }`}
              >
                {stat.change}
              </span>
              {stat.title !== "Categories" && stat.title !== "Products" && (
                <span className="text-sm text-gray-700 dark:text-gray-400 ml-1">
                  from last month
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col w-full md:flex-row items-start gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6 flex-1">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h3>
            <Link
              href="/dashboard/orders"
              className="text-primary-400 hover:text-primary-600 text-sm font-medium"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {activityLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
              </div>
            ) : recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 bg-background-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                      <i className="ri-shopping-bag-line text-primary-400"></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {activity.customer}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.product} (Qty: {activity.quantity})
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {activity.amount}
                    </p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        activity.status === "In Cart"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <i className="ri-inbox-line text-4xl mb-2"></i>
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6 w-full md:w-80">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowAddProductModal(true)}
              className="flex items-center w-full p-3 rounded-lg bg-background-50 dark:bg-gray-700 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors text-left"
            >
              <i className="ri-add-line text-primary-400 mr-3"></i>
              <span className="text-gray-900 dark:text-white">
                Add New Product
              </span>
            </button>
            <button
              onClick={() => setShowAddCategoryModal(true)}
              className="flex items-center w-full p-3 rounded-lg bg-background-50 dark:bg-gray-700 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors text-left"
            >
              <i className="ri-folder-add-line text-primary-400 mr-3"></i>
              <span className="text-gray-900 dark:text-white">
                Add New Category
              </span>
            </button>
            <Link
              href="/dashboard/orders"
              className="flex items-center p-3 rounded-lg bg-background-50 dark:bg-gray-700 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors"
            >
              <i className="ri-file-list-line text-primary-400 mr-3"></i>
              <span className="text-gray-900 dark:text-white">View Orders</span>
            </Link>
            <Link
              href="/dashboard/blogs"
              className="flex items-center p-3 rounded-lg bg-background-50 dark:bg-gray-700 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors"
            >
              <i className="ri-article-line text-primary-400 mr-3"></i>
              <span className="text-gray-900 dark:text-white">
                Manage Blogs
              </span>
            </Link>
            <Link
              href="/dashboard/categories"
              className="flex items-center p-3 rounded-lg bg-background-50 dark:bg-gray-700 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors"
            >
              <i className="ri-folder-line text-primary-400 mr-3"></i>
              <span className="text-gray-900 dark:text-white">
                Manage Categories
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Product Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Category Distribution
          </h3>
          <div className="space-y-4">
            {productAnalytics.productsByCategory &&
            productAnalytics.productsByCategory.length > 0 ? (
              productAnalytics.productsByCategory.map((category, index) => (
                <div
                  key={category.categoryId}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                      }}
                    ></div>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {category.categoryName}
                    </span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    {category.productCount} products
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <i className="ri-folder-line text-4xl mb-2"></i>
                <p>No categories found</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Recent Products
          </h3>
          <div className="space-y-4">
            {productAnalytics.recentProducts &&
            productAnalytics.recentProducts.length > 0 ? (
              productAnalytics.recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-background-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {product.category}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {product.isFeatured && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Featured
                      </span>
                    )}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(product.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <i className="ri-box-line text-4xl mb-2"></i>
                <p>No recent products</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ReportDashboardLayout
      title="High Taste Ceramics Dashboard"
      description="Manage your ceramics business efficiently"
    >
      {dashboardContent}
      <AddProductModal
        isOpen={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        onSuccess={refreshDashboardData}
      />
      <AddCategoryModal
        isOpen={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
        onSuccess={refreshDashboardData}
      />
    </ReportDashboardLayout>
  );
};

export default Dashboard;
