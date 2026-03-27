import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
const CustomerOrderDataRow = ({order}) => {
  // console.log(order);
  const {estimatedDeliveryTime, chefName, mealName, orderStatus, orderTime, paymentStatus, price, quantity, userAddress, userEmail, _id}= order;
  
  const {mutate:handlePayment } = useMutation({
    mutationFn: ()=> axios.post(`${import.meta.env.VITE_API_BASE_URL}/create-checkout-session`, order),
    onSuccess: data=>{
      window.location.href= data.data.url
    },
    onError: error=>{
      toast.error(error.response.data.error);
    }
  })



  return (
    <tr>
      <td className="font-medium">{mealName}</td>

      <td>
        <span className="badge badge-warning capitalize">{orderStatus}</span>
      </td>

      <td>{price} TK</td>

      <td>{quantity}</td>

      <td>{estimatedDeliveryTime?.minTime} - {estimatedDeliveryTime?.maxTime} mins</td>

      <td>{chefName}</td>

      <td>chef-2116</td>

      <td>
        <span className="badge badge-outline capitalize">{paymentStatus}</span>
      </td>

      <td className="text-right">
        <button
        onClick={handlePayment}
        className="btn btn-xs btn-primary"
        disabled={orderStatus==="pending" || orderStatus==="delivered" || paymentStatus==="paid"}
        >Pay</button>
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;
