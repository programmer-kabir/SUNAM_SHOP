"use client";
import Link from "next/link";
import {
  ShoppingCart,
  Moon,
  Sun,
  Heart,
  User,
  LogOut,
  Globe,
  LayoutDashboard,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";

export default function NavActions({
  session,
  isAdmin,
  cart,
  wishlist,
  setIsCartOpen,
  setLoginOpen,
}) {
  const { darkMode, setDarkMode, language, setLanguage } = useThemeLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "BN" ? "EN" : "BN");
  };

  return (
    <div className="flex items-center gap-3 md:gap-4">
      {/* DARK MODE */}
      {/* <button
        onClick={() => setDarkMode(!darkMode)}
        className="hidden md:flex p-2"
      >
        {darkMode ? (
          <Sun className="h-5 w-5 text-yellow-500" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </button> */}

      {/* LANGUAGE */}
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-1 text-sm"
      >
        <Globe className="h-4 w-4" /> {language}
      </button>

      {/* CART & WISHLIST (HIDDEN FOR ADMIN) */}
      {session?.user && !isAdmin && (
        <>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative hidden md:flex p-2 cursor-pointer"
          >
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              {cart?.length || 0}
            </span>
          </button>
        </>
      )}
      <Link
        href="/wishlist"
        className="relative hidden md:flex p-2 cursor-pointer"
      >
        <Heart className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] text-white">
          {wishlist?.length || 0}
        </span>
      </Link>
      {/* USER / DASHBOARD */}
      {session?.user ? (
        <>
          <Link
            href={
              isAdmin ? "/adminDashboard/dashboard" : "/userDashboard/dashboard"
            }
            className="hidden md:flex p-2 cursor-pointer"
          >
            <LayoutDashboard className="h-6 w-6" />
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="hidden md:flex p-2 cursor-pointer"
          >
            <LogOut className="h-6 w-6" />
          </button>
        </>
      ) : (
        <button
          onClick={() => setLoginOpen(true)}
          className="p-2 cursor-pointer"
        >
          <User className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
