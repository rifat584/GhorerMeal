import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
const SellerOrderDataRow = ({ order }) => {
  const queryClient = useQueryClient()
  const {
    chefId,
    foodId,
    mealName,
    orderStatus,
    paymentStatus,
    price,
    quantity,
    userAddress,
    userEmail,
    _id
  } = order;

  // console.log(order);
  // accept order
  const {mutate: handleOrderStatus}= useMutation({
    mutationFn: (status)=> axios.patch(`${import.meta.env.VITE_API_BASE_URL}/order/change-status/${_id}?status=${status}`),
    onSuccess: (data)=>{
      console.log(data);
      toast.success("Order Accepted");
      queryClient.invalidateQueries({queryKey: ['orders', chefId]})
    },
    onError: error=>console.log(error),
  })



  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{mealName}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{userEmail}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{price} TK</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{quantity}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{userAddress}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{orderStatus}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{"orderTime"}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{paymentStatus}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center gap-2">
          {/* accept */}
          <button
          className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
          disabled={orderStatus==="accepted" || orderStatus==="delivered" || orderStatus==="cancelled"}
          onClick={()=>handleOrderStatus('accepted')}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">Accept</span>
          </button>
          {/* deliver */}
          <button
          className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
          disabled={orderStatus==="pending" || orderStatus==="delivered" || orderStatus==="cancelled"}
          onClick={()=>handleOrderStatus('delivered')}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">Deliver</span>
          </button>
          {/* cancel */}
          <button
          className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
          disabled={orderStatus==="accepted" || orderStatus==="delivered" || orderStatus==="cancelled"}
          onClick={()=>handleOrderStatus('cancelled')}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">Cancel</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SellerOrderDataRow;
