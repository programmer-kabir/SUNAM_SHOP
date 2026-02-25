"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Moon,
  Sun,
  Search,
  Menu,
  X,
  LayoutDashboard,
  Heart,
  User,
  LogOut,
} from "lucide-react";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";
import { signOut, useSession } from "next-auth/react";
import useCart from "@/hooks/useCart";
import CartModal from "../Home/CartModal";
import useProducts from "@/hooks/useProducts";
import { useWishlist } from "@/context/WishlistContext";
import MobileBottomNav from "./MobileBottomNav";

export default function Navbar() {
  const { darkMode, setDarkMode } = useThemeLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { data: cart, refetch: refetchCart } = useCart();
  const { data: session } = useSession();
  const { data: products, isLoading, refetch: refetchProducts } = useProducts();
  const { wishlist } = useWishlist();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const categories = [
    { id: 1, nameEN: "Home", nameBN: "হোম", link: "/" },
    { id: 6, nameEN: "All Products", nameBN: "হোম", link: "/products" },
    {
      id: 2,
      nameEN: "Electronics",
      nameBN: "ইলেকট্রনিক্স",
      link: "/products?category=electronics",
    },
    {
      id: 3,
      nameEN: "Mobiles",
      nameBN: "ফ্যাশন",
      link: "/products?category=Mobiles",
    },
    {
      id: 4,
      nameEN: "Gadgets",
      nameBN: "গ্যাজেট",
      link: "/products?category=gadgets",
    },
    { id: 5, nameEN: "Offers", nameBN: "অফার", link: "/offers" },
  ];
  const isAdmin = session?.user?.role;
  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/90">
        <div className="container-custom">
          <div className="flex h-16 w-full items-center justify-between">
            {/* LEFT SIDE */}
            <div className="flex items-center gap-2 md:gap-10">
              {/* MOBILE MENU */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 cursor-pointer"
              >
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              </button>
              {/* LOGO */}
              <Link
                href="/"
                className="flex items-center md:text-2xl  text-base font-bold text-blue-600 dark:text-blue-400"
              >
                <span className="leading-none">
                  Sunam
                  <span className="text-gray-900 dark:text-white">.shop</span>
                </span>
              </Link>

              {/* DESKTOP MENU */}
              <div className="hidden lg:flex items-center gap-6">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={cat.link}
                    className="relative text-[15px] font-medium text-gray-700 hover:text-black
                    after:content-[''] after:absolute after:left-1/2 after:-bottom-1 after:h-[2px]
                    after:w-0 after:bg-black after:transition-all after:duration-500
                    hover:after:w-full hover:after:left-0 pt-2
                    dark:text-gray-200 dark:hover:text-blue-400"
                  >
                    <span className="en">{cat.nameEN}</span>
                    <span className="bn">{cat.nameBN}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center md:gap-4">
              {/* SEARCH (Desktop) */}
              <div className="relative w-full hidden md:flex md:w-72">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchTerm.trim() !== "") {
                      router.push(`/products?search=${searchTerm}`);
                      setSearchTerm("");
                    }
                  }}
                  placeholder="Search products..."
                  className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-4 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
                <Search
                  onClick={() => {
                    if (searchTerm.trim() !== "") {
                      router.push(`/products?search=${searchTerm}`);
                      setSearchTerm("");
                    }
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                />
              </div>
              <div className="w-full px-4 py-3 bg-white md:hidden">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-transparent border-b border-gray-300 
                     focus:border-black focus:outline-none 
                     py-2 pr-8 text-sm"
                  />

                  <Search
                    size={18}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                </div>
              </div>

              {/* DARK MODE */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hidden md:flex"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                )}
              </button>

              {/* USER BASED ICONS */}
              {session?.user && isAdmin !== "admin" ? (
                <>
                  {/* CART */}
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative p-2 cursor-pointer hidden md:flex"
                  >
                    <ShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {cart?.length}
                    </span>
                  </button>

                  {/* WISHLIST */}
                  <Link
                    href={"/wishlist"}
                    className="relative p-2 hidden md:flex"
                  >
                    <Heart className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {wishlist.length}
                    </span>
                  </Link>
                </>
              ) : !session?.user && isAdmin !== "admin" ? (
                // user না থাকলে শুধু wishlist
                <Link
                  href={"/wishlist"}
                  className="relative p-2 hidden md:flex"
                >
                  <Heart className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white">
                    {wishlist.length}
                  </span>
                </Link>
              ) : null}

              {/* DASHBOARD */}
              {session?.user?.role ? (
                <>
                  <Link
                    href={
                      session.user.role === "admin"
                        ? "/adminDashboard/dashboard"
                        : "/userDashboard/dashboard"
                    }
                    className="relative p-2 hidden md:flex"
                  >
                    <LayoutDashboard className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="hidden md:flex"
                  >
                    <LogOut className="h-6 w-6 text-gray-700 dark:text-gray-200 cursor-pointer" />
                  </button>
                </>
              ) : (
                // যদি role না থাকে → User Icon
                <Link href="/login" className="relative p-2">
                  <User className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}
      {/* MOBILE DRAWER */}
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white dark:bg-gray-950 shadow-xl transform transition-transform duration-500 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-800 py-5">
          <Link
            href="/"
            className="flex items-center text-2xl font-bold text-blue-600 dark:text-blue-400"
          >
            <span className="leading-none">
              Sunam
              <span className="text-gray-900 dark:text-white">.shop</span>
            </span>
          </Link>
          <button
            className="cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* LINKS */}
        <div className="flex flex-col gap-6 p-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-gray-800 dark:text-gray-200"
            >
              <span className="en">{cat.nameEN}</span>
              <span className="bn">{cat.nameBN}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Cart MOdal */}
      {/* Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Right Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] lg:w-[25%] bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)}>✕</button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
          <CartModal
            cart={cart}
            products={products}
            session={session}
            refetchCart={refetchCart}
          />
        </div>
      </div>
      <MobileBottomNav user={session}/>
    </>
  );
}
