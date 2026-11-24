import "./css/style.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentDemo, { PaymentResult } from "./pages/PaymentDemo";
import Account from "./component/Account";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/Product_detail";
import Header from "./common/Header";
import Footer from "./common/Footer";
import HelpChat from "./component/HelpChat";
import ScrollToTopButton from "./component/ScrollToTopButton";
import ForgetPasswort from "./pages/ForgetPassword";
import PrivatePolicy from "./pages/Private_policy";
import Term from "./pages/Term";
import Faq from "./pages/Faq";
import Product from "./component/Product";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./component/ScrollToTop";
import { getSessionUser } from "./utils/mockStore";

function AccountRoute() {
  return getSessionUser()
    ? <Account />
    : <Navigate to="/login" replace state={{ from: "/account" }} />;
}

function App() {

  return (
    <Router>
      <div className="app-shell">
      <Header />
      <ScrollToTop/>
      <main className="app-main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Product" element={<Product/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/:userId" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<PaymentDemo />} />
        <Route path="/payment/result/:status" element={<PaymentResult />} />
        <Route path="/account" element={<AccountRoute />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/forgetpwd" element={<ForgetPasswort />} />
        <Route path="/privacy" element={<PrivatePolicy/>}/>
        <Route path="terms" element={<Term/>}/>
        <Route path="/faq" element={<Faq/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </main>
      <ToastContainer position="bottom-left" autoClose={3000} />
      <ScrollToTopButton />
      <HelpChat />
      <Footer />
      </div>
    </Router>
  );
}

export default App;

