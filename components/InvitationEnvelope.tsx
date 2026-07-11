"use client";

import { useState, useSyncExternalStore } from "react";
import { invitation, type Language } from "@/data/invitation";

type InvitationEnvelopeProps = {
  language: Language;
  onOpened: () => void;
};

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerReducedMotionSnapshot() {
  return false;
}

export default function InvitationEnvelope({
  language,
  onOpened,
}: InvitationEnvelopeProps) {
  const [phase, setPhase] = useState<"idle" | "opening" | "exiting">("idle");
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );

  const handleOpen = () => {
    if (phase !== "idle") return;

    if (reducedMotion) {
      onOpened();
      return;
    }

    setPhase("opening");

    window.setTimeout(() => {
      setPhase("exiting");
    }, 1600);

    window.setTimeout(() => {
      onOpened();
    }, 2300);
  };

  const copy = invitation.envelope.openLabel[language];
  const isOpening = phase === "opening" || phase === "exiting";

  return (
    <div
      className={`envelope-overlay fixed inset-0 z-50 flex items-center justify-center px-5 ${
        phase === "exiting" ? "envelope-overlay--exit" : ""
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={copy}
    >
      <button
        type="button"
        className="envelope-stage group relative w-full max-w-[min(22rem,92vw)] cursor-pointer border-0 bg-transparent p-0 sm:max-w-[26rem]"
        onClick={handleOpen}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleOpen();
          }
        }}
        aria-label={copy}
        disabled={phase !== "idle"}
      >
        <div className={`envelope ${isOpening ? "envelope--open" : ""}`}>
          <div className="envelope__shadow" aria-hidden="true" />

          <div className="envelope__body">
            <div
              className={`envelope__card ${isOpening ? "envelope__card--reveal" : ""}`}
              aria-hidden="true"
            >
              <span className="font-display text-2xl tracking-[0.2em] text-[var(--gold)]">
                {invitation.initials}
              </span>
            </div>

            <div
              className={`envelope__flap ${isOpening ? "envelope__flap--open" : ""}`}
              aria-hidden="true"
            />

            <div className="envelope__front" aria-hidden="true">
              <div className="envelope__seal">
                <span className="font-display text-sm tracking-[0.18em] text-[var(--ivory)] sm:text-base">
                  {invitation.initials}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p
          className={`mt-8 text-center font-display text-lg tracking-[0.18em] text-[var(--gold)] transition-opacity duration-500 sm:text-xl ${
            isOpening ? "opacity-0" : "opacity-100 group-hover:opacity-90"
          }`}
        >
          {copy}
        </p>
      </button>
    </div>
  );
}
