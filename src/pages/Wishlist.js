import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { demoProducts } from "../data/demoProducts";
import addProductToCart from "../utils/addProductToCart";
import { getWishlist, toggleWishlist } from "../utils/mockStore";

const money = (amount) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

export default function Wishlist() {
  const [ids, setIds] = useState(getWishlist);

  useEffect(() => {
    const sync = () => setIds(getWishlist());
    window.addEventListener("ecom:store-change", sync);
    return () => window.removeEventListener("ecom:store-change", sync);
  }, []);

  const products = ids
    .map((id) => demoProducts.find((product) => product.id === id))
    .filter(Boolean);

  const remove = (id) => {
    setIds(toggleWishlist(id));
    toast.info("Removed from your wishlist.");
  };

  return (
    <main className="mx-[5%] mb-24 mt-12 lg:mx-auto lg:max-w-7xl">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"><FiHeart /> Saved for later</p>
          <h1 className="text-3xl font-bold sm:text-4xl">Your wishlist <span className="text-lg font-medium text-gray-400">({products.length})</span></h1>
        </div>
        <Link to="/Product" className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Keep browsing</Link>
      </div>
      {products.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <Link to={`/productDetail/${product.id}`} className="product-card-image"><img src={product.image[0]} alt={product.name} /></Link>
              <div className="product-card-info">
                <Link to={`/productDetail/${product.id}`} className="product-card-title">{product.name}</Link>
                <div className="product-card-prices"><span className="product-card-price">{money(product.discount_price)}</span><span className="product-card-was line-through">{money(product.price)}</span></div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => addProductToCart(product.id)} className="product-card-add">Add to cart</button>
                  <button type="button" aria-label={`Remove ${product.name} from wishlist`} onClick={() => remove(product.id)} className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-gray-200 text-gray-500 hover:text-red-600"><FiTrash2 /></button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="page-surface p-12 text-center">
          <FiHeart className="mx-auto text-3xl text-gray-300" />
          <h2 className="mt-4 text-xl font-semibold">Nothing saved just yet</h2>
          <p className="mt-2 text-sm text-gray-500">Tap the heart on a product and it will show up here.</p>
          <Link to="/Product" className="mt-6 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white">Explore products</Link>
        </div>
      )}
    </main>
  );
}
