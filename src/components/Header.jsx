"use client";

import React from "react";
import { Button } from "./ui/Button";
import { SidebarActionIcon } from "./icons";

const Header = ({
  showActionButtons = false,
  onExport,
  onCreateNew,
  createButtonText = "Create New",
  onToggleSidebar,
  title = "Dashboard",
  description = "Welcome to your dashboard",
}) => {
  return (
    <header className="py-8 md:px-12 px-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle - only visible on mobile */}
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <SidebarActionIcon />
          </button>

          <div className="flex flex-col gap-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-[30px] text-gray-900 font-semibold dark:text-white">
              {title}
            </h1>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {description}
            </p>
          </div>
        </div>

        {showActionButtons && (
          <div className="flex items-center gap-2 sm:gap-4 self-start sm:self-auto">
            <Button variant="secondary" onClick={onExport}>
              <svg
                width="16"
                height="14"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-5 sm:h-[18px]"
              >
                <path
                  d="M13.3333 12.3334L9.99997 9.00003M9.99997 9.00003L6.66663 12.3334M9.99997 9.00003V16.5M16.9916 14.325C17.8044 13.8819 18.4465 13.1808 18.8165 12.3322C19.1866 11.4837 19.2635 10.5361 19.0351 9.63894C18.8068 8.74182 18.2862 7.94629 17.5555 7.3779C16.8248 6.80951 15.9257 6.50064 15 6.50003H13.95C13.6977 5.5244 13.2276 4.61864 12.5749 3.85085C11.9222 3.08307 11.104 2.47324 10.1817 2.0672C9.25943 1.66116 8.25709 1.46949 7.25006 1.5066C6.24304 1.5437 5.25752 1.80861 4.36761 2.28142C3.47771 2.75422 2.70656 3.42261 2.11215 4.23635C1.51774 5.05008 1.11554 5.98797 0.935783 6.97952C0.756025 7.97107 0.803388 8.99047 1.07431 9.96108C1.34523 10.9317 1.83267 11.8282 2.49997 12.5834"
                  stroke="#718096"
                  stroke-width="1.67"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button
              onClick={onCreateNew}
              className="flex items-center gap-1 font-semibold text-xs sm:text-sm px-3 sm:px-4"
            >
              <i className="ri-add-line  sm:text-base"></i>
              <span className="hidden sm:inline">{createButtonText}</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
