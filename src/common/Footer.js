import React from "react";
import { Link } from "react-router-dom";
import { FiGithub } from "react-icons/fi";
import { toast } from "react-toastify";
import { submitDemoSubscription } from "../utils/mockStore";

const subscribe = (event) => {
  event.preventDefault();
  const email = new FormData(event.currentTarget).get("email");
  submitDemoSubscription(String(email || ""));
  event.currentTarget.reset();
  toast.success("Saved in this tab only. No email was sent.");
};

const FooterLinks = ({ title, links }) => (
  <div>
    <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-white">{title}</h3>
    <ul className="space-y-3 text-sm">
      {links.map(({ label, to }) => (
        <li key={label}><Link to={to}>{label}</Link></li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <Link to="/" className="site-brand text-white">E<span>.</span>COM</Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-gray-300">
            Sample products and a browser-only shopping flow for a frontend demo.
          </p>
          <form className="mt-5 flex max-w-xs gap-2" onSubmit={subscribe}>
            <input
              type="email"
              name="email"
              aria-label="Email address for updates"
              placeholder="Your email address"
              required
              maxLength={254}
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder:text-gray-400"
            />
            <button type="submit" aria-label="Subscribe" className="rounded-lg bg-primary px-3 text-white hover:bg-orange-700">
              →
            </button>
          </form>
        </div>

        <FooterLinks title="Explore" links={[
          { label: "Shop all", to: "/Product" },
          { label: "Our story", to: "/about" },
          { label: "Contact", to: "/contact" },
          { label: "FAQs", to: "/faq" },
        ]} />
        <FooterLinks title="Your account" links={[
          { label: "My account", to: "/account" },
          { label: "Wishlist", to: "/wishlist" },
          { label: "Cart", to: "/cart" },
          { label: "Sign in", to: "/login" },
        ]} />
        <FooterLinks title="Helpful info" links={[
          { label: "Privacy policy", to: "/privacy" },
          { label: "Terms of use", to: "/terms" },
          { label: "Get in touch", to: "/contact" },
        ]} />
        <div>
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-white">Say hello</h3>
          <Link to="/contact" className="text-sm">Send a demo message</Link>
          <p className="mt-3 text-sm text-gray-300">Forms are local demos; no messages are sent.</p>
          <a
            href="https://github.com/BajrangVaishnav"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm"
          >
            My GitHub <FiGithub aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-5 text-center text-xs text-gray-400 sm:text-left">
        © {new Date().getFullYear()} E-Com. All rights reserved.
      </div>
    </footer>
  );
}
