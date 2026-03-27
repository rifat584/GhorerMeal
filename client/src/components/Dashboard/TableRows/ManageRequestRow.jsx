import axios from "axios";
import toast from "react-hot-toast";

const ManageRequestRow = ({ userRole, refetch }) => {
  const { userEmail, requestStatus, requestType } = userRole;

  const handleAcceptUserRole = async () => {
    try {
      const acceptRequest = await axios.patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/user/${userEmail}?role=${requestType}`
      );
      if (acceptRequest.data.role === requestType) {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/role/${userEmail}`
        );
        toast.success(`${userEmail} has been set to ${requestType}`);
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const handleRejectUserRole = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/role/${userEmail}`
      );
      toast.error("User's request has been denied!");
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{userEmail}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{requestType}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="">{requestStatus}</p>
      </td>

      <td className="px-5 py-5 text-sm space-x-3">
        <button
          className="btn btn-active btn-success text-white border-none"
          onClick={handleAcceptUserRole}
        >
          Accept
        </button>
        <button
          className="btn btn-active btn-error text-white border-none"
          onClick={handleRejectUserRole}
        >
          Reject
        </button>
      </td>
    </tr>
  );
};

export default ManageRequestRow;
