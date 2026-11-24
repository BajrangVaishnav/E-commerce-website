import React from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiPackage, FiShoppingBag } from "react-icons/fi";
import sideImage from "../imeges/About_Side_ Image.png";

const demoFeatures = [
  {
    icon: <FiShoppingBag />,
    title: "Browse the edit",
    description: "Explore a curated sample catalog with category filters and product details.",
  },
  {
    icon: <FiHeart />,
    title: "Save your favorites",
    description: "Keep a wishlist in this browser tab while you explore.",
  },
  {
    icon: <FiPackage />,
    title: "Try the full flow",
    description: "Add sample items to your cart and place a simulated demo order.",
  },
];

export default function About() {
  return (
    <main className="mx-[5%] mb-24 mt-10 lg:mx-auto lg:max-w-7xl">
      <nav aria-label="Breadcrumb" className="mb-10 flex gap-3 text-sm text-gray-500">
        <Link to="/">Home</Link><span>/</span><span className="text-gray-900">About this demo</span>
      </nav>
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">A storefront prototype</p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Thoughtful shopping, built for the browser.</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-gray-600">
            E-Com is an open-source frontend demo for exploring a product storefront. Search, product pages, wishlist, cart, sign-in, and checkout run locally with sample data.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500">
            There is no live inventory, account service, order fulfillment, or payment processing behind this project.
          </p>
          <Link to="/Product" className="mt-7 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white">Explore the catalog</Link>
        </div>
        <img src={sideImage} alt="Sample storefront campaign" className="max-h-[480px] w-full rounded-3xl bg-[#f5f3ee] object-cover" />
      </section>
      <section className="mt-16 grid gap-5 md:grid-cols-3">
        {demoFeatures.map(({ icon, title, description }) => (
          <article key={title} className="page-surface p-6">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-orange-50 text-xl text-primary">{icon}</div>
            <h2 className="mt-5 text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
