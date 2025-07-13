"use client";

import { OptionIcon } from "../../components/icons";
import SimpleTable from "../../components/ui/SimpleTable";
import ReportDashboardLayout from "../../components/ReportDashboardLayout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const recentOrders = [
  {
    id: "#ORD-001",
    customer: "Sarah Johnson",
    product: "Ceramic Vase Set",
    amount: "$89.99",
    status: "Delivered",
    date: "Today, 10:30 AM",
  },
  {
    id: "#ORD-002",
    customer: "Mike Chen",
    product: "Kitchen Tiles",
    amount: "$245.50",
    status: "Processing",
    date: "Yesterday, 3:42 PM",
  },
  {
    id: "#ORD-003",
    customer: "Emma Davis",
    product: "Bathroom Fittings",
    amount: "$156.75",
    status: "Shipped",
    date: "Jul 25, 2023",
  },
  {
    id: "#ORD-004",
    customer: "David Wilson",
    product: "Ceramic Plates",
    amount: "$67.25",
    status: "Pending",
    date: "Jul 23, 2023",
  },
];

const Dashboard = () => {
  const stats = [
    {
      title: "Total Sales",
      value: "$12,847",
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
      value: "156",
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
      value: "89",
      change: (
        <>
          <i className="ri-arrow-up-line text-green-500 dark:text-green-400 mr-1" />
          5
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
            d="M17 27V21C17 20.4696 16.7893 19.9609 16.4142 19.5858C16.0391 19.2107 15.5304 19 15 19H13C12.4696 19 11.9609 19.2107 11.5858 19.5858C11.2107 19.9609 11 20.4696 11 21V27C11 27.5304 11.2107 28.0391 11.5858 28.4142C11.9609 28.7893 12.4696 29 13 29H15C15.5304 29 16.0391 28.7893 16.4142 28.4142C16.7893 28.0391 17 27.5304 17 27ZM17 27V17C17 16.4696 17.2107 15.9609 17.5858 15.5858C17.9609 15.2107 18.4696 15 19 15H21C21.5304 15 22.0391 15.2107 22.4142 15.5858C22.7893 15.9609 23 16.4696 23 17V27M17 27C17 27.5304 17.2107 28.0391 17.5858 28.4142C17.9609 28.7893 18.4696 29 19 29H21C21.5304 29 22.0391 28.7893 22.4142 28.4142C22.7893 28.0391 23 27.5304 23 27M23 27V13C23 12.4696 23.2107 11.9609 23.5858 11.5858C23.9609 11.2107 24.4696 11 25 11H27C27.5304 11 28.0391 11.2107 28.4142 11.5858C28.7893 11.9609 29 12.4696 29 13V27C29 27.5304 28.7893 28.0391 28.4142 28.4142C28.0391 28.7893 27.5304 29 27 29H25C24.4696 29 23.9609 28.7893 23.5858 28.4142C23.2107 28.0391 23 27.5304 23 27Z"
            stroke="#16A34A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Customers",
      value: "1,247",
      change: <span className="text-green-500">+23 this month</span>,
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
        {stats.map((stat, index) => (
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
                  {stat.value}
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
              {stat.title !== "Customers" && (
                <span className="text-sm text-gray-700 dark:text-gray-400 ml-1">
                  from last month
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col w-full md:flex-row items-start gap-6">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6 flex-1">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Orders
            </h3>
            <Link
              href="/dashboard/orders"
              className="text-primary-400 hover:text-primary-600 text-sm font-medium"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-background-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <i className="ri-shopping-bag-line text-primary-400"></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {order.customer}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {order.product}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {order.amount}
                  </p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6 w-full md:w-80">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              href="/dashboard/products"
              className="flex items-center p-3 rounded-lg bg-background-50 dark:bg-gray-700 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors"
            >
              <i className="ri-add-line text-primary-400 mr-3"></i>
              <span className="text-gray-900 dark:text-white">
                Add New Product
              </span>
            </Link>
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
    </div>
  );

  return (
    <ReportDashboardLayout
      title="High Taste Ceramics Dashboard"
      description="Manage your ceramics business efficiently"
    >
      {dashboardContent}
    </ReportDashboardLayout>
  );
};

export default Dashboard;
