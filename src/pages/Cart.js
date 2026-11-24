import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../utils/mockStore";

const money = (amount) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

export default function Cart() {
  const [items, setItems] = useState(getCart);

  useEffect(() => {
    const sync = () => setItems(getCart());
    window.addEventListener("ecom:store-change", sync);
    return () => window.removeEventListener("ecom:store-change", sync);
  }, []);

  const setQuantity = (id, quantity) => setItems(updateCartQuantity(id, quantity));
  const remove = (id) => {
    setItems(removeFromCart(id));
    toast.info("Item removed from your cart.");
  };
  const subtotal = items.reduce((sum, item) => sum + item.discount_price * item.quantity, 0);

  return (
    <main className="mx-[5%] mb-24 mt-12 lg:mx-auto lg:max-w-7xl">
      <nav aria-label="Breadcrumb" className="mb-9 text-sm text-gray-500">
        <Link to="/">Home</Link><span className="mx-3">/</span><span className="text-gray-900">Your cart</span>
      </nav>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Your picks</p>
          <h1 className="text-3xl font-bold sm:text-4xl">Shopping cart</h1>
        </div>
        <Link to="/Product" className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Continue shopping</Link>
      </div>

      {items.length ? (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="grid content-start gap-3">
            {items.map((item) => (
              <article key={item.id} className="cart-item">
                <Link to={`/productDetail/${item.id}`} className="cart-item-image">
                  <img src={item.image[0]} alt={item.name} />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link to={`/productDetail/${item.id}`} className="font-semibold hover:text-primary">{item.name}</Link>
                  <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                  <p className="mt-2 font-semibold">{money(item.discount_price)}</p>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-2 py-1">
                  <button type="button" aria-label={`Decrease ${item.name} quantity`} disabled={item.quantity <= 1} onClick={() => setQuantity(item.id, item.quantity - 1)} className="h-8 w-7 disabled:opacity-40">−</button>
                  <span className="min-w-5 text-center text-sm">{item.quantity}</span>
                  <button type="button" aria-label={`Increase ${item.name} quantity`} disabled={item.quantity >= 10} onClick={() => setQuantity(item.id, item.quantity + 1)} className="h-8 w-7 disabled:opacity-40">+</button>
                </div>
                <button type="button" aria-label={`Remove ${item.name}`} onClick={() => remove(item.id)} className="p-2 text-gray-400 hover:text-red-600"><FiTrash2 /></button>
              </article>
            ))}
          </section>
          <aside className="page-surface h-fit p-6">
            <h2 className="text-xl font-bold">Order summary</h2>
            <div className="mt-5 flex justify-between border-b border-gray-100 pb-4 text-sm">
              <span className="text-gray-500">Subtotal</span><span>{money(subtotal)}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-4 text-sm">
              <span className="text-gray-500">Shipping</span><span className="font-medium text-emerald-700">Free</span>
            </div>
            <div className="flex justify-between py-4 font-bold"><span>Total</span><span>{money(subtotal)}</span></div>
            <Link to="/checkout" state={{ subtotal }} className="mt-3 flex h-12 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-[#d36464]">Continue to checkout</Link>
            <p className="mt-4 text-center text-xs leading-5 text-gray-400">Demo checkout only. No payment will be collected.</p>
          </aside>
        </div>
      ) : (
        <div className="page-surface p-12 text-center">
          <div className="text-4xl">🛍️</div>
          <h2 className="mt-4 text-xl font-semibold">Your cart is taking a breather</h2>
          <p className="mt-2 text-sm text-gray-500">Find something you love and it will appear here.</p>
          <Link to="/Product" className="mt-6 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white">Explore the collection</Link>
        </div>
      )}
    </main>
  );
}
