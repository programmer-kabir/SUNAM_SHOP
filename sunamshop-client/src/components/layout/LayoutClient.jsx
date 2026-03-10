"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/Sidebar";

export default function LayoutClient({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Large screen হলে sidebar default open
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">

        {/* Sidebar */}
        <div
          className={`
          fixed top-16 left-0 h-[calc(100vh-64px)] w-[280px] bg-white shadow border-r border-gray-400 z-50 md:z-10
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <Sidebar />
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed md:top-16 left-0 w-full h-screen md:h-[calc(100vh-64px)] bg-black/40 lg:hidden z-40"
          />
        )}

        {/* Content */}
        <div
          className={`
          flex-1 transition-all duration-300
          ${sidebarOpen ? "lg:ml-[280px]" : "ml-0"}
          `}
        >
          <div className="bg-white">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}