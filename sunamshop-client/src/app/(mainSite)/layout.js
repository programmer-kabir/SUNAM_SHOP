import "../globals.css";
import Navbar from "@/components/common/Navbar";
import AnnounceBar from "@/components/common/AnnounceBar";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeLanguageProvider } from "@/context/ThemeLanguageContext";
import Footer from "@/components/common/Footer";
import { getAllFalseSales } from "@/utils/FlashSalesApi";
import Sidebar from "@/components/Sidebar";
import LayoutClient from "@/components/layout/LayoutClient";

export const metadata = {
  title: "Online Grocery Shopping and Delivery in Bangladesh",
  description:
    "Buy fresh groceries, vegetables, fruits, personal care items, baby products and daily essentials online with fast home delivery across Bangladesh.",
  keywords: [
    "online grocery Bangladesh",
    "buy groceries online",
    "grocery delivery Bangladesh",
    "fresh vegetables online",
    "online supermarket Bangladesh",
  ],
};

export default async function RootLayout({ children }) {
  // const FlashSale = await getAllFalseSales();
  return (
    // <html lang="en">
    //   <body>
        <ThemeLanguageProvider>
          <LanguageProvider>
            <LayoutClient>
              {children}
              <Footer />
            </LayoutClient>
          </LanguageProvider>
        </ThemeLanguageProvider>
    //   </body>
    // </html>
  );
}
