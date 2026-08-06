"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import FloralMotif from "@/components/FloralMotif";
import { invitation, type Language } from "@/data/invitation";

export type RsvpKind = "coming" | "not-coming";

type RsvpModalProps = {
  open: boolean;
  kind: RsvpKind;
  language: Language;
  onClose: () => void;
};

type Phase = "form" | "submitting" | "thanks" | "error";

export default function RsvpModal({
  open,
  kind,
  language,
  onClose,
}: RsvpModalProps) {
  const titleId = useId();
  const nameId = useId();
  const messageId = useId();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [phase, setPhase] = useState<Phase>("form");
  const [validationHint, setValidationHint] = useState(false);

  const copy = invitation.rsvp;
  const isComing = kind === "coming";
  const isArabic = language === "ar";

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    setName("");
    setMessage("");
    setPhase("form");
    setValidationHint(false);

    const focusTimer = window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 40);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = document.getElementById("rsvp-dialog");
      if (!dialog) return;

      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [open, kind, onClose]);

  if (!open) return null;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (phase === "submitting") return;

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      setValidationHint(true);
      return;
    }

    setValidationHint(false);
    setPhase("submitting");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          name: trimmedName,
          message: trimmedMessage,
          language,
        }),
      });

      if (!response.ok) {
        setPhase("error");
        return;
      }

      setPhase("thanks");
    } catch {
      setPhase("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[rgba(28,24,20,0.72)] backdrop-blur-[2px] rsvp-modal__backdrop"
        aria-label={copy.closeLabel[language]}
        onClick={onClose}
      />

      <div
        id="rsvp-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="rsvp-modal relative z-10 flex h-[min(92dvh,100%)] max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-[var(--gold-muted)] bg-[var(--ivory)] shadow-2xl sm:h-auto sm:max-h-[90dvh] sm:rounded-2xl"
      >
        <div className="rsvp-modal__petals" aria-hidden="true">
          <span className="rsvp-petal rsvp-petal--1" />
          <span className="rsvp-petal rsvp-petal--2" />
          <span className="rsvp-petal rsvp-petal--3" />
          <span className="rsvp-petal rsvp-petal--4" />
          <span className="rsvp-petal rsvp-petal--5" />
          <span className="rsvp-petal rsvp-petal--6" />
        </div>

        <div className="relative flex shrink-0 items-start justify-between gap-3 border-b border-[var(--gold-muted)]/50 px-4 py-3.5 sm:gap-4 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <FloralMotif
              variant="bloom"
              className="mb-2 h-auto w-8 text-[var(--gold)] opacity-75"
            />
            <h2
              id={titleId}
              className={`text-xl text-[var(--ink)] sm:text-2xl ${
                isArabic ? "font-arabic" : "font-display"
              }`}
            >
              {isComing
                ? copy.acceptTitle[language]
                : copy.declineTitle[language]}
            </h2>
            {phase === "form" || phase === "submitting" || phase === "error" ? (
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-muted)] sm:text-base">
                {isComing
                  ? copy.acceptSubtitle[language]
                  : copy.declineSubtitle[language]}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full border border-[var(--gold-muted)] px-3 py-1.5 text-sm text-[var(--ink-muted)] transition-colors hover:border-[var(--gold)] hover:text-[var(--ink)]"
          >
            {copy.closeLabel[language]}
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col">
          {phase === "thanks" ? (
            <div className="rsvp-modal__body rsvp-thanks flex flex-col items-center overflow-y-auto px-4 py-6 text-center sm:px-6 sm:py-8">
              <div className="rsvp-thanks__bloom" aria-hidden="true">
                <FloralMotif
                  variant="bloom"
                  className="h-auto w-14 text-[var(--gold)] sm:w-16"
                />
              </div>
              <p
                className={`mt-5 text-2xl text-[var(--gold)] sm:text-3xl ${
                  isArabic ? "font-arabic" : "font-script"
                }`}
              >
                {isComing
                  ? copy.thankAcceptTitle[language]
                  : copy.thankDeclineTitle[language]}
              </p>
              <p
                className={`mt-4 max-w-sm text-base leading-relaxed text-[var(--ink-muted)] sm:text-lg ${
                  isArabic ? "" : "font-display italic"
                }`}
              >
                {isComing
                  ? copy.thankAcceptBody[language]
                  : copy.thankDeclineBody[language]}
              </p>
              <FloralMotif
                variant="roots"
                className="mt-6 h-auto w-36 text-[var(--gold)] opacity-50"
              />
              <button
                type="button"
                className="invite-btn rsvp-modal__action mt-8"
                onClick={onClose}
              >
                {copy.closeLabel[language]}
              </button>
            </div>
          ) : (
            <form
              className="rsvp-form flex min-h-0 flex-1 flex-col"
              onSubmit={handleSubmit}
            >
              <div className="rsvp-modal__body min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6 sm:py-6">
                <div className="text-start">
                  <label
                    htmlFor={nameId}
                    className="mb-2 block text-sm tracking-wide text-[var(--gold-deep)]"
                  >
                    {copy.nameLabel[language]}
                  </label>
                  <input
                    ref={nameInputRef}
                    id={nameId}
                    name="name"
                    type="text"
                    autoComplete="name"
                    enterKeyHint="next"
                    maxLength={120}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    onFocus={(event) => {
                      event.currentTarget.scrollIntoView({
                        block: "center",
                        behavior: "smooth",
                      });
                    }}
                    placeholder={copy.namePlaceholder[language]}
                    className="rsvp-field"
                    disabled={phase === "submitting"}
                    required
                  />
                </div>

                <div className="text-start">
                  <label
                    htmlFor={messageId}
                    className="mb-2 block text-sm tracking-wide text-[var(--gold-deep)]"
                  >
                    {isComing
                      ? copy.messageLabel[language]
                      : copy.reasonLabel[language]}
                  </label>
                  <textarea
                    id={messageId}
                    name="message"
                    rows={3}
                    enterKeyHint="done"
                    maxLength={1000}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onFocus={(event) => {
                      event.currentTarget.scrollIntoView({
                        block: "center",
                        behavior: "smooth",
                      });
                    }}
                    placeholder={
                      isComing
                        ? copy.messagePlaceholder[language]
                        : copy.reasonPlaceholder[language]
                    }
                    className="rsvp-field rsvp-field--area"
                    disabled={phase === "submitting"}
                    required
                  />
                </div>

                {validationHint ? (
                  <p className="text-sm text-[var(--gold-deep)]" role="alert">
                    {copy.requiredHint[language]}
                  </p>
                ) : null}

                {phase === "error" ? (
                  <p className="text-sm text-[var(--gold-deep)]" role="alert">
                    {copy.errorMessage[language]}
                  </p>
                ) : null}
              </div>

              <div className="rsvp-modal__footer shrink-0 border-t border-[var(--gold-muted)]/50 px-4 py-4 sm:px-6 sm:py-5">
                <button
                  type="submit"
                  className="invite-btn rsvp-modal__action"
                  disabled={phase === "submitting"}
                >
                  {phase === "submitting"
                    ? copy.submittingLabel[language]
                    : copy.submitLabel[language]}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
