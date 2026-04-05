import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiOutlineClock,
  HiOutlineCreditCard,
  HiOutlineTruck,
} from "react-icons/hi2";
import Container from "../../../components/Shared/Container";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const formatPaymentTime = paymentTime => {
  if (!paymentTime) return "Just now";

  return new Date(paymentTime).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const PaymentSuccess = () => {
  const sessionId = new URLSearchParams(window.location.search).get("session_id");
  const [paymentInfo, setPaymentInfo] = useState({
    status: sessionId ? "loading" : "error",
    paymentStatus: "",
    mealName: "",
    orderId: "",
    orderStatus: "",
    paymentTime: "",
  });

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

        const nextStatus =
          response.data.paymentStatus === "paid"
            ? "paid"
            : response.data.status || "error";

        setPaymentInfo({
          status: nextStatus,
          paymentStatus: response.data.paymentStatus || "",
          mealName: response.data.mealName || "",
          orderId: response.data.orderId || "",
          orderStatus: response.data.orderStatus || "",
          paymentTime: response.data.paymentTime || "",
        });
      } catch {
        if (!isCurrent) return;

        setPaymentInfo(previousState => ({
          ...previousState,
          status: "error",
        }));
      }
    };

    checkPayment();

    return () => {
      isCurrent = false;
    };
  }, [sessionId]);

  if (paymentInfo.status === "loading") {
    return (
      <section className="py-10 md:py-14">
        <Container>
          <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
            <div className="w-full rounded-[2rem] border border-base-300 bg-base-100 p-8 text-center shadow-sm sm:p-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-base-200">
                <LoadingSpinner />
              </div>
              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-base-content sm:text-4xl">
                Verifying your payment
              </h1>
              <p className="mt-4 text-sm leading-7 text-base-content/68 sm:text-base">
                We are confirming this payment and updating your order before we
                send you back into the dashboard flow.
              </p>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const isPaymentSuccess = paymentInfo.status === "paid";
  const statusIcon = isPaymentSuccess ? HiCheckCircle : HiExclamationCircle;
  const StatusIcon = statusIcon;
  const statusBadgeClassName = isPaymentSuccess
    ? "bg-success/12 text-success"
    : "bg-error/12 text-error";
  const statusPanelClassName = isPaymentSuccess
    ? "border-success/15 bg-success/5"
    : "border-error/15 bg-error/5";

  return (
    <section className="py-10 md:py-14">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-sm">
            <div className="border-b border-base-300 bg-base-200/45 p-8 sm:p-10">
              <span
                className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${statusBadgeClassName}`}
              >
                {isPaymentSuccess ? "Payment confirmed" : "Payment verification failed"}
              </span>

              <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <h1 className="text-3xl font-semibold tracking-tight text-base-content sm:text-4xl">
                    {isPaymentSuccess
                      ? "Your payment was successful"
                      : "We could not verify this payment"}
                  </h1>
                  <p className="mt-4 text-sm leading-7 text-base-content/68 sm:text-base">
                    {isPaymentSuccess
                      ? "Your order is now ready to continue through the chef workflow. The next useful place is My Orders, where you can follow every update."
                      : "The payment page did not finish cleanly. Return to My Orders to check the payment state before trying again."}
                  </p>
                </div>

                <div
                  className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-full border ${statusPanelClassName}`}
                >
                  <StatusIcon
                    className={`h-12 w-12 ${isPaymentSuccess ? "text-success" : "text-error"}`}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-8 sm:p-10 lg:grid-cols-[1.05fr_0.95fr]">
              <article className="rounded-[1.5rem] border border-base-300 bg-base-200/40 p-5">
                <h2 className="text-xl font-semibold tracking-tight text-base-content">
                  Payment summary
                </h2>

                <div className="mt-5 space-y-4">
                  <div className="flex items-start justify-between gap-4 border-b border-base-300/70 pb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45">
                        Meal
                      </p>
                      <p className="mt-2 text-base font-medium text-base-content">
                        {paymentInfo.mealName || "Your selected meal"}
                      </p>
                    </div>
                    <HiOutlineCreditCard className="h-5 w-5 shrink-0 text-primary" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45">
                        Order id
                      </p>
                      <p className="mt-2 break-all text-sm text-base-content/75">
                        {paymentInfo.orderId || "Unavailable"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45">
                        Payment time
                      </p>
                      <p className="mt-2 text-sm text-base-content/75">
                        {formatPaymentTime(paymentInfo.paymentTime)}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45">
                        Payment status
                      </p>
                      <p className="mt-2 text-sm font-medium capitalize text-base-content">
                        {paymentInfo.paymentStatus || paymentInfo.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-base-content/45">
                        Order status
                      </p>
                      <p className="mt-2 text-sm font-medium capitalize text-base-content">
                        {paymentInfo.orderStatus || "Waiting for update"}
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              <article className="rounded-[1.5rem] border border-base-300 bg-base-100 p-5">
                <h2 className="text-xl font-semibold tracking-tight text-base-content">
                  What happens next
                </h2>

                <div className="mt-5 space-y-4">
                  <div className="flex gap-3 rounded-[1.25rem] border border-base-300/70 bg-base-200/35 p-4">
                    <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    <div>
                      <p className="font-medium text-base-content">Payment is recorded</p>
                      <p className="mt-1 text-sm leading-7 text-base-content/68">
                        Your order now shows paid inside the dashboard.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 rounded-[1.25rem] border border-base-300/70 bg-base-200/35 p-4">
                    <HiOutlineTruck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-base-content">The chef can continue</p>
                      <p className="mt-1 text-sm leading-7 text-base-content/68">
                        Once the chef is ready, they can move the order toward delivery.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 rounded-[1.25rem] border border-base-300/70 bg-base-200/35 p-4">
                    <HiOutlineClock className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                    <div>
                      <p className="font-medium text-base-content">Track updates from My Orders</p>
                      <p className="mt-1 text-sm leading-7 text-base-content/68">
                        You will see accepted, paid, and delivered progress there.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            <div className="flex flex-col gap-3 border-t border-base-300 bg-base-100 px-8 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
              <p className="text-sm leading-7 text-base-content/60">
                {isPaymentSuccess
                  ? "The best next step is to follow the order from your dashboard."
                  : "If the payment still looks wrong, check the order page before trying again."}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/dashboard/my-orders" className="btn btn-primary rounded-full px-6">
                  Track my order
                </Link>
                <Link
                  to="/dashboard"
                  className="btn btn-ghost rounded-full border border-base-300 bg-base-100 px-6"
                >
                  Go to dashboard
                </Link>
                <Link
                  to={isPaymentSuccess ? "/all-meals" : "/contact"}
                  className="btn btn-ghost rounded-full border border-base-300 bg-base-100 px-6"
                >
                  {isPaymentSuccess ? "Browse meals" : "Contact support"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PaymentSuccess;
