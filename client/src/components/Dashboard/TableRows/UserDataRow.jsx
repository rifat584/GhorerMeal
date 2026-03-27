import { useState } from "react";
import UpdateUserRoleModal from "../../Modal/UpdateUserRoleModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const UserDataRow = ({ user }) => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const queryClient = useQueryClient();
  const { email, status, _id, role } = user;

  const { mutate: handleFraudUser } = useMutation({
    mutationFn: (id) =>
      axios.patch(`${import.meta.env.VITE_API_BASE_URL}/user/fraud/${id}`),
    onSuccess: (data) => {
      console.log(data);
      toast.success("user has been marked as fraud!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="">{status}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {role !== "admin" && (
          <>
            <span
              onClick={() => setIsOpen(true)}
              className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
              ></span>

              <span className="relative">Update Role</span>
            </span>
            {/* Modal */}
            <UpdateUserRoleModal
              isOpen={isOpen}
              closeModal={closeModal}
              role="user"
              email={email}
            />
          </>
        )}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="btn btn-outline" onClick={() => handleFraudUser(_id)}>
          Fraud
        </p>
      </td>
    </tr>
  );
};

export default UserDataRow;
