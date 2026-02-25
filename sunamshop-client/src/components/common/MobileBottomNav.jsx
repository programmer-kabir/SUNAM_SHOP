import Link from "next/link";
import {
  Home,
  ShoppingBag,
  Heart,
  MessageCircle,
  Grid,
  LogIn,
  CarrotIcon,
  ShoppingCart,
  LayoutDashboardIcon,
} from "lucide-react";

export default function MobileBottomNav({ user }) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md md:hidden z-50">
      <div className="flex justify-around items-center py-2">
        <Link
          href="/"
          className="flex flex-col items-center text-xs text-gray-600 hover:text-black"
        >
          <Home size={20} />
          <span>Home</span>
        </Link>

        <Link
          href="/products"
          className="flex flex-col items-center text-xs text-gray-600 hover:text-black"
        >
          <ShoppingBag size={20} />
          <span>Shop</span>
        </Link>

        <Link
          href="/wishlist"
          className="flex flex-col items-center text-xs text-gray-600 hover:text-black"
        >
          <Heart size={20} />
          <span>Favorites</span>
        </Link>

        <Link
          href="/messages"
          className="flex flex-col items-center text-xs text-gray-600 hover:text-black"
        >
          <MessageCircle size={20} />
          <span>Message</span>
        </Link>
        {user?.user && (
          <Link
            href="/categories"
            className="flex flex-col items-center text-xs text-gray-600 hover:text-black"
          >
            <ShoppingCart size={20} />
            <span>Items</span>
          </Link>
        )}

        {user?.user ? (
          <Link
            href={
              user?.user?.role === "admin"
                ? "/adminDashboard/dashboard"
                : "/userDashboard/dashboard"
            }
            className="flex flex-col items-center text-xs text-gray-600 hover:text-black"
          >
            <LayoutDashboardIcon size={20} />
            <span>Dashboard</span>
          </Link>
        ) : (
          <Link
            href="/login"
            className="flex flex-col items-center text-xs text-gray-600 hover:text-black"
          >
            <LogIn size={20} />
            <span>Log In</span>
          </Link>
        )}
      </div>
    </div>
  );
}
