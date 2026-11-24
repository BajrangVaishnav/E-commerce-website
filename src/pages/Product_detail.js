import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TiStarFullOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import truck from "../imeges/icon-delivery.png";
import resend from "../imeges/Icon-return.png";
import { demoProducts } from "../data/demoProducts";
import addProductToCart from "../utils/addProductToCart";
import getProductImages from "../utils/productImages";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const sampleProduct = demoProducts.find((item) => item.id === id);
    setProduct(sampleProduct || null);
    setMainImage(sampleProduct?.image?.[0] || "");
    setLoading(false);
    setError(sampleProduct ? "" : "Product not found.");
  }, [id]);

  const changeQuantity = (amount) => {
    setQuantity((current) => Math.max(1, Math.min(10, current + amount)));
  };

  const addToCart = () => {
    if (product.sizes?.length && !selectedSize) {
      toast.info("Choose a size before adding this item to your cart.");
      return;
    }
    addProductToCart(product.id || product._id, quantity);
  };

  if (loading) {
    return (
      <div role="status" className="page-surface mx-[5%] my-16 p-10 text-center text-gray-500 lg:mx-auto lg:max-w-7xl">
        Loading product details…
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page-surface mx-[5%] my-16 p-10 text-center lg:mx-auto lg:max-w-7xl">
        <p role="alert" className="text-gray-600">{error || "Product not found."}</p>
        <Link to="/Product" className="mt-5 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white">
          Browse products
        </Link>
      </div>
    );
  }

  const images = product.image?.length ? product.image : getProductImages(product);
  const price = Number(product.discount_price ?? product.selling_price ?? product.price ?? 0);
  const originalPrice = Number(product.price ?? product.mrp ?? 0);

  return (
    <main className="product-detail-page mx-[5%] my-12 lg:mx-auto lg:max-w-7xl">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/Product">Shop</Link>
        <span>/</span>
        <span className="text-gray-900">{product.name || product.productName}</span>
      </nav>

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-14">
        <section className="grid gap-4 sm:grid-cols-[88px_1fr]">
          <div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:flex-col">
            {images.map((image, index) => (
              <button
                type="button"
                key={image}
                aria-label={`View product image ${index + 1}`}
                onClick={() => setMainImage(image)}
                className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-white p-2 ${
                  mainImage === image ? "border-primary" : "border-gray-200"
                }`}
              >
                <img src={image} alt="" className="h-full w-full object-contain" />
              </button>
            ))}
          </div>
          <div className="order-1 flex min-h-[330px] items-center justify-center overflow-hidden rounded-2xl bg-[#f5f3ee] p-6 sm:order-2 sm:min-h-[500px]">
            {mainImage && (
              <img src={mainImage} alt={product.name || product.productName} className="max-h-[460px] w-full object-contain mix-blend-multiply" />
            )}
          </div>
        </section>

        <section className="py-2">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{product.category || "Everyday collection"}</p>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">{product.name || product.productName}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <TiStarFullOutline key={star} className={`text-lg ${star <= Math.round(product.rating || 5) ? "text-amber-500" : "text-gray-300"}`} />
            ))}
            <span className="ml-1 text-sm text-gray-500">{product.rating || "New"} rating</span>
            <span className="ml-2 border-l border-gray-200 pl-3 text-sm text-emerald-700">Sample item</span>
          </div>
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl font-semibold">₹{price.toFixed(2)}</span>
            {originalPrice > price && (
              <span className="text-sm text-gray-400 line-through">₹{originalPrice.toFixed(2)}</span>
            )}
          </div>
          <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600">{product.description}</p>

          {product.sizes?.length > 0 && (
            <label className="mt-7 grid max-w-xs gap-2 text-sm font-medium">
              Choose a size
              <select value={selectedSize} onChange={(event) => setSelectedSize(event.target.value)} className="h-12 px-4">
                <option value="">Select size</option>
                {product.sizes.map((size) => <option key={size} value={size}>{size}</option>)}
              </select>
            </label>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="flex h-12 items-center overflow-hidden rounded-lg border border-gray-200">
                <button type="button" aria-label="Decrease quantity" onClick={() => changeQuantity(-1)} className="h-full w-11 hover:bg-gray-50">−</button>
                <span className="min-w-10 text-center text-sm">{quantity}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => changeQuantity(1)} className="h-full w-11 hover:bg-gray-50">+</button>
              </div>
              <button type="button" onClick={addToCart} className="h-12 rounded-lg bg-primary px-7 text-sm font-semibold text-white">
                Add to cart
              </button>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200">
            <div className="flex items-center gap-4 p-5">
              <img src={truck} alt="" className="h-9 w-9" />
              <div>
                <h2 className="text-sm font-semibold">Delivery, made simple</h2>
                <p className="mt-1 text-xs text-gray-500">Demo items are not shipped.</p>
              </div>
            </div>
            <div className="border-t border-gray-200" />
            <div className="flex items-center gap-4 p-5">
              <img src={resend} alt="" className="h-9 w-9" />
              <div>
                <h2 className="text-sm font-semibold">Easy returns</h2>
                <p className="mt-1 text-xs text-gray-500">This demo does not create real purchases.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
