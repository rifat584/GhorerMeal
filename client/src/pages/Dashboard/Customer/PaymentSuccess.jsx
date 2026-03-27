import { useEffect, useState } from "react";
import axios from "axios";

const PaymentSuccess = () => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) return setStatus("error");

    const checkPayment = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/session-status`,
          { params: { session_id: sessionId } }
        );
        console.log(res);
        if (res.data.status === "paid") {
          setStatus("paid");
        } else {
          setStatus(res.data.status);
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    checkPayment();
  }, []);

  if (status === "loading") return <p>Verifying payment...</p>;
  if (status === "error") return <p>Payment verification failed.</p>;
  if (status === "paid") return <p>Payment successful! Thank you.</p>;

  return <p>Payment status: {status}</p>;
};

export default PaymentSuccess;
