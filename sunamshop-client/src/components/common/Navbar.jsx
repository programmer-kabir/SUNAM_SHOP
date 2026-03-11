"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import useCart from "@/hooks/useCart";
import useProducts from "@/hooks/useProducts";
import { useWishlist } from "@/context/WishlistContext";

import SearchBar from "./SearchBar";
import NavActions from "./NavActions";
import CartModal from "../Home/CartModal";
import MobileBottomNav from "./MobileBottomNav";
import AuthModal from "../Authencations/AuthModal";
import { usePathname } from "next/navigation";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { data: session } = useSession();
  const { data: cart, refetch: refetchCart } = useCart();
  const { wishlist } = useWishlist();
  const { data: products } = useProducts();
  const pathname = usePathname(); // 👈 route check

  const [loginOpen, setLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showNavbarSearch, setShowNavbarSearch] = useState(false);

  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    // 👇 homepage হলে scroll logic
    if (pathname === "/") {
      const handleHidden = () => setShowNavbarSearch(true);
      const handleVisible = () => setShowNavbarSearch(false);

      window.addEventListener("heroHidden", handleHidden);
      window.addEventListener("heroVisible", handleVisible);

      return () => {
        window.removeEventListener("heroHidden", handleHidden);
        window.removeEventListener("heroVisible", handleVisible);
      };
    }

    // 👇 অন্য page হলে search সবসময় দেখাবে
    else {
      setShowNavbarSearch(true);
    }
  }, [pathname]);

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="container-custom px-4">
          {/* TOP BAR */}
          <div className="flex gap-20 h-16 items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-2 md:gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="">
                <Menu className="h-6 w-6" />
              </button>

              <Link
                href="/"
                className="text-lg md:text-2xl font-bold text-blue-600"
              >
                Sunam
                <span className="text-gray-900 dark:text-white">.shop</span>
              </Link>
            </div>

            {/* DESKTOP SEARCH */}
            <div className="hidden md:block w-full">
              <SearchBar showNavbarSearch={showNavbarSearch} />
            </div>
            {/* MOBILE SEARCH */}
            <div className="flex items-center gap-2">
              <div className="md:hidden ">
                <SearchBar showNavbarSearch={true} />
              </div>
              {/* RIGHT ACTIONS */}
              <NavActions
                session={session}
                isAdmin={isAdmin}
                cart={cart}
                wishlist={wishlist}
                setIsCartOpen={setIsCartOpen}
                setLoginOpen={setLoginOpen}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* CART MODAL (Slide-in Sidebar) */}
      <div
        onClick={() => setIsCartOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 ${isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />
      <div
        className={`fixed top-0 right-0 h-full w-[80%] lg:w-[25%] bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)}>✕</button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
          <CartModal
            products={products}
            cart={cart}
            session={session}
            refetchCart={refetchCart}
          />
        </div>
      </div>

      <MobileBottomNav user={session} />
      {loginOpen && <AuthModal close={() => setLoginOpen(false)} />}
    </>
  );
}
