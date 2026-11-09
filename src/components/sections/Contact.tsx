import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { contactRows } from "@/data/site";
import { supabase } from "@/lib/supabase";
import styles from "./Contact.module.css";

interface FormState {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [validated, setValidated] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({
        ...current,
        [field]: e.target.value,
      }));

      // Clear the error for this field when the user starts correcting it.
      if (errors[field]) {
        setErrors((current) => ({
          ...current,
          [field]: undefined,
        }));
      }

      setValidated(false);
    };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.name.trim()) {
      next.name = "Please enter your name.";
    }

    if (!form.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!EMAIL_RE.test(form.email.trim())) {
      next.email = "Please enter a valid email address.";
    }

    if (!form.message.trim()) {
      next.message = "Please enter a message.";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setValidated(false);

    if (!validate()) {
      window.requestAnimationFrame(() =>
        document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          subject: form.subject.trim() || "Portfolio inquiry",
          message: form.message.trim(),
        },
      });

      if (error) {
        console.error("Contact submission error:", error);

        setErrors({
          message: "Something went wrong. Please try again.",
        });

        return;
      }

      setValidated(true);
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      console.error("Unexpected contact submission error:", error);

      setErrors({
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>08 / LET’S CONNECT</div>

          <h2>
            HAVE AN IDEA?
            <br />
            LET’S BUILD IT.
          </h2>

          <p>
            Open to internships and collaborations. Send a note and I'll get
            back to you.
          </p>

          <div className={styles.contactList}>
            {contactRows.map((row) => (
              <div className={styles.contactRow} key={row.label}>
                <div className={styles.contactLabel}>{row.label}</div>

                <div className={styles.contactValue}>
                  {row.href ? (
                    <a
                      href={row.href}
                      target={
                        row.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        row.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </div>
              </div>
            ))}
          </div>
          <a
            className={styles.resume + " btn btn-secondary"}
            href="/Ankith_Hegde_Resume.pdf"
          >
            Download résumé ↓
          </a>
        </div>

        <div className={styles.formCol}>
          <h3>Send a note ↗</h3>
          <form onSubmit={handleSubmit} noValidate aria-label="Contact Ankith">
            <div className={styles.formGrid}>
              <div className="field">
                <label htmlFor="contact-name">Name</label>

                <input
                  id="contact-name"
                  name="name"
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                  autoComplete="name"
                  className={`input ${errors.name ? "is-invalid" : ""}`}
                  style={{ height: 48 }}
                  placeholder="Your name"
                  value={form.name}
                  onChange={update("name")}
                />

                {errors.name && (
                  <div
                    id="contact-name-error"
                    role="alert"
                    className={styles.errorText}
                  >
                    {errors.name}
                  </div>
                )}
              </div>

              <div className="field">
                <label htmlFor="contact-email">Email</label>

                <input
                  id="contact-email"
                  name="email"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                  autoComplete="email"
                  type="email"
                  className={`input ${errors.email ? "is-invalid" : ""}`}
                  style={{ height: 48 }}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={update("email")}
                />

                {errors.email && (
                  <div
                    id="contact-email-error"
                    role="alert"
                    className={styles.errorText}
                  >
                    {errors.email}
                  </div>
                )}
              </div>

              <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor="contact-company">Company</label>
                <input
                  id="contact-company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={update("company")}
                />
              </div>

              <div className="field">
                <label htmlFor="contact-subject">Subject</label>

                <input
                  id="contact-subject"
                  className="input"
                  style={{ height: 48 }}
                  placeholder="Internship, collaboration, other"
                  value={form.subject}
                  onChange={update("subject")}
                />
              </div>
            </div>

            <div className={`field ${styles.messageField}`}>
              <label htmlFor="contact-message">Message</label>

              <textarea
                id="contact-message"
                name="message"
                required
                aria-invalid={!!errors.message}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
                className={`input ${errors.message ? "is-invalid" : ""}`}
                rows={6}
                placeholder="What would you like to talk about?"
                style={{ resize: "vertical" }}
                value={form.message}
                onChange={update("message")}
              />

              {errors.message && (
                <div
                  id="contact-message-error"
                  role="alert"
                  className={styles.errorText}
                >
                  {errors.message}
                </div>
              )}
            </div>

            <div className={styles.formFooter}>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
                style={{
                  height: 48,
                  padding: "0 26px",
                  fontSize: 14,
                }}
              >
                {submitting ? "Sending..." : "Send message"}
              </button>
            </div>

            {validated && (
              <div role="status" className={styles.statusMessage}>
                Thanks — your message has been sent successfully. I'll get back
                to you soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
