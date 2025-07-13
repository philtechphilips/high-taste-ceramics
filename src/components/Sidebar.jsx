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
  const [showStorageNotification, setShowStorageNotification] = useState(true);
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
    {
      name: "Cart",
      href: "/dashboard/cart",
      icon: <TasksIcon width={20} height={20} color="currentColor" />,
    },
  ];

  const isActive = (href) => {
    return pathname === href;
  };

  const handleDismiss = () => {
    setShowStorageNotification(false);
  };

  const handleLogout = () => {
    logout();
    setShowProfileDropdown(false);
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

      {/* Low Stock Alert - only when expanded */}
      {!isCollapsed && showStorageNotification && (
        <div className="bg-background-50 py-5 px-4 rounded-md my-6 space-y-2">
          <p className="font-semibold text-sm text-gray-900">Low Stock Alert</p>
          <p className="text-sm text-gray-700">
            You have 5 products with low stock. Check inventory?
          </p>

          <div className="w-full h-2 my-4 bg-primary-100 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-[#4984FF]" style={{ width: "60%" }}></div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleDismiss}
              className="text-sm text-gray-700 font-medium hover:text-gray-800 dark:hover:text-gray-200 transition-colors cursor-pointer"
            >
              Dismiss
            </button>
            <Link
              href="/dashboard/products"
              className="text-primary-400 hover:text-primary-600 font-medium text-sm transition-colors"
            >
              View Products
            </Link>
          </div>
        </div>
      )}

      <div className="w-full bg-neutral-200 h-0.25"></div>

      {/* Account Profile List */}
      {!isCollapsed ? (
        <div className="relative">
          <div className="flex items-start gap-2 mt-6">
            <Image
              src="/images/avatar.png"
              width={40}
              height={40}
              alt="avatar"
            />
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Olivia Rhye
              </p>
              <p className="text-xs text-gray-700 dark:text-gray-400">
                olivia@website.com
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
                <button
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors w-full ${
                    isActive("/profile")
                      ? "bg-background-50 dark:bg-blue-900 text-primary-400 dark:text-blue-300"
                      : "text-gray-900"
                  }`}
                >
                  <div
                    className={
                      isActive("/profile")
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
                </button>

                {/* Language (button) */}
                <button
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors w-full ${
                    isActive("/language")
                      ? "bg-background-50 dark:bg-blue-900 text-primary-400 dark:text-blue-300"
                      : "text-gray-900"
                  }`}
                >
                  <div
                    className={
                      isActive("/language")
                        ? "text-primary-400 dark:text-blue-300"
                        : "text-[#718096] dark:text-gray-300"
                    }
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.00002 10.0001C9.10459 10.0001 10 9.10465 10 8.00008C10 6.89551 9.10459 6.00008 8.00002 6.00008C6.89545 6.00008 6.00002 6.89551 6.00002 8.00008C6.00002 9.10465 6.89545 10.0001 8.00002 10.0001Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.9334 10.0001C12.8446 10.2012 12.8181 10.4242 12.8573 10.6405C12.8966 10.8567 12.9997 11.0563 13.1534 11.2134L13.1934 11.2534C13.3173 11.3772 13.4157 11.5243 13.4828 11.6862C13.5499 11.848 13.5844 12.0215 13.5844 12.1967C13.5844 12.372 13.5499 12.5455 13.4828 12.7073C13.4157 12.8692 13.3173 13.0162 13.1934 13.1401C13.0695 13.264 12.9225 13.3624 12.7606 13.4295C12.5987 13.4966 12.4252 13.5311 12.25 13.5311C12.0748 13.5311 11.9013 13.4966 11.7394 13.4295C11.5776 13.3624 11.4305 13.264 11.3067 13.1401L11.2667 13.1001C11.1096 12.9464 10.91 12.8433 10.6937 12.8041C10.4775 12.7649 10.2544 12.7913 10.0534 12.8801C9.85617 12.9646 9.68801 13.1049 9.56956 13.2838C9.45111 13.4626 9.38754 13.6722 9.38669 13.8867V14.0001C9.38669 14.3537 9.24621 14.6928 8.99616 14.9429C8.74611 15.1929 8.40698 15.3334 8.05335 15.3334C7.69973 15.3334 7.36059 15.1929 7.11054 14.9429C6.8605 14.6928 6.72002 14.3537 6.72002 14.0001V13.9401C6.71486 13.7194 6.64343 13.5054 6.51503 13.3259C6.38662 13.1464 6.20718 13.0096 6.00002 12.9334C5.79894 12.8447 5.57589 12.8182 5.35963 12.8574C5.14336 12.8966 4.94381 12.9997 4.78669 13.1534L4.74669 13.1934C4.62286 13.3174 4.4758 13.4157 4.31394 13.4828C4.15208 13.5499 3.97857 13.5845 3.80335 13.5845C3.62813 13.5845 3.45463 13.5499 3.29277 13.4828C3.1309 13.4157 2.98385 13.3174 2.86002 13.1934C2.73605 13.0696 2.63771 12.9225 2.57061 12.7607C2.50351 12.5988 2.46897 12.4253 2.46897 12.2501C2.46897 12.0749 2.50351 11.9014 2.57061 11.7395C2.63771 11.5776 2.73605 11.4306 2.86002 11.3067L2.90002 11.2667C3.05371 11.1096 3.15681 10.9101 3.19602 10.6938C3.23524 10.4775 3.20876 10.2545 3.12002 10.0534C3.03551 9.85623 2.89519 9.68807 2.71633 9.56962C2.53747 9.45117 2.32788 9.3876 2.11335 9.38675H2.00002C1.6464 9.38675 1.30726 9.24627 1.05721 8.99622C0.807163 8.74617 0.666687 8.40704 0.666687 8.05341C0.666687 7.69979 0.807163 7.36065 1.05721 7.11061C1.30726 6.86056 1.6464 6.72008 2.00002 6.72008H2.06002C2.28068 6.71492 2.49469 6.64349 2.67422 6.51509C2.85375 6.38668 2.9905 6.20724 3.06669 6.00008C3.15543 5.799 3.1819 5.57595 3.14269 5.35969C3.10348 5.14343 3.00038 4.94387 2.84669 4.78675L2.80669 4.74675C2.68272 4.62292 2.58437 4.47587 2.51727 4.314C2.45017 4.15214 2.41564 3.97864 2.41564 3.80341C2.41564 3.62819 2.45017 3.45469 2.51727 3.29283C2.58437 3.13096 2.68272 2.98391 2.80669 2.86008C2.93052 2.73611 3.07757 2.63777 3.23943 2.57067C3.4013 2.50357 3.5748 2.46903 3.75002 2.46903C3.92524 2.46903 4.09874 2.50357 4.26061 2.57067C4.42247 2.63777 4.56952 2.73611 4.69335 2.86008L4.73335 2.90008C4.89047 3.05377 5.09003 3.15687 5.30629 3.19608C5.52256 3.2353 5.74561 3.20882 5.94669 3.12008H6.00002C6.1972 3.03557 6.36536 2.89525 6.48382 2.71639C6.60227 2.53753 6.66583 2.32794 6.66669 2.11341V2.00008C6.66669 1.64646 6.80716 1.30732 7.05721 1.05727C7.30726 0.807224 7.6464 0.666748 8.00002 0.666748C8.35364 0.666748 8.69278 0.807224 8.94283 1.05727C9.19288 1.30732 9.33335 1.64646 9.33335 2.00008V2.06008C9.33421 2.27461 9.39777 2.4842 9.51622 2.66306C9.63468 2.84192 9.80284 2.98224 10 3.06675C10.2011 3.15549 10.4241 3.18196 10.6404 3.14275C10.8567 3.10354 11.0562 3.00044 11.2134 2.84675L11.2534 2.80675C11.3772 2.68278 11.5242 2.58443 11.6861 2.51733C11.848 2.45024 12.0215 2.4157 12.1967 2.4157C12.3719 2.4157 12.5454 2.45024 12.7073 2.51733C12.8691 2.58443 13.0162 2.68278 13.14 2.80675C13.264 2.93058 13.3623 3.07763 13.4294 3.23949C13.4965 3.40136 13.5311 3.57486 13.5311 3.75008C13.5311 3.9253 13.4965 4.0988 13.4294 4.26067C13.3623 4.42253 13.264 4.56958 13.14 4.69341L13.1 4.73341C12.9463 4.89053 12.8432 5.09009 12.804 5.30636C12.7648 5.52262 12.7913 5.74567 12.88 5.94675V6.00008C12.9645 6.19726 13.1048 6.36543 13.2837 6.48388C13.4626 6.60233 13.6722 6.66589 13.8867 6.66675H14C14.3536 6.66675 14.6928 6.80722 14.9428 7.05727C15.1929 7.30732 15.3334 7.64646 15.3334 8.00008C15.3334 8.3537 15.1929 8.69284 14.9428 8.94289C14.6928 9.19294 14.3536 9.33341 14 9.33341H13.94C13.7255 9.33427 13.5159 9.39784 13.337 9.51629C13.1582 9.63474 13.0179 9.8029 12.9334 10.0001Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="ml-3 font-medium text-sm">Language</span>
                </button>

                {/* Theme (button) */}
                <button
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors w-full ${
                    isActive("/theme")
                      ? "bg-background-50 dark:bg-blue-900 text-primary-400 dark:text-blue-300"
                      : "text-gray-900"
                  }`}
                >
                  <div
                    className={
                      isActive("/theme")
                        ? "text-primary-400 dark:text-blue-300"
                        : "text-[#718096] dark:text-gray-300"
                    }
                  >
                    <svg
                      width="14"
                      height="16"
                      viewBox="0 0 14 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.66667 1.33325L1 9.33325H7L6.33333 14.6666L13 6.66659H7L7.66667 1.33325Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="ml-3 font-medium text-sm">Theme</span>
                </button>

                <div className="w-full bg-background-50 h-0.25 my-2"></div>

                {/* Privacy Policy (button) */}
                <button
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors w-full ${
                    isActive("/privacy-policy")
                      ? "bg-background-50 dark:bg-blue-900 text-primary-400 dark:text-blue-300"
                      : "text-gray-900"
                  }`}
                >
                  <div
                    className={
                      isActive("/privacy-policy")
                        ? "text-primary-400 dark:text-blue-300"
                        : "text-[#718096] dark:text-gray-300"
                    }
                  >
                    <svg
                      width="16"
                      height="14"
                      viewBox="0 0 16 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.3334 13V11.6667C11.3334 10.9594 11.0524 10.2811 10.5523 9.78105C10.0522 9.28095 9.37393 9 8.66669 9H3.33335C2.62611 9 1.94783 9.28095 1.44774 9.78105C0.947639 10.2811 0.666687 10.9594 0.666687 11.6667V13M15.3334 13V11.6667C15.3329 11.0758 15.1363 10.5018 14.7743 10.0349C14.4123 9.56791 13.9054 9.23438 13.3334 9.08667M10.6667 1.08667C11.2403 1.23353 11.7487 1.56713 12.1118 2.03487C12.4748 2.50261 12.6719 3.07789 12.6719 3.67C12.6719 4.26211 12.4748 4.83739 12.1118 5.30513C11.7487 5.77287 11.2403 6.10647 10.6667 6.25333M8.66669 3.66667C8.66669 5.13943 7.47278 6.33333 6.00002 6.33333C4.52726 6.33333 3.33335 5.13943 3.33335 3.66667C3.33335 2.19391 4.52726 1 6.00002 1C7.47278 1 8.66669 2.19391 8.66669 3.66667Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="ml-3 font-medium text-sm">
                    Privacy Policy
                  </span>
                </button>

                {/* Invite Colleagues (button) */}
                <button
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors w-full ${
                    isActive("/invite")
                      ? "bg-background-50 dark:bg-blue-900 text-primary-400 dark:text-blue-300"
                      : "text-gray-900"
                  }`}
                >
                  <div
                    className={
                      isActive("/invite")
                        ? "text-primary-400 dark:text-blue-300"
                        : "text-[#718096] dark:text-gray-300"
                    }
                  >
                    <svg
                      width="16"
                      height="14"
                      viewBox="0 0 16 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.6667 13V11.6667C10.6667 10.9594 10.3857 10.2811 9.88564 9.78105C9.38554 9.28095 8.70726 9 8.00002 9H3.33335C2.62611 9 1.94783 9.28095 1.44774 9.78105C0.947639 10.2811 0.666687 10.9594 0.666687 11.6667V13M13.3334 4.33333V8.33333M15.3334 6.33333H11.3334M8.33335 3.66667C8.33335 5.13943 7.13945 6.33333 5.66669 6.33333C4.19393 6.33333 3.00002 5.13943 3.00002 3.66667C3.00002 2.19391 4.19393 1 5.66669 1C7.13945 1 8.33335 2.19391 8.33335 3.66667Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="ml-3 font-medium text-sm">
                    Invite Colleagues
                  </span>
                </button>

                <div className="w-full bg-background-50 h-0.25 my-2"></div>

                {/* Share Feedback (button) */}
                <button
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors w-full ${
                    isActive("/feedback")
                      ? "bg-background-50 dark:bg-blue-900 text-primary-400 dark:text-blue-300"
                      : "text-gray-900"
                  }`}
                >
                  <div
                    className={
                      isActive("/feedback")
                        ? "text-primary-400 dark:text-blue-300"
                        : "text-[#718096] dark:text-gray-300"
                    }
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_373_2266)">
                        <path
                          d="M6.05998 5.99992C6.21672 5.55436 6.52608 5.17866 6.93328 4.93934C7.34048 4.70002 7.81924 4.61254 8.28476 4.69239C8.75028 4.77224 9.17252 5.01427 9.4767 5.3756C9.78087 5.73694 9.94735 6.19427 9.94665 6.66659C9.94665 7.99992 7.94665 8.66659 7.94665 8.66659M7.99998 11.3333H8.00665M14.6666 7.99992C14.6666 11.6818 11.6819 14.6666 7.99998 14.6666C4.31808 14.6666 1.33331 11.6818 1.33331 7.99992C1.33331 4.31802 4.31808 1.33325 7.99998 1.33325C11.6819 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_373_2266">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <span className="ml-3 font-medium text-sm">
                    Share Feedback
                  </span>
                </button>

                <div className="w-full bg-background-50 h-0.25 my-2"></div>

                {/* Log out (button) */}
                <button
                  onClick={handleLogout}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors w-full ${
                    isActive("/feedback")
                      ? "bg-background-50 dark:bg-blue-900 text-primary-400 dark:text-blue-300"
                      : "text-gray-900"
                  }`}
                >
                  <div
                    className={
                      isActive("/feedback")
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
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
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
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.00002 10.0001C9.10459 10.0001 10 9.10465 10 8.00008C10 6.89551 9.10459 6.00008 8.00002 6.00008C6.89545 6.00008 6.00002 6.89551 6.00002 8.00008C6.00002 9.10465 6.89545 10.0001 8.00002 10.0001Z"
                stroke="#718096"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.9334 10.0001C12.8446 10.2012 12.8181 10.4242 12.8573 10.6405C12.8966 10.8567 12.9997 11.0563 13.1534 11.2134L13.1934 11.2534C13.3173 11.3772 13.4157 11.5243 13.4828 11.6862C13.5499 11.848 13.5844 12.0215 13.5844 12.1967C13.5844 12.372 13.5499 12.5455 13.4828 12.7073C13.4157 12.8692 13.3173 13.0162 13.1934 13.1401C13.0695 13.264 12.9225 13.3624 12.7606 13.4295C12.5987 13.4966 12.4252 13.5311 12.25 13.5311C12.0748 13.5311 11.9013 13.4966 11.7394 13.4295C11.5776 13.3624 11.4305 13.264 11.3067 13.1401L11.2667 13.1001C11.1096 12.9464 10.91 12.8433 10.6937 12.8041C10.4775 12.7649 10.2544 12.7913 10.0534 12.8801C9.85617 12.9646 9.68801 13.1049 9.56956 13.2838C9.45111 13.4626 9.38754 13.6722 9.38669 13.8867V14.0001C9.38669 14.3537 9.24621 14.6928 8.99616 14.9429C8.74611 15.1929 8.40698 15.3334 8.05335 15.3334C7.69973 15.3334 7.36059 15.1929 7.11054 14.9429C6.8605 14.6928 6.72002 14.3537 6.72002 14.0001V13.9401C6.71486 13.7194 6.64343 13.5054 6.51503 13.3259C6.38662 13.1464 6.20718 13.0096 6.00002 12.9334C5.79894 12.8447 5.57589 12.8182 5.35963 12.8574C5.14336 12.8966 4.94381 12.9997 4.78669 13.1534L4.74669 13.1934C4.62286 13.3174 4.4758 13.4157 4.31394 13.4828C4.15208 13.5499 3.97857 13.5845 3.80335 13.5845C3.62813 13.5845 3.45463 13.5499 3.29277 13.4828C3.1309 13.4157 2.98385 13.3174 2.86002 13.1934C2.73605 13.0696 2.63771 12.9225 2.57061 12.7607C2.50351 12.5988 2.46897 12.4253 2.46897 12.2501C2.46897 12.0749 2.50351 11.9014 2.57061 11.7395C2.63771 11.5776 2.73605 11.4306 2.86002 11.3067L2.90002 11.2667C3.05371 11.1096 3.15681 10.9101 3.19602 10.6938C3.23524 10.4775 3.20876 10.2545 3.12002 10.0534C3.03551 9.85623 2.89519 9.68807 2.71633 9.56962C2.53747 9.45117 2.32788 9.3876 2.11335 9.38675H2.00002C1.6464 9.38675 1.30726 9.24627 1.05721 8.99622C0.807163 8.74617 0.666687 8.40704 0.666687 8.05341C0.666687 7.69979 0.807163 7.36065 1.05721 7.11061C1.30726 6.86056 1.6464 6.72008 2.00002 6.72008H2.06002C2.28068 6.71492 2.49469 6.64349 2.67422 6.51509C2.85375 6.38668 2.9905 6.20724 3.06669 6.00008C3.15543 5.799 3.1819 5.57595 3.14269 5.35969C3.10348 5.14343 3.00038 4.94387 2.84669 4.78675L2.80669 4.74675C2.68272 4.62292 2.58437 4.47587 2.51727 4.314C2.45017 4.15214 2.41564 3.97864 2.41564 3.80341C2.41564 3.62819 2.45017 3.45469 2.51727 3.29283C2.58437 3.13096 2.68272 2.98391 2.80669 2.86008C2.93052 2.73611 3.07757 2.63777 3.23943 2.57067C3.4013 2.50357 3.5748 2.46903 3.75002 2.46903C3.92524 2.46903 4.09874 2.50357 4.26061 2.57067C4.42247 2.63777 4.56952 2.73611 4.69335 2.86008L4.73335 2.90008C4.89047 3.05377 5.09003 3.15687 5.30629 3.19608C5.52256 3.2353 5.74561 3.20882 5.94669 3.12008H6.00002C6.1972 3.03557 6.36536 2.89525 6.48382 2.71639C6.60227 2.53753 6.66583 2.32794 6.66669 2.11341V2.00008C6.66669 1.64646 6.80716 1.30732 7.05721 1.05727C7.30726 0.807224 7.6464 0.666748 8.00002 0.666748C8.35364 0.666748 8.69278 0.807224 8.94283 1.05727C9.19288 1.30732 9.33335 1.64646 9.33335 2.00008V2.06008C9.33421 2.27461 9.39777 2.4842 9.51622 2.66306C9.63468 2.84192 9.80284 2.98224 10 3.06675C10.2011 3.15549 10.4241 3.18196 10.6404 3.14275C10.8567 3.10354 11.0562 3.00044 11.2134 2.84675L11.2534 2.80675C11.3772 2.68278 11.5242 2.58443 11.6861 2.51733C11.848 2.45024 12.0215 2.4157 12.1967 2.4157C12.3719 2.4157 12.5454 2.45024 12.7073 2.51733C12.8691 2.58443 13.0162 2.68278 13.14 2.80675C13.264 2.93058 13.3623 3.07763 13.4294 3.23949C13.4965 3.40136 13.5311 3.57486 13.5311 3.75008C13.5311 3.9253 13.4965 4.0988 13.4294 4.26067C13.3623 4.42253 13.264 4.56958 13.14 4.69341L13.1 4.73341C12.9463 4.89053 12.8432 5.09009 12.804 5.30636C12.7648 5.52262 12.7913 5.74567 12.88 5.94675V6.00008C12.9645 6.19726 13.1048 6.36543 13.2837 6.48388C13.4626 6.60233 13.6722 6.66589 13.8867 6.66675H14C14.3536 6.66675 14.6928 6.80722 14.9428 7.05727C15.1929 7.30732 15.3334 7.64646 15.3334 8.00008C15.3334 8.3537 15.1929 8.69284 14.9428 8.94289C14.6928 9.19294 14.3536 9.33341 14 9.33341H13.94C13.7255 9.33427 13.5159 9.39784 13.337 9.51629C13.1582 9.63474 13.0179 9.8029 12.9334 10.0001Z"
                stroke="#718096"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {/* Add more icons as needed for other profile actions */}
        </div>
      )}

      {/* Collapsed: Profile image at the bottom */}
      {isCollapsed && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <Image src="/images/Avatar.svg" alt="avatar" width={40} height={40} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
