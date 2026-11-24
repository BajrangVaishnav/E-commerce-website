import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./common/Footer";
import Header from "./common/Header";
import HelpChat from "./component/HelpChat";
import ProductCard from "./component/ProductCard";
import {
  addToCart,
  demoCredentials,
  endSession,
  getCart,
  getOrders,
  getSessionUser,
  startSession,
} from "./utils/mockStore";
import { getAvatarUrl } from "./utils/avatar";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import PaymentDemo, { PaymentResult } from "./pages/PaymentDemo";
import {
  categoryCollections,
  demoProducts,
  featuredCategoryCollections,
  filterProductsByCategory,
} from "./data/demoProducts";

beforeEach(() => {
  sessionStorage.clear();
});

function CurrentPath() {
  const location = useLocation();
  return <span data-testid="current-path">{location.pathname}</span>;
}

test("demo products can be added to the tab-scoped cart", () => {
  const product = demoProducts[0];

  render(
    <MemoryRouter>
      <ProductCard product={product} onAddToCart={addToCart} />
    </MemoryRouter>
  );

  expect(screen.getByText(product.name)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Add to cart" }));
  expect(getCart()).toEqual([expect.objectContaining({ id: product.id, quantity: 1 })]);
  expect(screen.getByRole("img", { name: product.name })).toHaveAttribute(
    "src",
    product.image[0]
  );
});

test("demo session can be resumed in-tab and cleared on sign out", () => {
  const user = startSession({ email: demoCredentials.email, name: "Demo Customer" });
  expect(getSessionUser()).toEqual(user);
  expect(sessionStorage.getItem("user")).toBeNull();

  addToCart(demoProducts[0].id);
  endSession();
  expect(getSessionUser()).toBeNull();
  expect(getCart()).toEqual([]);
});

test("avatar URL safely encodes the account email as its DiceBear seed", () => {
  expect(getAvatarUrl("demo+tag@example.com")).toBe(
    "https://api.dicebear.com/7.x/avataaars/png?seed=demo%2Btag%40example.com"
  );
});

test("login form starts with demo credentials and no separate credentials card", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  expect(screen.getByLabelText("Email address")).toHaveValue(demoCredentials.email);
  expect(screen.getByPlaceholderText("Enter your password")).toHaveValue(demoCredentials.password);
  expect(screen.queryByLabelText("Demo login credentials")).not.toBeInTheDocument();
});

test("promo banner navigates to the product catalog", () => {
  render(
    <MemoryRouter>
      <Header />
      <CurrentPath />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole("link", { name: "Discover the edit" }));
  expect(screen.getByTestId("current-path")).toHaveTextContent("/Product");
});

test("help assistant answers common questions using the local FAQ data", () => {
  render(<HelpChat />);

  fireEvent.click(screen.getByRole("button", { name: "Open help chat" }));
  fireEvent.click(screen.getByRole("button", { name: "Which payment methods can I use?" }));

  expect(
    screen.getByText(/Choose the Razorpay demo option to simulate a successful or failed payment/)
  ).toBeInTheDocument();
});

test("footer links to the maintainer GitHub profile", () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  const githubLink = screen.getByRole("link", { name: "My GitHub" });
  expect(githubLink).toHaveAttribute("href", "https://github.com/BajrangVaishnav");
  expect(githubLink).toHaveAttribute("target", "_blank");
  expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
});

test("online checkout opens the demo payment page without placing the order", () => {
  addToCart(demoProducts[0].id);

  render(
    <MemoryRouter initialEntries={["/checkout"]}>
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<h1>Choose a payment method</h1>} />
      </Routes>
      <CurrentPath />
    </MemoryRouter>
  );

  [
    ["Full name", "Demo Customer"],
    ["Email address", "demo@example.com"],
    ["Phone number", "1234567890"],
    ["Street address", "100 Demo Street"],
    ["City", "Demo City"],
    ["Postal code", "12345"],
  ].forEach(([label, value]) => {
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
  });
  fireEvent.click(screen.getByRole("radio", { name: /Pay online/ }));
  fireEvent.click(screen.getByRole("button", { name: "Continue to demo payment" }));

  expect(screen.getByRole("heading", { name: "Choose a payment method" })).toBeInTheDocument();
  expect(getCart()).toHaveLength(1);
  expect(getOrders()).toEqual([]);
});

test("demo payment success records the order and clears the cart", () => {
  const product = demoProducts[0];
  const cart = addToCart(product.id);
  const checkout = {
    customer: { name: "Demo Customer" },
    items: cart,
    total: product.discount_price,
  };

  render(
    <MemoryRouter initialEntries={[{ pathname: "/payment", state: { checkout } }]}>
      <Routes>
        <Route path="/payment" element={<PaymentDemo />} />
        <Route path="/payment/result/:status" element={<PaymentResult />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole("button", { name: "Simulate successful payment" }));

  expect(screen.getByRole("heading", { name: "Payment successful" })).toBeInTheDocument();
  expect(getCart()).toEqual([]);
  expect(getOrders()).toEqual([
    expect.objectContaining({ paymentMethod: "razorpay-demo-upi", paymentStatus: "paid" }),
  ]);
});

test("demo payment failure leaves the cart intact and creates no order", () => {
  const product = demoProducts[0];
  const cart = addToCart(product.id);
  const checkout = {
    customer: { name: "Demo Customer" },
    items: cart,
    total: product.discount_price,
  };

  render(
    <MemoryRouter initialEntries={[{ pathname: "/payment", state: { checkout } }]}>
      <Routes>
        <Route path="/payment" element={<PaymentDemo />} />
        <Route path="/payment/result/:status" element={<PaymentResult />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole("button", { name: "Simulate payment failure" }));

  expect(screen.getByRole("heading", { name: "Payment failed" })).toBeInTheDocument();
  expect(getCart()).toHaveLength(1);
  expect(getOrders()).toEqual([]);
});

test("each collection filters to matching sample products", () => {
  featuredCategoryCollections.forEach((category) => {
    expect(filterProductsByCategory(demoProducts, category.slug)).toHaveLength(4);
  });

  categoryCollections.forEach((category) => {
    const products = filterProductsByCategory(demoProducts, category.slug);

    expect(products.length).toBeGreaterThanOrEqual(3);
    expect(
      products.every(
        (product) =>
          product.category.toLowerCase().replace(/[^a-z0-9]/g, "") ===
          category.name.toLowerCase().replace(/[^a-z0-9]/g, "")
      )
    ).toBe(true);
  });

  expect(filterProductsByCategory(demoProducts, "unknown")).toEqual([]);
});
