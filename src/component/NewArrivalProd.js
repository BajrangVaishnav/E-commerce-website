import React from "react";
import { Link } from "react-router-dom";

const collections = [
  {
    title: "Sound for your space",
    description: "Thoughtful audio for everyday listening.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
    category: "headphones",
    className: "collection-featured",
  },
  {
    title: "The daily essentials",
    description: "Good design, made to be lived in.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85",
    category: "accessories",
    className: "collection-wide",
  },
  {
    title: "Keep it close",
    description: "Little things that go everywhere.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=85",
    category: "accessories",
    className: "collection-small",
  },
  {
    title: "Make time to unwind",
    description: "A softer start to the day.",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=85",
    category: "home",
    className: "collection-small",
  },
];

export default function NewArrivalProd() {
  return (
    <div className="collection-grid mt-10">
      {collections.map((collection) => (
        <Link
          key={collection.title}
          to={`/Product?category=${collection.category}`}
          className={`collection-tile ${collection.className}`}
          style={{ backgroundImage: `url("${collection.image}")` }}
        >
          <span className="collection-copy">
            <span className="block text-xl font-semibold">{collection.title}</span>
            <span className="mt-2 block text-sm text-white/80">{collection.description}</span>
            <span className="mt-4 inline-flex border-b border-white/80 pb-1 text-sm font-semibold">
              Explore collection
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
