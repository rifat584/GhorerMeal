import { useQuery } from "@tanstack/react-query";
import CustomerOrderDataRow from "../../../components/Dashboard/TableRows/CustomerOrderDataRow";
import useAuth from "../../../hooks/useAuth";
import queryFetch from "../../../utilitis/queryFetch";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const MyOrders = () => {
  const { user } = useAuth();
  const { data: orderData, isLoading } = useQuery({
    queryKey: ["myOrders", user?.email],
    enabled: !!user?.email,
    queryFn: () => queryFetch(`order/${user?.email}`),
  });
  if (isLoading) return <LoadingSpinner />;
  console.log(orderData);

  return (
    <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Status</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Delivery Time</th>
            <th>Chef Name</th>
            <th>Chef ID</th>
            <th>Payment</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {
            orderData.map(order=><CustomerOrderDataRow order={order} key={order._id}/>)
          }
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
