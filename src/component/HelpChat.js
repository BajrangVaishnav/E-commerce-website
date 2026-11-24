import React, { useEffect, useRef, useState } from "react";
import { FiMessageCircle, FiSend, FiX } from "react-icons/fi";
import { faqEntries } from "../data/faqs";

const quickQuestions = [
  "How do I place an order?",
  "Which payment methods can I use?",
  "Can I track my order?",
  "How can I contact customer support?",
];

const getAnswer = (question) => {
  const normalized = question.toLowerCase();
  const rankedAnswers = faqEntries
    .map((entry) => ({
      answer: entry.answer,
      score: entry.keywords.reduce(
        (score, keyword) => score + (normalized.includes(keyword) ? keyword.length : 0),
        0
      ),
    }))
    .sort((left, right) => right.score - left.score);

  return rankedAnswers[0]?.score
    ? rankedAnswers[0].answer
    : "I couldn't match that to a quick answer. Browse the FAQs or try the Contact page; both are local demos.";
};

export default function HelpChat() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "assistant",
      text: "Hi! I can help with common questions about this storefront demo.",
    },
  ]);
  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, open]);

  const askQuestion = (question) => {
    const text = question.trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      { id: `user-${current.length}`, sender: "user", text },
      { id: `assistant-${current.length + 1}`, sender: "assistant", text: getAnswer(text) },
    ]);
    setDraft("");
  };

  const submitQuestion = (event) => {
    event.preventDefault();
    askQuestion(draft);
  };

  return (
    <>
      <section
        id="help-chat-dialog"
        className="help-chat-panel"
        role="dialog"
        aria-modal="false"
        aria-labelledby="help-chat-title"
        hidden={!open}
      >
        <header className="help-chat-header">
          <div>
            <h2 id="help-chat-title">E-Com Help</h2>
            <p>Common questions · local demo</p>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close help chat">
            <FiX />
          </button>
        </header>

        <div className="help-chat-messages" ref={messagesRef} role="log" aria-live="polite">
          {messages.map((message) => (
            <p
              key={message.id}
              className={`help-chat-message ${message.sender === "user" ? "help-chat-user" : "help-chat-assistant"}`}
            >
              {message.text}
            </p>
          ))}
        </div>

        {messages.length === 1 && (
          <div className="help-chat-questions" aria-label="Common questions">
            {quickQuestions.map((question) => (
              <button key={question} type="button" onClick={() => askQuestion(question)}>
                {question}
              </button>
            ))}
          </div>
        )}

        <form className="help-chat-form" onSubmit={submitQuestion}>
          <input
            aria-label="Ask a question"
            maxLength={300}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask a common question…"
          />
          <button type="submit" aria-label="Send question" disabled={!draft.trim()}>
            <FiSend />
          </button>
        </form>
      </section>

      <button
        type="button"
        className="help-chat-launcher"
        aria-label={open ? "Close help chat" : "Open help chat"}
        aria-expanded={open}
        aria-controls="help-chat-dialog"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <FiX aria-hidden="true" /> : <FiMessageCircle aria-hidden="true" />}
        <span>{open ? "Close" : "Help"}</span>
      </button>
    </>
  );
}
