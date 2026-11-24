import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { demoProducts } from "../data/demoProducts";
import addProductToCart from "../utils/addProductToCart";

function TopProduct() {
  const products = demoProducts.slice(0, 4);

  return (
    <div className="flex flex-col gap-5 my-10">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">A few good picks</p>
        <h2 className="mt-3 text-3xl font-semibold">Popular right now</h2>
      </header>

      <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id || product._id}
            product={product}
            onAddToCart={(productId) => addProductToCart(productId)}
          />
        ))}
      </div>

      <div className="mt-2 text-center">
        <Link
          to="/Product"
          className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
}

export default TopProduct;
