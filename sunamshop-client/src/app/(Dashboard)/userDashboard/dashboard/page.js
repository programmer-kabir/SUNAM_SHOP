import Loyalty from "@/components/Dashboards/userDashobard/dashboard/Loyalty";
import OrderOverview from "@/components/Dashboards/userDashobard/dashboard/OrderOverview";
import QuickActions from "@/components/Dashboards/userDashobard/dashboard/QuickActions";
import RecentOrdersTable from "@/components/Dashboards/userDashobard/dashboard/RecentOrdersTable";
import SpendingInsights from "@/components/Dashboards/userDashobard/dashboard/SpendingInsights";
import SummaryHeader from "@/components/Dashboards/userDashobard/dashboard/SummaryHeader";
import Breadcrumb from "@/components/ui/breadcrumb";
import { authOptions } from "@/lib/auth";
import { getAllOrders } from "@/utils/ordersApis";
import { getCurrentUser } from "@/utils/usersApi";
import { getServerSession } from "next-auth";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const orders = await getAllOrders(session?.accessToken);
  const user = await getCurrentUser(session?.user?.email, session?.accessToken);
  // ===== USER ORDER FILTER =====
  const userOrders =
    orders?.filter((order) => order?.userEmail === session?.user?.email) || [];

  const totalOrders = userOrders.length;

  const totalSpend =
    userOrders.reduce((sum, order) => sum + Number(order.total), 0) || 0;

  const delivered =
    userOrders.filter((o) => o.status === "delivered").length || 0;

  const pending = userOrders.filter((o) => o.status === "pending").length || 0;
  const cancelled =
    userOrders.filter((o) => o.status === "cancelled").length || 0;
  const rejected =
    userOrders.filter((o) => o.status === "rejected").length || 0;
  const processing =
    userOrders.filter((o) => o.status === "processing").length || 0;
  const shipped = userOrders.filter((o) => o.status === "shipped").length || 0;
  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "User Dashboard", href: `/userDashboard/dashboard` },
          { label: "Dashboard", href: `/userDashboard/dashboard` },
        ]}
      />
      <SummaryHeader
        user={user}
        totalOrders={totalOrders}
        totalSpend={totalSpend}
      />
      <OrderOverview
        totalOrders={totalOrders}
        delivered={delivered}
        pending={pending}
        cancelled={cancelled}
        rejected={rejected}
        processing={processing}
        shipped={shipped}
      />
      <SpendingInsights orders={userOrders} />

      <RecentOrdersTable orders={userOrders} />
      <QuickActions />
      <Loyalty totalSpend={totalSpend} />
    </div>
  );
};

export default DashboardPage;
