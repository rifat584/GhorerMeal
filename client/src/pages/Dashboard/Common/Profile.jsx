import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import queryFetch from "../../../utilitis/queryFetch";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import axios from "axios";
import toast from "react-hot-toast";
import {
  DashboardActionLink,
  DashboardBadge,
  DashboardPage,
  DashboardPanel,
} from "../../../components/Dashboard/DashboardUI";

const Profile = () => {
  const { user } = useAuth();
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: () => queryFetch(`user/${user?.email}`),
  });
  if (isLoading) return <LoadingSpinner />;

  const { name, email, profileImage, address, role, status, chefId } = userData;

  const roleData = {
    userName: name,
    userEmail: email,
    requestStatus: "pending",
    requestTime: new Date().toISOString(),
  };

  const handleChefRole = async () => {
    try {
      const chefRequestData = { ...roleData, requestType: "chef" };
      const updateChefRequest = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/roles`,
        chefRequestData
      );
      if (updateChefRequest.data.insertedId) {
        toast.success("Request has been sent!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not send request");
    }
  };
  const handleAdminRole = async () => {
    try {
      const adminRequestData = { ...roleData, requestType: "admin" };
      const updateAdminRequest = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/roles`,
        adminRequestData
      );
      if (updateAdminRequest.data.insertedId) {
        toast.success("Request has been sent!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not send request");
    }
  };

  return (
    <DashboardPage
      title="Your profile"
      description="Review the account details tied to your dashboard access and request the next role when you are ready for it."
      action={<DashboardActionLink to="/all-meals">Browse meals</DashboardActionLink>}
    >
      <DashboardPanel className="mx-auto w-full max-w-3xl">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-[1.75rem] bg-base-200">
              <img src={profileImage} alt={name} className="h-full w-full object-cover" />
            </div>

            <div className="space-y-3">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-base-content">
                  {name}
                </h2>
                <p className="text-sm text-base-content/65">{email}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <DashboardBadge tone="primary">{role}</DashboardBadge>
                <DashboardBadge tone={status === "active" ? "success" : "warning"}>
                  {status}
                </DashboardBadge>
              </div>
            </div>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.25rem] bg-base-200/60 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45">
                Address
              </dt>
              <dd className="mt-2 text-sm leading-7 text-base-content/80">
                {address || "No address added yet"}
              </dd>
            </div>

            <div className="rounded-[1.25rem] bg-base-200/60 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45">
                Current role
              </dt>
              <dd className="mt-2 text-sm capitalize text-base-content/80">{role}</dd>
            </div>

            {role === "chef" && (
              <div className="rounded-[1.25rem] bg-base-200/60 p-4 sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45">
                  Chef ID
                </dt>
                <dd className="mt-2 text-sm text-base-content/80">{chefId}</dd>
              </div>
            )}
          </dl>

          {role !== "admin" && (
            <div className="border-t border-base-300 pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-base-content">Role access</h3>
                  <p className="mt-2 text-sm leading-7 text-base-content/70">
                    Send a request when you are ready to unlock more dashboard tools.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {role !== "chef" && role !== "admin" && (
                    <button onClick={handleChefRole} className="btn btn-primary rounded-full">
                      Request chef access
                    </button>
                  )}

                  {role !== "admin" && (
                    <button
                      onClick={handleAdminRole}
                      className="btn btn-outline rounded-full"
                    >
                      Request admin access
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </DashboardPanel>
    </DashboardPage>
  );
};

export default Profile;
