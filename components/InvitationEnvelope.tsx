"use client";

import { useState, useSyncExternalStore, type CSSProperties } from "react";
import LanguageToggle from "@/components/LanguageToggle";
import { invitation, type Language } from "@/data/invitation";

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

const SPARKS = [
  { x: "0rem", y: "-3.2rem" },
  { x: "1.6rem", y: "-2.8rem" },
  { x: "2.8rem", y: "-1.6rem" },
  { x: "3.1rem", y: "0.2rem" },
  { x: "2.5rem", y: "1.8rem" },
  { x: "1.1rem", y: "2.8rem" },
  { x: "-0.2rem", y: "3rem" },
  { x: "-1.7rem", y: "2.4rem" },
  { x: "-2.9rem", y: "1.2rem" },
  { x: "-3.1rem", y: "-0.5rem" },
  { x: "-2.3rem", y: "-2rem" },
  { x: "-1rem", y: "-3rem" },
  { x: "0.8rem", y: "-1.2rem" },
  { x: "-0.9rem", y: "1.1rem" },
] as const;

function WaxRose() {
  return (
    <svg
      className="envelope__seal-rose"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M12 19c-3.2-1.8-5.2-4.2-5.2-7.1 0-2.4 1.6-4 3.5-4 .9 0 1.7.4 2.2 1 .5-.6 1.3-1 2.2-1 1.9 0 3.5 1.6 3.5 4 0 2.9-2 5.3-5.2 7.1Z"
        fill="currentColor"
        opacity="0.92"
      />
      <circle cx="12" cy="11.2" r="1.35" fill="rgba(255,248,230,0.55)" />
      <path
        d="M12 19v-3.2"
        stroke="rgba(255,248,230,0.35)"
        strokeWidth="0.8"
      />
    </svg>
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

    if (reducedMotion) {
      onOpened();
      return;
    }

    setPhase("opening");

    // Seal keeps original ~1.6s pace; flaps/card/exit run faster after it.
    window.setTimeout(() => {
      setPhase("exiting");
    }, 2800);

    window.setTimeout(() => {
      onOpened();
    }, 3600);
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
        className={`absolute top-4 end-4 z-20 transition-opacity duration-500 sm:top-5 sm:end-5 ${
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
              <div className="envelope__damask" />
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
              className={`envelope__flap envelope__flap--left ${
                isOpening ? "envelope__flap--open" : ""
              }`}
              aria-hidden="true"
            >
              <div className="envelope__flap-face">
                <div className="envelope__damask envelope__damask--flap" />
              </div>
            </div>

            <div
              className={`envelope__flap envelope__flap--right ${
                isOpening ? "envelope__flap--open" : ""
              }`}
              aria-hidden="true"
            >
              <div className="envelope__flap-face">
                <div className="envelope__damask envelope__damask--flap" />
              </div>
            </div>

            <div
              className={`envelope__flap envelope__flap--top ${
                isOpening ? "envelope__flap--open" : ""
              }`}
              aria-hidden="true"
            >
              <div className="envelope__flap-face">
                <div className="envelope__damask envelope__damask--flap" />
              </div>
            </div>

            <div className="envelope__front" aria-hidden="true">
              <div className="envelope__damask" />
              <div className="envelope__front-sheen" />
            </div>

            <div className="envelope__bee envelope__bee--one" aria-hidden="true" />
            <div className="envelope__bee envelope__bee--two" aria-hidden="true" />
            <div className="envelope__bee envelope__bee--three" aria-hidden="true" />

            <div
              className={`envelope__seal ${isOpening ? "envelope__seal--break" : ""}`}
            >
              <span className="envelope__seal-wax" />
              <span className="envelope__seal-ring" />
              <span className="envelope__seal-glow" />
              <WaxRose />
              <span className="font-display relative z-[1] text-[0.95rem] tracking-[0.16em] text-[var(--ivory)] sm:text-base">
                {invitation.initials}
              </span>
            </div>

            {isOpening ? (
              <div className="envelope__sparks" aria-hidden="true">
                {SPARKS.map((spark, index) => (
                  <span
                    key={`${spark.x}-${spark.y}`}
                    className="envelope__spark"
                    style={
                      {
                        "--spark-x": spark.x,
                        "--spark-y": spark.y,
                        "--spark-i": index,
                      } as CSSProperties
                    }
                  />
                ))}
              </div>
            ) : null}

            <div
              className={`envelope__copy ${isOpening ? "envelope__copy--hide" : ""}`}
            >
              <p
                className={`envelope__eyebrow ${
                  isArabic ? "font-arabic tracking-[0.12em]" : ""
                }`}
              >
                {copy.eyebrow[language]}
              </p>
              <p
                className={`envelope__headline ${
                  isArabic ? "font-arabic tracking-[0.04em]" : ""
                }`}
              >
                {copy.headline[language]}
              </p>
              <p
                className={`envelope__subhead ${
                  isArabic ? "font-arabic" : "font-display italic"
                }`}
              >
                {copy.subhead[language]}
              </p>
              <p
                className={`envelope__tap ${
                  isArabic ? "font-arabic tracking-[0.06em]" : ""
                }`}
              >
                {copy.openLabel[language]}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`envelope-cta mt-4 flex flex-col items-center gap-2.5 transition-opacity duration-300 sm:mt-5 ${
            isOpening ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="envelope-cta__hint" aria-hidden="true">
            <span className="envelope-cta__pulse" />
          </span>
        </div>
      </button>
    </div>
  );
}
