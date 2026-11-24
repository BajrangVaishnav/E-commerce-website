import React from "react";

export default function Term() {
  return (
    <main className="legal-page page-surface my-12 grid gap-5 p-7 sm:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Frontend demo</p>
      <h1 className="text-3xl font-bold sm:text-4xl">Demo terms</h1>
      <p>
        This project is a UI prototype for learning and demonstration. Product names, prices, imagery, accounts, and order flows are sample content and do not represent real inventory or offers.
      </p>
      <h2 className="text-xl font-semibold">No real purchases</h2>
      <p>
        Adding to the cart and placing a demo order only changes data in your current browser tab. No order is sent to a seller, no item is shipped, and no payment is requested or processed.
      </p>
      <h2 className="text-xl font-semibold">Demo accounts</h2>
      <p>
        Sign-in and sign-up are simulated in the browser. They do not verify identity, create a protected account, or provide security suitable for a real service.
      </p>
      <h2 className="text-xl font-semibold">Using this project</h2>
      <p>
        The code is made available under the license included with this repository. Check the separate license terms for images and other third-party assets before redistributing them.
      </p>
      <p className="text-sm text-gray-500">
        A real commerce service needs its own accurate terms, privacy notice, payment provider, and backend security review.
      </p>
    </main>
  );
}
