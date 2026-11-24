import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import {
  categoryCollections,
  demoProducts,
  filterProductsByCategory,
} from "../data/demoProducts";
import addProductToCart from "../utils/addProductToCart";

export default function Product() {
  const products = demoProducts;
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get("category") || "";
  const selectedCategory = categoryCollections.find(
    (category) => category.slug === categorySlug
  );
  const visibleProducts = filterProductsByCategory(products, categorySlug);

  return (
    <section className="mx-[5%] mb-20 mt-12 lg:mx-auto lg:max-w-7xl">
      <header className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          The collection
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">
          {selectedCategory ? selectedCategory.name : "Shop all products"}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {selectedCategory?.description || "Everyday essentials, thoughtfully picked."}
        </p>
      </header>

      <nav className="mb-7 flex gap-2 overflow-x-auto pb-2" aria-label="Product categories">
        <Link
          to="/Product"
          className={`category-filter ${!categorySlug ? "category-filter-active" : ""}`}
          aria-current={!categorySlug ? "page" : undefined}
        >
          All products
        </Link>
        {categoryCollections.map((category) => (
          <Link
            key={category.slug}
            to={`/Product?category=${category.slug}`}
            className={`category-filter ${
              categorySlug === category.slug ? "category-filter-active" : ""
            }`}
            aria-current={categorySlug === category.slug ? "page" : undefined}
          >
            {category.name}
          </Link>
        ))}
      </nav>

      {(
        <p className="mb-5 rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm text-orange-900">
          Demo storefront — products, cart and checkout are simulated in this tab.
        </p>
      )}

      {visibleProducts.length ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id || product._id}
              product={product}
              onAddToCart={(productId) => addProductToCart(productId)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-14 text-center">
          <h2 className="text-lg font-semibold">No products in this collection yet</h2>
          <p className="mt-2 text-sm text-gray-500">
            Try another category or browse the full sample catalog.
          </p>
          <Link
            to="/Product"
            className="mt-5 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white"
          >
            View all products
          </Link>
        </div>
      )}
    </section>
  );
}
