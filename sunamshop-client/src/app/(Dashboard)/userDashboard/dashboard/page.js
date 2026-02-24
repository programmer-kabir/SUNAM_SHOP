import Breadcrumb from "@/components/ui/breadcrumb";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <Breadcrumb
        items={[
          {
            label: "user Dashboard",
            href: `/userDashboard/dashboard`,
          },
          {
            label: "Dashboard",
            href: `/userDashboard/dashboard`,
          },
        ]}
      />
    </div>
  );
};

export default DashboardPage;
