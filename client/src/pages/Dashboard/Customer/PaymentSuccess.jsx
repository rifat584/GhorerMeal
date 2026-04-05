import { useEffect, useState } from "react";
import axios from "axios";

const PaymentSuccess = () => {
  const sessionId = new URLSearchParams(window.location.search).get("session_id");
  const [status, setStatus] = useState(sessionId ? "loading" : "error");

  useEffect(() => {
    if (!sessionId) return;
    let isCurrent = true;

    const checkPayment = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/session-status`,
          { params: { session_id: sessionId } }
        );

        if (!isCurrent) return;

        if (response.data.paymentStatus === "paid") {
          setStatus("paid");
          return;
        }

        setStatus(response.data.status || "error");
      } catch {
        if (!isCurrent) return;
        setStatus("error");
      }
    };

    checkPayment();

    return () => {
      isCurrent = false;
    };
  }, [sessionId]);

  if (status === "loading") return <p>Verifying payment...</p>;
  if (status === "error") return <p>Payment verification failed.</p>;
  if (status === "paid") return <p>Payment successful! Thank you.</p>;

  return <p>Payment status: {status}</p>;
};

export default PaymentSuccess;
