"use client";

import { useState } from "react";
import FloralMotif from "@/components/FloralMotif";
import RsvpModal, { type RsvpKind } from "@/components/RsvpModal";
import { invitation, type Language } from "@/data/invitation";

type RsvpSectionProps = {
  language: Language;
};

export default function RsvpSection({ language }: RsvpSectionProps) {
  const [modalKind, setModalKind] = useState<RsvpKind | null>(null);
  const copy = invitation.rsvp;
  const isArabic = language === "ar";

  return (
    <>
      <section className="invite-section rsvp-section mx-auto w-full max-w-2xl px-4 text-center sm:px-5">
        <div className="rsvp-section__panel">
          <div className="rsvp-section__glow" aria-hidden="true" />
          <div className="rsvp-section__frame" aria-hidden="true" />

          <FloralMotif
            variant="bloom"
            className="rsvp-section__float-bloom mx-auto mb-4 h-auto w-11 text-[var(--gold)] opacity-85 sm:mb-5 sm:w-12"
          />

          <p className="rsvp-section__badge">{copy.badge[language]}</p>

          <h2
            className={`rsvp-section__title ${
              isArabic ? "font-arabic" : "font-display"
            }`}
          >
            {copy.sectionTitle[language]}
          </h2>

          <FloralMotif
            variant="divider"
            className="mx-auto mt-4 h-auto w-40 text-[var(--gold)] opacity-70 sm:mt-5 sm:w-48"
          />

          <p
            className={`rsvp-section__prompt mx-auto mt-6 max-w-md text-lg leading-relaxed text-[var(--ink-muted)] sm:mt-7 sm:text-xl md:text-2xl ${
              isArabic ? "" : "font-display italic"
            }`}
          >
            {copy.prompt[language]}
          </p>

          <div className="rsvp-section__actions mt-9 flex w-full max-w-sm flex-col items-stretch gap-3.5 sm:mt-11 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <button
              type="button"
              className="invite-btn rsvp-section__accept w-full sm:w-auto"
              onClick={() => setModalKind("coming")}
            >
              {copy.acceptLabel[language]}
            </button>
            <button
              type="button"
              className="invite-btn invite-btn--ghost rsvp-section__decline w-full sm:w-auto"
              onClick={() => setModalKind("not-coming")}
            >
              {copy.declineLabel[language]}
            </button>
          </div>
        </div>
      </section>

      {modalKind ? (
        <RsvpModal
          open
          kind={modalKind}
          language={language}
          onClose={() => setModalKind(null)}
        />
      ) : null}
    </>
  );
}
