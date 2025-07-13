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

        {showActionButtons && onCreateNew && (
          <div className="flex items-center gap-2 sm:gap-4 self-start sm:self-auto">
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
