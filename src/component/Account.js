import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAvatarUrl } from "../utils/avatar";
import { getOrders, getProfile, getSessionUser, saveProfile } from "../utils/mockStore";

const getProfileFields = () => {
  const profile = getProfile();
  return { ...profile, mobile: profile.mobile || "", gender: profile.gender || "" };
};

export default function Account() {
  const [profile, setProfile] = useState(getProfileFields);
  const [saving, setSaving] = useState(false);
  const signedIn = Boolean(getSessionUser());
  const orders = getOrders();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  };

  const saveProfileChanges = (event) => {
    event.preventDefault();
    setSaving(true);
    saveProfile(profile);
    toast.success("Profile saved in this tab.");
    setSaving(false);
  };

  return (
    <div className="mx-[5%] mb-24 mt-10 xl:mx-auto xl:max-w-7xl md:mt-16">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-3 text-gray-500">
          <Link to="/">Home</Link><span>/</span><span className="text-gray-900">My account</span>
        </div>
        <p>Welcome back, <span className="font-semibold text-primary">{profile.name || "there"}</span></p>
      </div>

      <div className="grid gap-8 md:grid-cols-[230px_1fr]">
        <aside className="page-surface h-fit p-6">
          <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">Your account</h2>
          <nav className="flex flex-col gap-1 text-sm">
            <Link to="/account" className="rounded-lg bg-orange-50 px-3 py-2.5 font-semibold text-primary">Profile details</Link>
            <Link to="/wishlist" className="rounded-lg px-3 py-2.5 hover:bg-gray-50">Your wishlist</Link>
            <Link to="/cart" className="rounded-lg px-3 py-2.5 hover:bg-gray-50">Your cart</Link>
          </nav>
          {!signedIn && (
            <p className="mt-5 border-t border-gray-100 pt-4 text-xs leading-5 text-gray-500">
              <Link to="/login" className="font-semibold text-primary">Sign in</Link> to start a tab-scoped demo session.
            </p>
          )}
        </aside>

        <section className="page-surface p-6 sm:p-10">
          <div className="mb-8">
            <div className="flex items-center gap-4">
              {profile.email && (
                <img
                  src={getAvatarUrl(profile.email)}
                  alt=""
                  className="h-16 w-16 rounded-full border border-gray-100"
                />
              )}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Personal details</p>
                <h1 className="text-2xl font-bold sm:text-3xl">Edit your profile</h1>
                <p className="mt-2 text-sm text-gray-500">Profile changes stay in this tab.</p>
              </div>
            </div>
          </div>
          <form onSubmit={saveProfileChanges} className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium">
              Full name
              <input name="name" type="text" value={profile.name} onChange={updateField} placeholder="Your name" className="h-12 bg-gray-50 px-4" autoComplete="name" minLength={2} required />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Mobile number
              <input name="mobile" type="tel" value={profile.mobile} onChange={updateField} placeholder="Your phone number" className="h-12 bg-gray-50 px-4" autoComplete="tel" />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Email address
              <input name="email" type="email" value={profile.email} onChange={updateField} placeholder="you@example.com" className="h-12 bg-gray-50 px-4" autoComplete="email" required />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Gender
              <select name="gender" value={profile.gender} onChange={updateField} className="h-12 bg-gray-50 px-4">
                <option value="">Select an option</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <div className="mt-3 flex flex-wrap justify-end gap-3 sm:col-span-2">
              <button type="button" onClick={() => setProfile(getProfileFields())} className="h-12 rounded-lg border border-gray-200 px-6 text-sm font-semibold hover:bg-gray-50">
                Discard changes
              </button>
              <button type="submit" disabled={saving} className="h-12 rounded-lg bg-primary px-7 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-70">
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </form>
          <div className="mt-12 border-t border-gray-100 pt-8">
            <h2 className="text-xl font-bold">Demo orders</h2>
            {orders.length ? (
              <ul className="mt-4 grid gap-3">
                {orders.map((order) => (
                  <li key={order.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-gray-50 p-4 text-sm">
                    <span><strong>{order.id}</strong><span className="ml-2 text-gray-500">{order.items.length} sample item{order.items.length === 1 ? "" : "s"}</span></span>
                    <span className="font-semibold">{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(order.total)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-gray-500">No demo orders in this tab yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
