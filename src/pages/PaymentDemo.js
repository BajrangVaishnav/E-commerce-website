import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { clearCart, saveOrder } from "../utils/mockStore";

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const paymentOptions = [
  { id: "upi", label: "UPI" },
  { id: "card", label: "Card" },
  { id: "netbanking", label: "Net banking" },
];

export default function PaymentDemo() {
  const location = useLocation();
  const navigate = useNavigate();
  const checkout = location.state?.checkout;
  const [paymentOption, setPaymentOption] = useState("upi");

  if (
    !checkout ||
    !Array.isArray(checkout.items) ||
    !checkout.items.length ||
    !Number.isFinite(checkout.total)
  ) {
    return (
      <main className="mx-[5%] my-16 lg:mx-auto lg:max-w-3xl">
        <section className="page-surface p-10 text-center">
          <h1 className="text-2xl font-bold">Demo payment session not found</h1>
          <p className="mt-2 text-sm text-gray-500">Return to your cart and start checkout again.</p>
          <Link to="/cart" className="mt-6 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white">
            Return to cart
          </Link>
        </section>
      </main>
    );
  }

  const simulateSuccess = () => {
    saveOrder({
      ...checkout,
      paymentMethod: `razorpay-demo-${paymentOption}`,
      paymentStatus: "paid",
    });
    clearCart();
    navigate("/payment/result/success", {
      replace: true,
      state: { outcome: "success" },
    });
  };

  const simulateFailure = () => {
    navigate("/payment/result/failure", {
      replace: true,
      state: { outcome: "failure", checkout },
    });
  };

  return (
    <main className="mx-[5%] mb-24 mt-12 lg:mx-auto lg:max-w-5xl">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-500">
        <Link to="/">Home</Link><span className="mx-3">/</span><Link to="/cart">Cart</Link>
        <span className="mx-3">/</span><span className="text-gray-900">Demo payment</span>
      </nav>

      <section className="page-surface overflow-hidden">
        <header className="flex flex-wrap items-center justify-between gap-3 bg-[#18251f] px-6 py-5 text-white sm:px-8">
          <div>
            <p className="text-xl font-bold tracking-tight">Razorpay</p>
            <p className="mt-1 text-xs text-gray-300">Checkout preview</p>
          </div>
          <span className="rounded-full border border-white/25 px-3 py-1 text-[11px] font-semibold tracking-[0.12em]">
            DEMO MODE
          </span>
        </header>

        <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_300px]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Test payment</p>
            <h1 className="mt-2 text-2xl font-bold">Choose a payment method</h1>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              This is a local simulation. Do not enter real payment details.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3" role="group" aria-label="Demo payment method">
              {paymentOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={paymentOption === option.id}
                  onClick={() => setPaymentOption(option.id)}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    paymentOption === option.id
                      ? "border-primary bg-orange-50 text-primary"
                      : "border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-xl bg-gray-50 p-5">
              <p className="text-sm font-semibold">Choose a test outcome</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                These buttons do not contact Razorpay or move money.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={simulateSuccess}
                  className="min-h-12 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-[#d36464]"
                >
                  Simulate successful payment
                </button>
                <button
                  type="button"
                  onClick={simulateFailure}
                  className="min-h-12 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Simulate payment failure
                </button>
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-xl border border-gray-200 p-5">
            <h2 className="text-lg font-bold">Order summary</h2>
            <div className="mt-4 grid gap-3 border-b border-gray-100 pb-4">
              {checkout.items.map((item) => (
                <div key={item.id} className="flex justify-between gap-3 text-sm">
                  <span className="min-w-0 truncate text-gray-600">{item.name} × {item.quantity}</span>
                  <span className="shrink-0">{money(item.discount_price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-4 font-bold">
              <span>Total</span><span>{money(checkout.total)}</span>
            </div>
            <p className="mt-4 text-xs leading-5 text-gray-400">
              Demo only · no payment credentials are collected or sent.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}

export function PaymentResult() {
  const { status } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const checkout = location.state?.checkout;
  const isSuccess = status === "success";
  const isFailure = status === "failure";
  const hasValidResult = location.state?.outcome === status && (isSuccess || isFailure);

  if (!hasValidResult) {
    return (
      <main className="mx-[5%] my-16 lg:mx-auto lg:max-w-3xl">
        <section className="page-surface p-10 text-center">
          <h1 className="text-2xl font-bold">Payment result unavailable</h1>
          <p className="mt-2 text-sm text-gray-500">Start a new demo checkout to try a payment outcome.</p>
          <Link to="/cart" className="mt-6 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white">
            Return to cart
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-[5%] my-16 lg:mx-auto lg:max-w-2xl">
      <section className="page-surface p-8 text-center sm:p-12">
        {isSuccess ? (
          <FiCheckCircle className="mx-auto text-5xl text-emerald-600" aria-hidden="true" />
        ) : (
          <FiXCircle className="mx-auto text-5xl text-red-500" aria-hidden="true" />
        )}
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Demo payment</p>
        <h1 className="mt-2 text-3xl font-bold">
          {isSuccess ? "Payment successful" : "Payment failed"}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
          {isSuccess
            ? "The demo order was saved in this tab. No real money was charged."
            : "No order was placed and your cart is unchanged. No real payment was attempted."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {isFailure && checkout && (
            <button
              type="button"
              onClick={() => navigate("/payment", { state: { checkout } })}
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white"
            >
              Try payment again
            </button>
          )}
          <Link to={isSuccess ? "/Product" : "/cart"} className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold hover:bg-gray-50">
            {isSuccess ? "Continue shopping" : "Return to cart"}
          </Link>
        </div>
      </section>
    </main>
  );
}
