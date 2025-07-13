"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import useAuthStore from "../store/authStore";
import {
  DashboardIcon,
  AuditsIcon,
  ReportsIcon,
  TasksIcon,
  TeamsIcon,
  SettingsIcon,
  SupportIcon,
  SidebarActionIcon,
} from "./icons";

const Sidebar = ({ isCollapsed, onToggle }) => {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon width={18} height={20} color="currentColor" />,
    },
    {
      name: "Products",
      href: "/dashboard/products",
      icon: <AuditsIcon width={20} height={20} color="currentColor" />,
    },
    {
      name: "Categories",
      href: "/dashboard/categories",
      icon: <ReportsIcon width={20} height={20} color="currentColor" />,
    },
    {
      name: "Orders",
      href: "/dashboard/orders",
      icon: <TasksIcon width={20} height={20} color="currentColor" />,
    },
    {
      name: "Blogs",
      href: "/dashboard/blogs",
      icon: <TasksIcon width={20} height={20} color="currentColor" />,
    },
  ];

  const isActive = (href) => {
    return pathname === href;
  };

  const handleLogout = () => {
    logout();
    setShowProfileDropdown(false);
  };

  // Generate initials from first and last name
  const getInitials = (firstName, lastName) => {
    const first = firstName ? firstName.charAt(0).toUpperCase() : "";
    const last = lastName ? lastName.charAt(0).toUpperCase() : "";
    return first + last;
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 transition-all duration-300 px-4 py-8 h-screen overflow-y-auto scrollbar-hide ${
        isCollapsed ? "w-16" : "w-64"
      } relative`}
    >
      {/* Sidebar Toggle Button - always visible */}
      {isCollapsed && (
        <button onClick={onToggle} className="absolute top-10 right-5 z-10">
          <SidebarActionIcon />
        </button>
      )}

      {/* Header */}
      {!isCollapsed && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/Logomark.png"
              width={30}
              height={30}
              alt="logo"
            ></Image>
            <h2 className="text-gray-900 font-bold text-xl">HTC</h2>
          </div>

          <button onClick={onToggle} className="absolute top-10 right-4 z-10">
            <SidebarActionIcon />
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="space-y-5 mt-10">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
              isActive(item.href)
                ? "bg-background-50 text-primary-400"
                : "text-gray-900  hover:bg-background-50"
            } ${isCollapsed ? "justify-center" : ""}`}
          >
            <div
              className={
                isActive(item.href)
                  ? "text-primary-400 dark:text-blue-300"
                  : "text-[#718096] dark:text-gray-300"
              }
            >
              {item.icon}
            </div>
            {!isCollapsed && (
              <span className="ml-3 font-medium text-sm mb-0 pb-0">
                {item.name}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="w-full bg-neutral-200 h-0.25"></div>

      {/* Account Profile List */}
      {!isCollapsed ? (
        <div className="relative">
          <div className="flex items-start gap-2 mt-6">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                {getInitials(user?.firstName, user?.lastName)}
              </span>
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-700 dark:text-gray-400">
                {user?.email}
              </p>
            </div>

            <button
              type="button"
              className="mt-2"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-200 ${
                  showProfileDropdown ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  stroke="#718096"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Profile Dropdown */}
          {showProfileDropdown && (
            <div className="w-60 fixed top-68 left-34 -translate-x-1/2 z-[2000] bg-white rounded-lg shadow-lg border border-background-50">
              <h6 className="text-sm text-gray-700 font-medium p-4">
                Account Menu
              </h6>
              <div className="w-full bg-background-50 h-0.25 mb-2"></div>
              <nav className="space-y-2.5 mt-2">
                {/* View Profile (button) */}
                <Link
                  href="/dashboard/profile"
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors w-full ${
                    isActive("/dashboard/profile")
                      ? "bg-background-50 dark:bg-blue-900 text-primary-400 dark:text-blue-300"
                      : "text-gray-900"
                  }`}
                  onClick={() => setShowProfileDropdown(false)}
                >
                  <div
                    className={
                      isActive("/dashboard/profile")
                        ? "text-primary-400 dark:text-blue-300"
                        : "text-[#718096] dark:text-gray-300"
                    }
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.3334 13V11.6667C12.3334 10.9594 12.0524 10.2811 11.5523 9.78105C11.0522 9.28095 10.3739 9 9.66669 9H4.33335C3.62611 9 2.94783 9.28095 2.44774 9.78105C1.94764 10.2811 1.66669 10.9594 1.66669 11.6667V13M9.66669 3.66667C9.66669 5.13943 8.47278 6.33333 7.00002 6.33333C5.52726 6.33333 4.33335 5.13943 4.33335 3.66667C4.33335 2.19391 5.52726 1 7.00002 1C8.47278 1 9.66669 2.19391 9.66669 3.66667Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="ml-3 font-medium text-sm">View Profile</span>
                </Link>

                <div className="w-full bg-background-50 h-0.25 my-2"></div>

                {/* Log out (button) */}
                <button
                  onClick={handleLogout}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors w-full text-gray-900 hover:bg-background-50`}
                >
                  <div className="text-[#718096] dark:text-gray-300">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 13H2.33333C1.97971 13 1.64057 12.8595 1.39052 12.6095C1.14048 12.3594 1 12.0203 1 11.6667V2.33333C1 1.97971 1.14048 1.64057 1.39052 1.39052C1.64057 1.14048 1.97971 1 2.33333 1H5M9.66667 10.3333L13 7M13 7L9.66667 3.66667M13 7H5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="ml-3 font-medium text-sm">Log out</span>
                </button>
              </nav>
            </div>
          )}
        </div>
      ) : (
        // Collapsed: Only show icons for profile actions
        <div className="flex flex-col items-center gap-4 mt-6">
          {/* Profile action icons only */}
          <Link
            href="/dashboard/profile"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.3334 13V11.6667C12.3334 10.9594 12.0524 10.2811 11.5523 9.78105C11.0522 9.28095 10.3739 9 9.66669 9H4.33335C3.62611 9 2.94783 9.28095 2.44774 9.78105C1.94764 10.2811 1.66669 10.9594 1.66669 11.6667V13M9.66669 3.66667C9.66669 5.13943 8.47278 6.33333 7.00002 6.33333C5.52726 6.33333 4.33335 5.13943 4.33335 3.66667C4.33335 2.19391 5.52726 1 7.00002 1C8.47278 1 9.66669 2.19391 9.66669 3.66667Z"
                stroke="#718096"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 13H2.33333C1.97971 13 1.64057 12.8595 1.39052 12.6095C1.14048 12.3594 1 12.0203 1 11.6667V2.33333C1 1.97971 1.14048 1.64057 1.39052 1.39052C1.64057 1.14048 1.97971 1 2.33333 1H5M9.66667 10.3333L13 7M13 7L9.66667 3.66667M13 7H5"
                stroke="#718096"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Collapsed: Profile image at the bottom */}
      {isCollapsed && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
              {getInitials(user?.firstName, user?.lastName)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
