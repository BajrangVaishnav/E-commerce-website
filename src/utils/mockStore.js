import { demoProducts } from "../data/demoProducts";

const SESSION_KEY = "ecom.session";
const CART_KEY = "ecom.cart";
const WISHLIST_KEY = "ecom.wishlist";
const PROFILE_KEY = "ecom.profile";
const ORDERS_KEY = "ecom.orders";

export const demoCredentials = {
  email: "demo@ecom.com",
  password: "Demo123!",
};

const read = (key, fallback) => {
  try {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("ecom:store-change"));
};

export const getSessionUser = () => read(SESSION_KEY, null);

export const startSession = (user) => {
  const sessionUser = {
    id: user.id || "demo-customer",
    name: user.name || "Demo Customer",
    email: user.email,
  };
  write(SESSION_KEY, sessionUser);
  return sessionUser;
};

export const endSession = () => {
  [
    SESSION_KEY,
    CART_KEY,
    WISHLIST_KEY,
    PROFILE_KEY,
    ORDERS_KEY,
    "ecom.messages",
    "ecom.subscriptions",
  ].forEach((key) => sessionStorage.removeItem(key));
};

export const getProfile = () => {
  const user = getSessionUser();
  return { ...user, ...read(PROFILE_KEY, {}) };
};

export const saveProfile = (profile) => write(PROFILE_KEY, profile);

export const getCart = () => read(CART_KEY, []);

export const addToCart = (productId, quantity = 1) => {
  const product = demoProducts.find((item) => String(item.id) === String(productId));
  if (!product) throw new Error("That sample product could not be found.");

  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);
  const updated = existing
    ? cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: Math.min(10, item.quantity + quantity) }
          : item
      )
    : [...cart, { ...product, quantity: Math.min(10, quantity) }];
  write(CART_KEY, updated);
  return updated;
};

export const updateCartQuantity = (productId, quantity) => {
  const updated = getCart().map((item) =>
    item.id === productId
      ? { ...item, quantity: Math.max(1, Math.min(10, quantity)) }
      : item
  );
  write(CART_KEY, updated);
  return updated;
};

export const removeFromCart = (productId) => {
  const updated = getCart().filter((item) => item.id !== productId);
  write(CART_KEY, updated);
  return updated;
};

export const clearCart = () => write(CART_KEY, []);

export const getWishlist = () => read(WISHLIST_KEY, []);

export const toggleWishlist = (productId) => {
  const ids = getWishlist();
  const updated = ids.includes(productId)
    ? ids.filter((id) => id !== productId)
    : [...ids, productId];
  write(WISHLIST_KEY, updated);
  return updated;
};

export const saveOrder = (order) => {
  const orders = read(ORDERS_KEY, []);
  write(ORDERS_KEY, [{ ...order, id: `DEMO-${Date.now()}` }, ...orders]);
};

export const getOrders = () => read(ORDERS_KEY, []);

export const submitDemoContact = (message) => {
  const messages = read("ecom.messages", []);
  write("ecom.messages", [{ ...message, createdAt: new Date().toISOString() }, ...messages]);
};

export const submitDemoSubscription = (email) => {
  const subscriptions = read("ecom.subscriptions", []);
  const normalizedEmail = email.trim().toLowerCase();
  if (!subscriptions.includes(normalizedEmail)) {
    write("ecom.subscriptions", [...subscriptions, normalizedEmail]);
  }
};

