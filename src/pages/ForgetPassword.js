import React from "react";
import { Link } from "react-router-dom";
import sideimg from "../imeges/Side Image.png";
import { demoCredentials } from "../utils/mockStore";

export default function ForgetPassword() {
  return (
    <section className="auth-page">
      <img src={sideimg} alt="" className="auth-artwork" />
      <div className="auth-card">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Sign-in help</p>
        <h1 className="text-3xl font-bold">Password reset</h1>
        <p className="mt-4 text-sm leading-6 text-gray-600">
          This frontend demo does not send emails or store passwords. Use the sample account shown on the login screen:
        </p>
        <div className="demo-credentials mt-6">
          <strong>Demo account</strong>
          <span>Email: {demoCredentials.email}</span>
          <span>Password: {demoCredentials.password}</span>
        </div>
        <Link to="/login" className="auth-submit mt-7 flex items-center justify-center">Back to login</Link>
      </div>
    </section>
  );
}
