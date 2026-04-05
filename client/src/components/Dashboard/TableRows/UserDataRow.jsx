import { useState } from "react";
import UpdateUserRoleModal from "../../Modal/UpdateUserRoleModal";
import {
  DashboardBadge,
  dashboardSecondaryButtonClassName,
  dashboardTableCellClassName,
} from "../DashboardUI";

const UserDataRow = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <tr className="border-t border-base-300/60">
      <td className={dashboardTableCellClassName}>
        <p className="font-semibold text-base-content">{user.name || user.email}</p>
        <p className="mt-1 text-sm text-base-content/60">{user.email}</p>
      </td>

      <td className={dashboardTableCellClassName}>
        <DashboardBadge
          tone={
            user.role === "admin"
              ? "warning"
              : user.role === "chef"
                ? "success"
                : "primary"
          }
        >
          {user.role}
        </DashboardBadge>
      </td>

      <td className={dashboardTableCellClassName}>
        <DashboardBadge tone={user.status === "active" ? "success" : "warning"}>
          {user.status}
        </DashboardBadge>
      </td>

      <td className={dashboardTableCellClassName}>
        {user.role !== "admin" ? (
          <>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className={dashboardSecondaryButtonClassName}
            >
              Update role
            </button>
            <UpdateUserRoleModal
              isOpen={isOpen}
              closeModal={() => setIsOpen(false)}
              role={user.role}
              email={user.email}
            />
          </>
        ) : (
          <p className="text-sm text-base-content/55">Protected account</p>
        )}
      </td>
    </tr>
  );
};

export default UserDataRow;
