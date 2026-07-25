"use client";

import { useState, useSyncExternalStore } from "react";
import LanguageToggle from "@/components/LanguageToggle";
import { invitation, type Language } from "@/data/invitation";
import { playInvitationMusic } from "@/lib/invitation-music";

type InvitationEnvelopeProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
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

function SealFace({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`envelope__seal-face envelope__seal-face--${side}`}
      style={{ backgroundImage: "url(/envelope-seal.png?v=2)" }}
      aria-hidden="true"
    >
      <span className="envelope__seal-initials font-names">
        {invitation.initials}
      </span>
    </div>
  );
}

function EnvelopeFlorals({ className = "" }: { className?: string }) {
  return (
    <div
      className={`envelope__florals ${className}`}
      aria-hidden="true"
      style={{ backgroundImage: "url(/envelope-florals.png)" }}
    />
  );
}

export default function InvitationEnvelope({
  language,
  onLanguageChange,
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

    playInvitationMusic();

    if (reducedMotion) {
      onOpened();
      return;
    }

    setPhase("opening");

    window.setTimeout(() => {
      setPhase("exiting");
    }, 3400);

    window.setTimeout(() => {
      onOpened();
    }, 3950);
  };

  const copy = invitation.envelope;
  const isOpening = phase === "opening" || phase === "exiting";
  const isArabic = language === "ar";

  return (
    <div
      className={`envelope-overlay fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-1 sm:px-2 ${
        phase === "exiting" ? "envelope-overlay--exit" : ""
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={copy.openLabel[language]}
    >
      <div
        className={`absolute top-4 end-4 z-20 transition-opacity duration-700 sm:top-5 sm:end-5 ${
          isOpening ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <LanguageToggle language={language} onChange={onLanguageChange} />
      </div>

      <button
        type="button"
        className={`envelope-stage group relative cursor-pointer border-0 bg-transparent p-0 ${
          isOpening ? "envelope-stage--opening" : ""
        }`}
        onClick={handleOpen}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleOpen();
          }
        }}
        aria-label={copy.openLabel[language]}
        disabled={phase !== "idle"}
      >
        <div className={`envelope ${isOpening ? "envelope--open" : ""}`}>
          <div className="envelope__aura" aria-hidden="true" />
          <div className="envelope__shadow" aria-hidden="true" />

          <div className="envelope__body">
            <div className="envelope__pocket" aria-hidden="true">
              <EnvelopeFlorals className="envelope__florals--soft" />
            </div>

            <div
              className={`envelope__card ${isOpening ? "envelope__card--reveal" : ""}`}
              aria-hidden="true"
            >
              <div className="envelope__card-frame">
                <div className="envelope__card-ornament envelope__card-ornament--top" />
                <span className="font-display text-3xl tracking-[0.32em] text-[var(--gold)] sm:text-4xl">
                  {invitation.initials}
                </span>
                <div className="envelope__card-rule" />
                <span
                  className={`mt-1 text-[0.7rem] tracking-[0.24em] text-[var(--ink-muted)] uppercase sm:text-xs ${
                    isArabic ? "font-arabic tracking-[0.08em]" : "font-display"
                  }`}
                >
                  {isArabic ? "دعوة زفاف" : "Wedding Invitation"}
                </span>
                <div className="envelope__card-ornament envelope__card-ornament--bottom" />
              </div>
            </div>

            <div
              className={`envelope__flap envelope__flap--bottom ${
                isOpening ? "envelope__flap--open" : ""
              }`}
              aria-hidden="true"
            >
              <div className="envelope__flap-face">
                <EnvelopeFlorals />
                <span className="envelope__flap-edge" />
              </div>
            </div>

            <div
              className={`envelope__flap envelope__flap--top ${
                isOpening ? "envelope__flap--open" : ""
              }`}
              aria-hidden="true"
            >
              <div className="envelope__flap-face">
                <EnvelopeFlorals />
                <span className="envelope__flap-edge" />
              </div>
            </div>

            <div
              className={`envelope__flap envelope__flap--left ${
                isOpening ? "envelope__flap--open" : ""
              }`}
              aria-hidden="true"
            >
              <div className="envelope__flap-face">
                <EnvelopeFlorals className="envelope__florals--left" />
                <span className="envelope__flap-edge" />
              </div>
            </div>

            <div
              className={`envelope__flap envelope__flap--right ${
                isOpening ? "envelope__flap--open" : ""
              }`}
              aria-hidden="true"
            >
              <div className="envelope__flap-face">
                <EnvelopeFlorals className="envelope__florals--right" />
                <span className="envelope__flap-edge" />
              </div>
            </div>

            <div
              className={`envelope__seal ${isOpening ? "envelope__seal--break" : ""}`}
              aria-hidden="true"
            >
              <div className="envelope__seal-half envelope__seal-half--left">
                <SealFace side="left" />
              </div>
              <div className="envelope__seal-half envelope__seal-half--right">
                <SealFace side="right" />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`envelope-cta mt-4 flex flex-col items-center gap-2 transition-opacity duration-700 sm:mt-5 ${
            isOpening ? "opacity-0" : "opacity-100"
          }`}
        >
          <p
            className={`envelope__tap ${
              isArabic ? "font-arabic tracking-[0.06em]" : ""
            }`}
          >
            {copy.openLabel[language]}
          </p>
          <span className="envelope-cta__hint" aria-hidden="true">
            <span className="envelope-cta__pulse" />
          </span>
        </div>
      </button>
    </div>
  );
}
