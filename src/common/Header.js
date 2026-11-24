import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiHeart, FiMenu, FiSearch, FiShoppingBag, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { TbLogout2 } from "react-icons/tb";
import { toast } from "react-toastify";
import { demoProducts } from "../data/demoProducts";
import { getAvatarUrl } from "../utils/avatar";
import { endSession, getCart, getSessionUser } from "../utils/mockStore";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/Product", label: "Shop" },
  { to: "/about", label: "Our story" },
  { to: "/contact", label: "Contact" },
];

const searchDemoProducts = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return demoProducts.filter((product) =>
    [product.name, product.category, product.description]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(term))
  );
};

export default function Header() {
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [user, setUser] = useState(getSessionUser);
  const [cartCount, setCartCount] = useState(() => getCart().reduce((count, item) => count + item.quantity, 0));
  const location = useLocation();
  const navigate = useNavigate();
  const userDetails = user;

  useEffect(() => {
    setUser(getSessionUser());
    setCartCount(getCart().reduce((count, item) => count + item.quantity, 0));
    setAccountOpen(false);
    setMobileOpen(false);
    setMobileSearchOpen(false);
    setSearchResults(null);
  }, [location]);

  useEffect(() => {
    const sync = () => {
      setUser(getSessionUser());
      setCartCount(getCart().reduce((count, item) => count + item.quantity, 0));
    };
    window.addEventListener("ecom:store-change", sync);
    return () => window.removeEventListener("ecom:store-change", sync);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = query.trim();
    if (!searchTerm) return;

    setSearchResults(searchDemoProducts(searchTerm));
  };

  const handleLogout = () => {
    endSession();
    setUser(null);
    setCartCount(0);
    toast.success("You have been signed out of this tab.");
    navigate("/");
  };

  const renderSearchResults = () => {
    if (searchResults === null) return null;
    return (
      <div className="search-results">
        {searchResults.length ? (
          searchResults.slice(0, 5).map((item) => (
            <NavLink key={item.id || item._id || item.product_id} to={`/productDetail/${item.id || item._id || item.product_id}`}>
              {item.productName || item.name || "View product"}
            </NavLink>
          ))
        ) : (
          <p className="px-3 py-2 text-sm text-gray-500">No products found. Try another search.</p>
        )}
      </div>
    );
  };

  const searchForm = (mobile = false) => (
    <form onSubmit={handleSearch} className={`site-search ${mobile ? "w-full" : ""}`}>
      <input
        aria-label="Search products"
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setSearchResults(null);
        }}
        placeholder="Search products"
      />
      <button type="submit" aria-label="Submit search" className="text-gray-500 hover:text-primary">
        <FiSearch />
      </button>
      {renderSearchResults()}
    </form>
  );

  return (
    <>
      <NavLink to="/Product" className="site-promo" aria-label="Discover the edit">
        A little something for your everyday. <span className="ml-1 font-semibold">Discover the edit →</span>
      </NavLink>
      <header className="site-header">
        <div className="site-header-inner">
          <NavLink to="/" className="site-brand" aria-label="E-Com home">
            E<span>.</span>COM
          </NavLink>

          <nav className="site-nav" aria-label="Main navigation">
            {links.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={({ isActive }) => (isActive ? "active" : "")}>
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="site-actions">
            <div className="desktop-search relative">{searchForm()}</div>
            <button
              type="button"
              className="icon-action mobile-only-action"
              aria-label="Open search"
              aria-expanded={mobileSearchOpen}
              onClick={() => setMobileSearchOpen((open) => !open)}
            >
              <FiSearch />
            </button>
            <NavLink to="/wishlist" className="icon-action hidden sm:inline-flex" aria-label="Wishlist">
              <FiHeart />
            </NavLink>
            <NavLink
              to="/cart"
              className="icon-action"
              aria-label="Shopping cart"
            >
              <FiShoppingCart />
              {!!cartCount && <span className="cart-count">{cartCount}</span>}
            </NavLink>
            <div className="relative">
              <button
                type="button"
                className="icon-action"
                aria-label="Account menu"
                aria-expanded={accountOpen}
                onClick={() => setAccountOpen((open) => !open)}
              >
                {user?.email ? <img src={getAvatarUrl(user.email)} alt="" className="h-8 w-8 rounded-full" /> : <FiUser />}
              </button>
              {accountOpen && (
                <div className="account-menu">
                  <NavLink to={user ? "/account" : "/login"}>
                    <FiUser /> {userDetails?.name ? `Hi, ${userDetails.name}` : "My account"}
                  </NavLink>
                  <NavLink to="/cart">
                    <FiShoppingBag /> My orders
                  </NavLink>
                  <NavLink to="/wishlist">
                    <FiHeart /> Wishlist
                  </NavLink>
                  {user ? (
                    <button type="button" onClick={handleLogout}>
                      <TbLogout2 /> Log out
                    </button>
                  ) : (
                    <NavLink to="/signup">
                      <FiUser /> Create an account
                    </NavLink>
                  )}
                </div>
              )}
            </div>
            <button
              type="button"
              className="icon-action mobile-only-action"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {links.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end}>{label}</NavLink>
            ))}
            <NavLink to="/wishlist">Wishlist</NavLink>
            {!user ? <NavLink to="/login">Log in</NavLink> : <button type="button" onClick={handleLogout}>Log out</button>}
          </nav>
        )}
        {mobileSearchOpen && <div className="mobile-search-panel">{searchForm(true)}</div>}
      </header>
    </>
  );
}
