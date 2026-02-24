import { Roboto } from "next/font/google";
import "../globals.css";
import DashboardLayout from "@/components/Dashboards/common/Sidebar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
