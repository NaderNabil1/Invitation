"use client";

import { useState } from "react";
import FloralMotif from "@/components/FloralMotif";
import RsvpModal, { type RsvpKind } from "@/components/RsvpModal";
import SectionHeading from "@/components/SectionHeading";
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
      <section className="invite-section rsvp-section mx-auto w-full max-w-xl px-4 text-center sm:px-5">
        <div className="rsvp-section__glow" aria-hidden="true" />

        {/* <FloralMotif
          variant="bloom"
          className="rsvp-section__float-bloom mx-auto mb-2 h-auto w-11 text-[var(--gold)] opacity-80 sm:w-12"
        /> */}

        <SectionHeading useDisplayFont={!isArabic} size="sm">
          {copy.sectionTitle[language]}
        </SectionHeading>

        <p
          className={`mt-7 text-base leading-relaxed text-[var(--ink-muted)] sm:mt-9 sm:text-lg md:text-xl ${
            isArabic ? "" : "font-display italic"
          }`}
        >
          {copy.prompt[language]}
        </p>

        <div className="mt-9 flex w-full flex-col items-center gap-3.5 sm:mt-11 sm:flex-row sm:justify-center">
          <button
            type="button"
            className="invite-btn rsvp-section__accept"
            onClick={() => setModalKind("coming")}
          >
            {copy.acceptLabel[language]}
          </button>
          <button
            type="button"
            className="invite-btn invite-btn--ghost"
            onClick={() => setModalKind("not-coming")}
          >
            {copy.declineLabel[language]}
          </button>
        </div>

        <FloralMotif
          variant="divider"
          className="mx-auto mt-10 h-auto w-44 text-[var(--gold)] opacity-55 sm:mt-12 sm:w-52"
        />
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
