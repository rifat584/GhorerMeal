import React from "react";
import ManageRequestRow from "../../../components/Dashboard/TableRows/ManageRequestRow";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import queryFetch from "../../../utilitis/queryFetch";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { DashboardPage, DashboardTable } from "../../../components/Dashboard/DashboardUI";

const ManageRequest = () => {
  const { user } = useAuth();
  const { data, isLoading , refetch} = useQuery({
    queryKey: ["roles", user?.email],
    enabled: !!user?.email,
    queryFn:  () => queryFetch(`roles`)
  });
  if (isLoading) return <LoadingSpinner />;

  const totalRequests = data.length
  const chefRequests = data.filter(request => request.requestType === "chef").length
  const adminRequests = data.filter(request => request.requestType === "admin").length

  return (
    <DashboardPage
      title="Role requests"
      description="Review the access requests submitted through user profiles and decide which role changes should go through."
      metrics={[
        { label: "Total requests", value: totalRequests, helper: "All role requests waiting in the dashboard.", tone: "primary" },
        { label: "Chef requests", value: chefRequests, helper: "Users asking for chef access.", tone: "success" },
        { label: "Admin requests", value: adminRequests, helper: "Users asking for admin access.", tone: "warning" },
      ]}
    >
      <DashboardTable
        title="Pending role requests"
        countLabel="Request"
        columns={["Requester", "Request type", "Status", "Actions"]}
        rowCount={data.length}
        emptyTitle="No pending role requests"
        emptyDescription="New chef and admin access requests will show up here."
      >
        {data.map(userRole => (
          <ManageRequestRow userRole={userRole} key={userRole._id} refetch={refetch} />
        ))}
      </DashboardTable>
    </DashboardPage>
  );
};

export default ManageRequest;
