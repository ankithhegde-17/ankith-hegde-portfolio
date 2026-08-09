import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { contactRows } from "@/data/site";
import { supabase } from "@/lib/supabase";
import styles from "./Contact.module.css";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
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
      return;
    }

    setSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "send-contact-email",
        {
          body: {
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            subject: form.subject.trim() || "Portfolio inquiry",
            message: form.message.trim(),
          },
        }
      );

      if (error) {
        console.error("Contact submission error:", error);

        setErrors({
          message: "Something went wrong. Please try again.",
        });

        return;
      }

      console.log("Contact submission response:", data);

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
          <div className={styles.eyebrow}>09 — CONTACT</div>

          <h2>Let's build something.</h2>

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
        </div>

        <div className={styles.formCol}>
          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.formGrid}>
              <div className="field">
                <label htmlFor="contact-name">Name</label>

                <input
                  id="contact-name"
                  className={`input ${errors.name ? "is-invalid" : ""}`}
                  style={{ height: 48 }}
                  placeholder="Your name"
                  value={form.name}
                  onChange={update("name")}
                />

                {errors.name && (
                  <div className={styles.errorText}>{errors.name}</div>
                )}
              </div>

              <div className="field">
                <label htmlFor="contact-email">Email</label>

                <input
                  id="contact-email"
                  type="email"
                  className={`input ${errors.email ? "is-invalid" : ""}`}
                  style={{ height: 48 }}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={update("email")}
                />

                {errors.email && (
                  <div className={styles.errorText}>{errors.email}</div>
                )}
              </div>

              <div className="field">
                <label htmlFor="contact-phone">Phone number</label>

                <input
                  id="contact-phone"
                  className="input"
                  style={{ height: 48 }}
                  placeholder="+91"
                  value={form.phone}
                  onChange={update("phone")}
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
                className={`input ${
                  errors.message ? "is-invalid" : ""
                }`}
                rows={6}
                placeholder="What would you like to talk about?"
                style={{ resize: "vertical" }}
                value={form.message}
                onChange={update("message")}
              />

              {errors.message && (
                <div className={styles.errorText}>{errors.message}</div>
              )}
            </div>

            <div className={styles.formFooter}>
              <div className={styles.footerNote}>
                Submissions are stored securely and only used to reply.
              </div>

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
              <div className={styles.statusMessage}>
                Thanks — your message has been sent successfully. I'll get
                back to you soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}