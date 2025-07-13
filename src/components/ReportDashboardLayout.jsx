"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const ReportDashboardLayout = ({
  children,
  showActionButtons = false,
  onExport,
  onCreateNew,
  createButtonText,
  title = "Dashboard",
  description = "Welcome to your dashboard",
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-[#F5F7FA] dark:bg-gray-900 relative">
      {/* Sidebar - hidden on mobile when collapsed */}
      <div
        className={
          // On mobile: sidebar overlays content when expanded, hidden when collapsed
          "z-40 md:static fixed inset-y-0 left-0 transition-transform duration-300 " +
          (sidebarCollapsed
            ? " -translate-x-full md:translate-x-0 md:block hidden"
            : " translate-x-0") +
          " md:relative"
        }
        style={{
          width: sidebarCollapsed ? 0 : 240,
          minWidth: sidebarCollapsed ? 0 : 240,
        }}
      >
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content Area */}
      <div
        className={`flex flex-col overflow-hidden flex-1 transition-all duration-300 ${
          sidebarCollapsed ? "md:ml-16" : "ml-0"
        }`}
      >
        {/* Header */}
        <Header
          showActionButtons={showActionButtons}
          onExport={onExport}
          onCreateNew={onCreateNew}
          createButtonText={createButtonText}
          onToggleSidebar={toggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
          title={title}
          description={description}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto md:p-12 px-5">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default ReportDashboardLayout;
