import React from "react";
import { faqEntries } from "../data/faqs";

export default function Faq() {
  return (
    <section className="mx-[5%] flex flex-col gap-8 py-12 lg:mx-auto lg:max-w-5xl lg:py-20">
      <header className="mb-2">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">A few helpful answers</p>
        <h1 className="text-3xl font-bold sm:text-4xl">Frequently asked questions</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">This frontend prototype uses sample data. Here is what the demo can and cannot do.</p>
      </header>
      <div className="grid gap-3">
        {faqEntries.map(({ question, answer }) => (
          <details key={question} className="faq-item group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 text-left font-semibold marker:content-none">
              {question}
              <span className="faq-toggle grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange-50 text-lg text-primary">+</span>
            </summary>
            <p className="px-5 pb-5 text-sm leading-6 text-gray-600">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
