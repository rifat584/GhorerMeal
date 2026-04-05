import axios from "axios";
import toast from "react-hot-toast";
import {
  DashboardBadge,
  dashboardActionButtonClassName,
  dashboardDangerButtonClassName,
  dashboardTableCellClassName,
} from "../DashboardUI";

const ManageRequestRow = ({ userRole, refetch }) => {
  const handleAcceptUserRole = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/user/${userRole.userEmail}?role=${userRole.requestType}`
      );

      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/role/${userRole.userEmail}`
      );

      toast.success(`${userRole.userEmail} is now ${userRole.requestType}`);
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update the request");
    }
  };

  const handleRejectUserRole = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/role/${userRole.userEmail}`
      );
      toast.success("Request rejected");
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not reject the request");
    }
  };

  return (
    <tr className="border-t border-base-300/60">
      <td className={dashboardTableCellClassName}>
        <p className="font-semibold text-base-content">{userRole.userEmail}</p>
      </td>

      <td className={dashboardTableCellClassName}>
        <DashboardBadge
          tone={userRole.requestType === "admin" ? "warning" : "success"}
        >
          {userRole.requestType}
        </DashboardBadge>
      </td>

      <td className={dashboardTableCellClassName}>
        <DashboardBadge tone="warning">{userRole.requestStatus}</DashboardBadge>
      </td>

      <td className={dashboardTableCellClassName}>
        <div className="flex flex-wrap gap-2">
          <button
            className={dashboardActionButtonClassName}
            onClick={handleAcceptUserRole}
          >
            Accept
          </button>
          <button
            className={dashboardDangerButtonClassName}
            onClick={handleRejectUserRole}
          >
            Reject
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ManageRequestRow;
