import React from "react";

export default function PrivatePolicy() {
  return (
    <main className="legal-page page-surface my-12 grid gap-5 p-7 sm:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Frontend demo</p>
      <h1 className="text-3xl font-bold sm:text-4xl">Privacy notes</h1>
      <p>
        E-Com is a demonstration storefront. It has no backend and does not send account, profile, cart, contact, or checkout information to a server.
      </p>
      <h2 className="text-xl font-semibold">Data stored in this tab</h2>
      <p>
        The demo uses your browser's session storage for the mock session, cart, wishlist, profile edits, sample contact messages, newsletter sign-ups, and demo orders. This data is available to scripts running on this page and is not suitable for sensitive information. It is normally cleared when the tab session ends; browser session restore behavior may vary.
      </p>
      <h2 className="text-xl font-semibold">Credentials and payments</h2>
      <p>
        The sample sign-in credentials are public and are not real authentication. Sign-up passwords are checked in the browser only and are not stored. Checkout is simulated: do not enter real payment details or personal information.
      </p>
      <h2 className="text-xl font-semibold">Third-party images</h2>
      <p>
        Product and campaign images are loaded from Unsplash. Your browser may make requests to Unsplash when those images are displayed; review its current privacy and license terms if you use this project.
      </p>
      <h2 className="text-xl font-semibold">No real-store promises</h2>
      <p>
        This project does not provide production shopping, customer support, order fulfillment, or a payment service. Replace this notice with a policy reviewed for your real service before launch.
      </p>
    </main>
  );
}
