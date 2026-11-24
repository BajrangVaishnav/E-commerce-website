import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import sideimg from "../imeges/Side Image.png";
import { toast } from "react-toastify";
import { getSessionUser, startSession } from "../utils/mockStore";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (getSessionUser()) {
    return <Navigate to="/" replace />;
  }

  const submit = (event) => {
    event.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("Enter a name with at least 2 characters.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Use at least 8 characters for your password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    startSession({ id: `guest-${Date.now()}`, name: name.trim(), email: email.trim().toLowerCase() });
    toast.success("Your demo session is ready.");
    navigate("/", { replace: true });
  };

  return (
    <section className="auth-page">
      <img src={sideimg} alt="" className="auth-artwork" />
      <div className="auth-card">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Your next favorite is waiting</p>
        <h1 className="text-3xl font-bold sm:text-4xl">Create a demo account</h1>
        <p className="mt-3 text-sm text-gray-500">No email or password leaves this browser tab.</p>

        <form onSubmit={submit} className="mt-7 grid gap-4" noValidate>
          <label className="grid gap-2 text-sm font-medium">
            Full name
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              className="auth-input"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Email address
            <input
              type="email"
              name="email"
              autoComplete="email"
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
                name="new-password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
                className="auth-input pr-12"
                required
                minLength={8}
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
          <label className="grid gap-2 text-sm font-medium">
            Confirm password
            <input
              type="password"
              name="confirm-password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Re-enter your password"
              className="auth-input"
              required
            />
          </label>
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="auth-submit">Create account</button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="font-semibold text-primary">Log in</Link>
        </p>
        <p className="mt-5 text-center text-xs leading-5 text-gray-400">
          Demo only — your session ends when this tab closes. No password is stored.
        </p>
      </div>
    </section>
  );
}
