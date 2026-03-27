import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from 'sweetalert2'
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const PurchaseModal = ({ closeModal, isOpen, mealData }) => {
  const {user}= useAuth();
  const { foodName, price, chefId, _id, chefName, estimatedDeliveryTime } = mealData;

  const {register, watch}= useForm();
// console.log(watch("quantity"));
  const handleOrder = async ()=>{
    const quantity = watch("quantity");
    const totalPrice = Number(quantity)*price;
    const address = watch("address");
    try {
      const orderInfo = {
        mealName: foodName,
        foodId: _id,
        price: totalPrice,
        quantity: Number(quantity),
        chefId,
        chefName,
        userEmail: user?.email,
        userAddress: address,
        estimatedDeliveryTime,
        orderStatus: 'pending',
        paymentStatus: 'pending',
      }
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/orders`, orderInfo);
      
    } catch (error) {
      toast.error(error.message);
    }finally{
      closeModal();
    }
  }
const {mutate}=useMutation({
  mutationFn: handleOrder,
  onSuccess: ()=>toast.success("ordered place successfully!"),
  onError: (err)=>toast.success(err.message),

})
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Review Info Before Purchase
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Meal Name: {foodName}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Price: {price} TK</p>
            </div>
            <div className="mt-2">
              <label htmlFor="Quantity" className="text-sm text-gray-500">Quantity: </label>
              <input
              {...register("quantity", {min: {value:1, message: "Minimum order amount is 1"}, value:1})}
                type="number"
                className="input input-bordered input-sm w-16 text-center join-item"
              />
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">chefId: {chefId}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Customer Email: {user?.email}</p>
            </div>
            <div className="mt-2">
              <label htmlFor="Address" className="text-sm text-gray-500">Address: </label>
              <textarea
              {...register("address", {
                required: { value: true, message: "Address is required" },
              })}
              placeholder="please enter your address"
              className="textarea textarea-bordered w-full"
            />
            </div>
            <div className="flex mt-2 justify-around">
              <button
                type="submit"
                onClick={mutate}
                className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              >
                Pay
              </button>
              <button
                type="button"
                className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
