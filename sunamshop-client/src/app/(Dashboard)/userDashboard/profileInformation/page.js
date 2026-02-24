import EditProfile from "@/components/Dashboards/userDashobard/EditProfie";
import { fetchDistricts, fetchDivisions, fetchUpazilas } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const profileInformation = async () => {
  const session = await getServerSession(authOptions);
  const divisions = await fetchDivisions();
  const districts = await fetchDistricts();
  const upazilas = await fetchUpazilas();
  const token = session?.accessToken;
  return (
    <div>
      <EditProfile
        user={session?.user}
        token={token}
        divisions={divisions}
        districts={districts}
        upazilas={upazilas}
      />
    </div>
  );
};

export default profileInformation;
