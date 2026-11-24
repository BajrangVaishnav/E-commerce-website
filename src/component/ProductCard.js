import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { toast } from "react-toastify";
import getProductImages from "../utils/productImages";
import { getWishlist, toggleWishlist } from "../utils/mockStore";

export default function ProductCard({ product, onAddToCart }) {
  const [saved, setSaved] = useState(() => getWishlist().includes(product.id || product._id));
  const id = product.id || product._id;
  const name = product.productName || product.name || "Product";
  const price = Number(product.discount_price ?? product.selling_price ?? product.price ?? 0);
  const originalPrice = Number(product.price ?? product.mrp ?? 0);

  return (
    <article className="product-card">
      <Link to={`/productDetail/${id}`} className="product-card-image">
        <img src={getProductImages(product)[0] || ""} alt={name} loading="lazy" />
      </Link>
      <button
        type="button"
        aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
        aria-pressed={saved}
        onClick={() => {
          toggleWishlist(id);
          setSaved((current) => !current);
          toast.info(saved ? "Removed from your wishlist." : "Saved to your wishlist.");
        }}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white text-lg shadow-sm hover:text-primary"
      >
        <FiHeart className={saved ? "fill-current text-primary" : ""} />
      </button>
      <div className="product-card-info">
        <Link to={`/productDetail/${id}`} className="product-card-title">
          {name}
        </Link>
        {product.category && (
          <p className="mt-1 text-xs text-gray-500">{product.category}</p>
        )}
        <div className="product-card-prices">
          <span className="product-card-price">₹{price.toFixed(2)}</span>
          {originalPrice > price && (
            <span className="product-card-was line-through">
              ₹{originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <button
          type="button"
          className="product-card-add"
          onClick={() => onAddToCart(id)}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
