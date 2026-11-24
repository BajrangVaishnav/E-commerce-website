import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart, getCart, saveOrder } from "../utils/mockStore";

const money = (amount) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

export default function Checkout() {
  const navigate = useNavigate();
  const [cart] = useState(getCart);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [error, setError] = useState("");
  const subtotal = cart.reduce((sum, item) => sum + item.discount_price * item.quantity, 0);

  const placeOrder = (event) => {
    event.preventDefault();
    setError("");
    if (!cart.length) {
      setError("Your cart is empty. Add a product before checking out.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const phone = String(formData.get("phone") || "").replace(/\D/g, "");
    if (phone.length < 10 || phone.length > 15) {
      setError("Enter a valid phone number (10–15 digits).");
      return;
    }
    const postalCode = String(formData.get("postalCode") || "").trim();
    if (postalCode.length < 4 || postalCode.length > 10) {
      setError("Enter a valid postal code (4–10 characters).");
      return;
    }

    const checkout = {
      customer: Object.fromEntries(
        [...formData.entries()].filter(([name]) => name !== "payment")
      ),
      items: cart,
      total: subtotal,
    };

    if (paymentMethod === "online") {
      navigate("/payment", { state: { checkout } });
      return;
    }

    saveOrder({ ...checkout, paymentMethod });
    clearCart();
    toast.success("Demo order placed. No payment was taken.");
    navigate("/account", { replace: true });
  };

  if (!cart.length) {
    return (
      <main className="mx-[5%] my-16 lg:mx-auto lg:max-w-3xl">
        <div className="page-surface p-12 text-center">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-sm text-gray-500">Add some products before heading to checkout.</p>
          <Link to="/Product" className="mt-6 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white">Browse products</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-[5%] mb-24 mt-12 lg:mx-auto lg:max-w-7xl">
      <nav aria-label="Breadcrumb" className="mb-9 text-sm text-gray-500"><Link to="/">Home</Link><span className="mx-3">/</span><Link to="/cart">Cart</Link><span className="mx-3">/</span><span className="text-gray-900">Checkout</span></nav>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Almost yours</p>
      <h1 className="mb-8 text-3xl font-bold sm:text-4xl">Checkout</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_390px]">
        <form id="checkout-form" onSubmit={placeOrder} className="page-surface grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
          <label className="grid gap-2 text-sm font-medium">Full name<input name="name" autoComplete="name" required minLength={2} className="auth-input" placeholder="Your name" /></label>
          <label className="grid gap-2 text-sm font-medium">Email address<input name="email" type="email" autoComplete="email" required className="auth-input" placeholder="you@example.com" /></label>
          <label className="grid gap-2 text-sm font-medium">Phone number<input name="phone" type="tel" autoComplete="tel" required className="auth-input" placeholder="10-digit phone number" /></label>
          <label className="grid gap-2 text-sm font-medium sm:col-span-2">Street address<input name="address" autoComplete="street-address" required minLength={5} className="auth-input" placeholder="House number and street" /></label>
          <label className="grid gap-2 text-sm font-medium">City<input name="city" autoComplete="address-level2" required className="auth-input" placeholder="City" /></label>
          <label className="grid gap-2 text-sm font-medium">Postal code<input name="postalCode" autoComplete="postal-code" required minLength={4} maxLength={10} className="auth-input" placeholder="Postal code" /></label>
          <fieldset className="grid gap-3 sm:col-span-2">
            <legend className="text-sm font-semibold">Payment method</legend>
            <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 text-sm">
              <input type="radio" name="payment" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
              Cash on delivery <span className="ml-auto text-xs text-gray-400">Demo only</span>
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 text-sm">
              <input type="radio" name="payment" checked={paymentMethod === "bank"} onChange={() => setPaymentMethod("bank")} />
              Bank transfer <span className="ml-auto text-xs text-gray-400">Simulated</span>
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 text-sm">
              <input type="radio" name="payment" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} />
              Pay online <span className="ml-auto text-xs text-gray-400">Razorpay demo</span>
            </label>
          </fieldset>
          {error && <p role="alert" className="text-sm text-red-600 sm:col-span-2">{error}</p>}
        </form>

        <aside className="page-surface h-fit p-6">
          <h2 className="text-xl font-bold">Order summary</h2>
          <div className="mt-5 grid gap-4 border-b border-gray-100 pb-5">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 text-sm">
                <span className="flex min-w-0 items-center gap-3"><img src={item.image[0]} alt="" className="h-12 w-12 rounded-lg bg-gray-50 object-contain" /><span className="truncate">{item.name} <span className="text-gray-400">× {item.quantity}</span></span></span>
                <span className="shrink-0">{money(item.discount_price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-b border-gray-100 py-4 text-sm"><span className="text-gray-500">Shipping</span><span className="text-emerald-700">Free</span></div>
          <div className="flex justify-between py-4 font-bold"><span>Total</span><span>{money(subtotal)}</span></div>
          <button form="checkout-form" type="submit" className="mt-3 h-12 w-full rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-[#d36464]">
            {paymentMethod === "online" ? "Continue to demo payment" : "Place demo order"}
          </button>
          <p className="mt-4 text-center text-xs leading-5 text-gray-400">Demo only. No real payment details are collected or transmitted.</p>
        </aside>
      </div>
    </main>
  );
}
