import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  PackageCheck,
  PackagePlus,
  ListOrdered,
  Tags,
  UserCog,
  ClipboardList,
  ShoppingCart,
  Tag,
  FileText,
} from "lucide-react";

export const menuConfig = {
  admin: [
    {
      title: "Overview",
      href: "/adminDashboard/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "User Management",
      href: "/adminDashboard/users",
      icon: UserCog,
    },
    {
      title: "User Cart Monitor",
      href: "/adminDashboard/userCart",
      icon: ShoppingCart,
    },
    {
      title: "Order Management",
      href: "/adminDashboard/manageOrders",
      icon: ClipboardList,
    },
    {
      title: "Product Management",
      icon: ShoppingBag,
      children: [
        {
          title: "Add New Product",
          href: "/adminDashboard/products/addproducts",
          icon: PackagePlus,
        },
        {
          title: "All Products",
          href: "/adminDashboard/products/allproducts",
          icon: ListOrdered,
        },
        {
          title: "Add Category",
          href: "/adminDashboard/products/addcategory",
          icon: Tag,
        },
      ],
    },
    {
      title: "Flash Campaigns",
      href: "/adminDashboard/flashcampaign",
      icon: Tags,
    },
  ],

  user: [
    {
      title: "Dashboard",
      href: "/userDashboard/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Profile Settings",
      href: "/userDashboard/profileInformation",
      icon: Users,
    },
    {
      title: "My Orders",
      icon: ShoppingCart,
      children: [
        {
          title: "My Cart",
          href: "/userDashboard/cart",
          icon: ShoppingCart,
        },
        {
          title: "Confirmed Orders",
          href: "/userDashboard/orders",
          icon: PackageCheck,
        },
      ],
    },
    {
      title: "Invoices",
      href: "/userDashboard/invoices",
      icon: FileText,
    },
  ],
};
