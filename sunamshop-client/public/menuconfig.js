import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  List,
  Pencil,
} from "lucide-react";

export const menuConfig = {
  admin: [
    {
      title: "Dashboard",
      href: "/adminDashboard/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      href: "/adminDashboard/users",
      icon: Users,
    },
    {
      title: "Manage Orders",
      href: "/adminDashboard/manageOrders",
      icon: Users,
    },
    {
      title: "Products",
      icon: Package,
      children: [
        {
          title: "Add Products",
          href: "/adminDashboard/products/addproducts",
          icon: List,
        },
        {
          title: "All Products",
          href: "/adminDashboard/products/allproducts",
          icon: List,
        },
      ],
    },
    {
      title: "Flash Campaign",
      href: "/adminDashboard/flashcampaign",
      icon: Users,
    },
  ],

  user: [
    {
      title: "Dashboard",
      href: "/userDashboard/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Profile",
      href: "/userDashboard/profileInformation",
      icon: LayoutDashboard,
    },
    {
      title: "My Orders",
      icon: Package,
      children: [
        {
          title: "My Incomplete Cart",
          href: "/userDashboard/cart/Incomplete_cart",
          icon: List,
        },
        {
          title: "My Complete Cart",
          href: "/userDashboard/cart/complete_cart",
          icon: Pencil,
        },
      ],
    },
  ],
};
