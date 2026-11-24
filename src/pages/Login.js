import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import sideimg from "../imeges/Side Image.png";
import { toast } from "react-toastify";
import { demoCredentials, getSessionUser, startSession } from "../utils/mockStore";

export default function Login() {
  const [email, setEmail] = useState(demoCredentials.email);
  const [password, setPassword] = useState(demoCredentials.password);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  if (getSessionUser()) {
    return <Navigate to="/" replace />;
  }

  const submit = (event) => {
    event.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Enter your password.");
      return;
    }
    if (
      email.trim().toLowerCase() !== demoCredentials.email ||
      password !== demoCredentials.password
    ) {
      setError("Those credentials don't match the demo account.");
      return;
    }

    startSession({ email: demoCredentials.email, name: "Demo Customer" });
    toast.success("You’re signed in for this tab.");
    navigate(location.state?.from || "/", { replace: true });
  };

  return (
    <section className="auth-page">
      <img src={sideimg} alt="" className="auth-artwork" />
      <div className="auth-card">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Welcome back</p>
        <h1 className="text-3xl font-bold sm:text-4xl">Log in to E-Com</h1>
        <p className="mt-3 text-sm text-gray-500">Demo credentials are filled in for you.</p>

        <form onSubmit={submit} className="mt-6 grid gap-4" noValidate>
          <label className="grid gap-2 text-sm font-medium">
            Email address
            <input
              type="email"
              name="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="auth-input"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Password
            <span className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="auth-input pr-12"
                required
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500"
              >
                {showPassword ? <PiEyeClosed /> : <PiEye />}
              </button>
            </span>
          </label>
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="auth-submit">Log in</button>
        </form>

        <p className="mt-4 text-center text-sm">
          <Link to="/forgetpwd" className="font-medium text-primary">Need help signing in?</Link>
        </p>
        <p className="mt-6 text-center text-sm text-gray-600">
          New here? <Link to="/signup" className="font-semibold text-primary">Create a demo account</Link>
        </p>
        <p className="mt-5 text-center text-xs leading-5 text-gray-400">
          Demo only — this sign-in does not protect real accounts or data.
        </p>
      </div>
    </section>
  );
}
