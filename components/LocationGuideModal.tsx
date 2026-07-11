"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { invitation, type Language } from "@/data/invitation";

type LocationGuideModalProps = {
  open: boolean;
  onClose: () => void;
  language: Language;
};

const GUIDE_IMAGE_SRC = "/guide.jpeg";

export default function LocationGuideModal({
  open,
  onClose,
  language,
}: LocationGuideModalProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = document.getElementById("location-guide-dialog");
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
  }, [open, onClose]);

  if (!open) return null;

  const copy = invitation.locationGuide;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[rgba(28,24,20,0.72)] backdrop-blur-[2px]"
        aria-label={copy.close[language]}
        onClick={onClose}
      />

      <div
        id="location-guide-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl border border-[var(--gold-muted)] bg-[var(--ivory)] shadow-2xl sm:max-h-[90dvh] sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--gold-muted)]/50 px-3 py-2.5 sm:gap-4 sm:px-5 sm:py-3">
          <h2
            id={titleId}
            className="min-w-0 truncate text-base text-[var(--ink)] sm:text-lg md:text-xl font-display"
          >
            {copy.title[language]}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full border border-[var(--gold-muted)] px-3 py-1.5 text-sm text-[var(--ink-muted)] transition-colors hover:border-[var(--gold)] hover:text-[var(--ink)]"
          >
            {copy.close[language]}
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-auto p-2 sm:p-4 md:p-5">
          {imageFailed ? (
            <div className="flex min-h-[12rem] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[var(--gold)]/50 bg-white/60 px-4 py-8 text-center sm:min-h-[16rem] sm:px-6 sm:py-10">
              <p className="font-display text-xl text-[var(--gold)]">
                {invitation.initials}
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-[var(--ink-muted)] sm:text-base">
                {copy.placeholder[language]}
              </p>
            </div>
          ) : (
            // Place the hall location clarification image at:
            // public/guide.jpeg
            <div className="relative mx-auto w-full overflow-hidden rounded-lg bg-white/40 sm:rounded-xl">
              <Image
                src={GUIDE_IMAGE_SRC}
                alt={copy.alt[language]}
                width={1200}
                height={1600}
                className="mx-auto h-auto max-h-[78dvh] w-full object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
                priority
                onError={() => setImageFailed(true)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
