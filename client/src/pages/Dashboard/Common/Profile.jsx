import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import queryFetch from "../../../utilitis/queryFetch";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import axios from "axios";
import toast from "react-hot-toast";

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
      toast.error(error.response.data.message);
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
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        {/* Header */}
        <div className="card-body items-center text-center">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
              <img src={profileImage} alt="Profile" />
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-2">{name}</h2>
          <p className="text-sm text-gray-500">{email}</p>

          <div className="badge badge-outline mt-1 capitalize">{role}</div>

          <div
            className={`badge mt-2 ${
              status === "active" ? "badge-success" : "badge-error"
            }`}
          >
            {status}
          </div>
        </div>

        {/* Info Section */}
        <div className="px-6 pb-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Address</span>
            <span className="text-gray-600">{address}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Role</span>
            <span className="capitalize">{role}</span>
          </div>

          {role === "chef" && (
            <div className="flex justify-between">
              <span className="font-medium">Chef ID</span>
              <span>{chefId}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="card-actions px-6 pb-6 gap-2">
          {role !== "chef" && role !== "admin" && (
            <button
              onClick={handleChefRole}
              className="btn btn-primary btn-sm flex-1"
            >
              Be a Chef
            </button>
          )}

          {role !== "admin" && (
            <button
              onClick={handleAdminRole}
              className="btn btn-outline btn-sm flex-1"
            >
              Be an Admin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
