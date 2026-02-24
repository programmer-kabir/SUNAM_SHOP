"use client";

import { useState } from "react";
import { Bell, Grid, Moon, Menu, Search, ChevronDown, X } from "lucide-react";
import { menuConfig } from "../../../../public/menuconfig";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import useUsers from "@/hooks/useUsers";

export default function DashboardLayout({ children }) {
  const { data: session } = useSession();
  const { data: users } = useUsers();
  const pathname = usePathname();

  const [dark, setDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [collapsed, setCollapsed] = useState(false);

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const userRole = session?.user?.role;
  const menus = menuConfig[userRole] || [];
  const currentUser = users?.find((u) => u.email === session?.user?.email);
  return (
    <div className={dark ? "dark" : ""}>
      <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        {/* ================= HEADER ================= */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hidden lg:flex"
              >
                <Menu className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="flex items-center text-2xl font-bold text-blue-600 dark:text-blue-400"
                >
                  <span className="leading-none">
                    Sunam
                    <span className="text-gray-900 dark:text-white">.shop</span>
                  </span>
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5 cursor-pointer" />
              <Grid className="w-5 h-5 cursor-pointer" />
              <button onClick={() => setDark(!dark)}>
                <Moon className="w-5 h-5" />
              </button>
              {currentUser?.image ? (
                <Image
                  height={8}
                  width={8}
                  src={currentUser?.image}
                  alt={currentUser?.name || "User"}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ================= BODY ================= */}
        <div className="flex flex-1 overflow-hidden">
          {/* ================= SIDEBAR DESKTOP ================= */}
          <aside
            className={`${
              collapsed ? "w-20" : "w-64"
            } transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 p-4 overflow-y-auto hidden lg:flex`}
          >
            <nav className="space-y-2 w-full">
              {menus.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <div key={item.title}>
                    {/* LINK ITEM */}
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={`w-full flex items-center ${
                          collapsed ? "justify-center" : "justify-between"
                        } px-3 py-2 rounded-lg transition-colors duration-200 ${
                          isActive
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {Icon && <Icon className="w-5 h-5" />}
                          {!collapsed && <span>{item.title}</span>}
                        </div>
                      </Link>
                    ) : (
                      <>
                        {/* TOGGLE ITEM */}
                        <div
                          onClick={() => toggleMenu(item.title)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <div className="flex items-center gap-3">
                            {Icon && <Icon className="w-5 h-5" />}
                            {!collapsed && <span>{item.title}</span>}
                          </div>

                          {!collapsed && (
                            <ChevronDown
                              className={`w-4 h-4 transition ${
                                openMenus[item.title] ? "rotate-180" : ""
                              }`}
                            />
                          )}
                        </div>

                        {/* SUBMENU */}
                        {!collapsed &&
                          openMenus[item.title] &&
                          item.children && (
                            <div className="ml-8 mt-1 space-y-1">
                              {item.children.map((sub) => {
                                const SubIcon = sub.icon;
                                const subActive = pathname === sub.href;

                                return (
                                  <Link
                                    key={sub.title}
                                    href={sub.href}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                                      subActive
                                        ? "bg-blue-100 text-blue-600"
                                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                                  >
                                    {SubIcon && <SubIcon className="w-4 h-4" />}
                                    {sub.title}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                      </>
                    )}
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* ================= MOBILE SIDEBAR ================= */}
          <div
            className={`fixed top-0 right-0 z-50 h-full w-72 bg-white dark:bg-gray-950 shadow-xl transform transition-transform duration-300 lg:hidden ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col gap-4 p-6">
              {menus.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {Icon && <Icon className="w-5 h-5" />}
                        {item.title}
                      </Link>
                    ) : (
                      <>
                        <div
                          onClick={() => toggleMenu(item.title)}
                          className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            {Icon && <Icon className="w-5 h-5" />}
                            {item.title}
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 transition ${
                              openMenus[item.title] ? "rotate-180" : ""
                            }`}
                          />
                        </div>

                        {openMenus[item.title] && item.children && (
                          <div className="ml-6 mt-2 space-y-2">
                            {item.children.map((sub) => {
                              const SubIcon = sub.icon;
                              return (
                                <Link
                                  key={sub.title}
                                  href={sub.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  {SubIcon && <SubIcon className="w-4 h-4" />}
                                  {sub.title}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= CONTENT ================= */}
          <main className="flex-1 overflow-y-auto p-5">{children}</main>
        </div>
      </div>
    </div>
  );
}
