"use client";

import { useState } from "react";
import { contactSchema } from "@/lib/contact-schema";

type Status = "idle" | "sending" | "sent" | "demo" | "error";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = contactSchema.safeParse({ name, email, message, company });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form and try again.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please email directly.");
        setStatus("error");
        return;
      }

      setStatus(data.demo ? "demo" : "sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError("Network error. Please email directly.");
      setStatus("error");
    }
  }

  if (status === "sent" || status === "demo") {
    return (
      <ContactSection>
        <div className="p-8 border border-accent-light rounded-sm">
          <div className="font-serif italic text-2xl text-accent-light mb-2">
            Message received.
          </div>
          <p className="text-[#d4cdbf] m-0">
            Thank you. I&apos;ll be in touch within two working days.
            {status === "demo" && (
              <span className="block mt-3 text-sm opacity-70">
                (Demo mode — no email was actually sent. Configure RESEND_API_KEY to enable
                real submissions.)
              </span>
            )}
          </p>
        </div>
      </ContactSection>
    );
  }

  return (
    <ContactSection>
      <form onSubmit={handleSubmit} className="max-w-[600px]" noValidate>
        <input
          type="text"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] w-px h-px"
        />

        <Field label="Your name">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "sending"}
            className={fieldClass}
            required
          />
        </Field>

        <Field label="Email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "sending"}
            className={fieldClass}
            required
          />
        </Field>

        <Field label="What brings you here?">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={status === "sending"}
            rows={4}
            className={`${fieldClass} resize-y`}
            required
          />
        </Field>

        {status === "error" && (
          <p className="text-warning text-sm mb-6">{error}</p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="text-xs tracking-[0.2em] uppercase font-medium px-10 py-5 bg-accent-light text-ink border-0 cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {status === "sending" ? "Sending..." : "Send message →"}
        </button>

        <p className="text-xs text-[#9a8f7f] mt-8 leading-[1.6]">
          Alternatively, email{" "}
          <a href="mailto:daryl@darylmacdonald.com" className="text-accent-light">
            daryl@darylmacdonald.com
          </a>{" "}
          or call{" "}
          <a href="tel:+447840373448" className="text-accent-light">
            07840 373448
          </a>
          .
        </p>
      </form>
    </ContactSection>
  );
}

const fieldClass =
  "w-full py-4 bg-transparent border-0 border-b border-cream/30 text-cream text-base outline-none focus:border-b-accent-light transition-colors disabled:opacity-50";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block mb-8">
      <span className="block text-[0.7rem] tracking-[0.2em] uppercase text-[#d4cdbf] mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function ContactSection({ children }: { children: React.ReactNode }) {
  return (
    <section
      id="contact"
      className="bg-ink text-cream py-[clamp(4rem,8vw,7rem)] px-8"
    >
      <div className="max-w-[900px] mx-auto">
        <div className="text-[0.7rem] tracking-[0.25em] uppercase text-accent-light font-medium mb-6">
          Contact
        </div>
        <h2 className="font-serif font-normal tracking-tight leading-[1.1] text-[clamp(2rem,4vw,3rem)] mb-8 text-cream">
          Take the{" "}
          <span className="font-serif italic text-accent-light">first step</span>.
        </h2>
        <p className="font-serif text-[1.3rem] leading-[1.6] text-[#d4cdbf] mb-12 max-w-[600px]">
          Getting in touch is often the hardest part. Send a short message and I&apos;ll reply
          within two working days.
        </p>
        {children}
      </div>
    </section>
  );
}
