"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  invitation,
  WEDDING_DETAILS,
  type Language,
} from "@/data/invitation";
import EventLocationCard from "@/components/EventLocationCard";
import FloralMotif from "@/components/FloralMotif";
import InvitationEnvelope from "@/components/InvitationEnvelope";
import InvitationHero from "@/components/InvitationHero";
import LanguageToggle from "@/components/LanguageToggle";
import LocationGuideModal from "@/components/LocationGuideModal";
import SectionHeading from "@/components/SectionHeading";
import WeddingCountdown from "@/components/WeddingCountdown";

const STORAGE_KEY = "nv-invitation-language";
const LANGUAGE_EVENT = "nv-language-change";

function subscribeLanguage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(LANGUAGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(LANGUAGE_EVENT, onStoreChange);
  };
}

function readLanguage(): Language {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "ar") return stored;
  } catch {
    // Ignore storage access errors (private mode, etc.)
  }
  return "en";
}

function getServerLanguage(): Language {
  return "en";
}

function persistLanguage(next: Language) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Ignore storage write errors
  }
  window.dispatchEvent(new Event(LANGUAGE_EVENT));
}

function FloralSectionDivider() {
  return (
    <div className="floral-divider" aria-hidden="true">
      <FloralMotif variant="bloom" className="floral-divider__bloom" />
      <FloralMotif variant="divider" className="floral-divider__vine" />
      <FloralMotif variant="roots" className="floral-divider__roots" />
    </div>
  );
}

export default function InvitationApp() {
  const language = useSyncExternalStore(
    subscribeLanguage,
    readLanguage,
    getServerLanguage,
  );
  const [opened, setOpened] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const isArabic = language === "ar";

  return (
    <div
      className={`invitation-root min-h-full ${isArabic ? "font-arabic" : ""}`}
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
    >
      {!opened ? (
        <InvitationEnvelope
          language={language}
          onOpened={() => setOpened(true)}
        />
      ) : null}

      <div
        className={`invitation-main flex min-h-full flex-col transition-opacity duration-700 ${
          opened ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!opened}
      >
        <div className="invitation-botanicals" aria-hidden="true">
          <FloralMotif
            variant="corner-tl"
            className="invitation-botanicals__corner invitation-botanicals__corner--tl"
          />
          <FloralMotif
            variant="corner-tr"
            className="invitation-botanicals__corner invitation-botanicals__corner--tr"
          />
          <FloralMotif
            variant="side-left"
            className="invitation-botanicals__side invitation-botanicals__side--l1"
          />
          <FloralMotif
            variant="side-right"
            className="invitation-botanicals__side invitation-botanicals__side--r1"
          />
          <FloralMotif
            variant="side-left"
            className="invitation-botanicals__side invitation-botanicals__side--l2"
          />
          <FloralMotif
            variant="side-right"
            className="invitation-botanicals__side invitation-botanicals__side--r2"
          />
          <FloralMotif
            variant="corner-bl"
            className="invitation-botanicals__corner invitation-botanicals__corner--bl"
          />
          <FloralMotif
            variant="corner-br"
            className="invitation-botanicals__corner invitation-botanicals__corner--br"
          />
        </div>

        <header className="sticky top-0 z-40 border-b border-[var(--gold-muted)]/35 bg-[var(--ivory-mid)]/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4">
            <p
              className={`text-[var(--gold)] ${
                isArabic
                  ? "font-arabic text-xl sm:text-2xl"
                  : "font-script text-2xl sm:text-3xl"
              }`}
            >
              {invitation.initialsWord[language]}
            </p>
            <LanguageToggle language={language} onChange={persistLanguage} />
          </div>
        </header>

        <main className="invitation-content flex-1 w-full overflow-x-hidden">
          <InvitationHero language={language} />

          <FloralSectionDivider />

          <section className="invite-section mx-auto w-full max-w-xl px-4 text-center sm:px-5">
            <SectionHeading useDisplayFont={!isArabic} size="sm">
              {invitation.dateSection.label[language]}
            </SectionHeading>

            <p
              className={`mt-8 text-2xl text-[var(--ink)] sm:mt-10 sm:text-3xl md:text-4xl ${
                isArabic ? "" : "font-display"
              }`}
            >
              {WEDDING_DETAILS.date[language]}
            </p>

            <div className="mt-8 space-y-3 text-base text-[var(--ink-muted)] sm:mt-10 sm:space-y-4 sm:text-lg">
              <p>
                <span className="text-[var(--gold-deep)]">
                  {invitation.dateSection.ceremonyLabel[language]}:
                </span>{" "}
                {WEDDING_DETAILS.ceremonyTime[language]}
              </p>
              <p>
                <span className="text-[var(--gold-deep)]">
                  {invitation.dateSection.receptionLabel[language]}:
                </span>{" "}
                {WEDDING_DETAILS.receptionTime[language]}
              </p>
            </div>
          </section>

          <FloralSectionDivider />

          <WeddingCountdown language={language} />

          <FloralSectionDivider />

          <EventLocationCard
            icon="church"
            title={invitation.church.sectionTitle[language]}
            description={invitation.church.name[language]}
            timeLabel={invitation.dateSection.ceremonyLabel[language]}
            timeValue={WEDDING_DETAILS.ceremonyTime[language]}
            mapUrl={invitation.church.mapUrl}
            mapButtonLabel={invitation.church.mapButton[language]}
            useDisplayFont={!isArabic}
          />

          <FloralSectionDivider />

          <EventLocationCard
            icon="hall"
            title={invitation.hall.sectionTitle[language]}
            description={invitation.hall.address[language]}
            timeLabel={invitation.dateSection.receptionLabel[language]}
            timeValue={WEDDING_DETAILS.receptionTime[language]}
            mapUrl={invitation.hall.mapUrl}
            mapButtonLabel={invitation.hall.mapButton[language]}
            useDisplayFont={!isArabic}
            secondaryAction={
              <button
                type="button"
                className="invite-btn invite-btn--ghost"
                onClick={() => setGuideOpen(true)}
              >
                {invitation.hall.guideButton[language]}
              </button>
            }
          />

          <FloralSectionDivider />

          <section className="invite-section mx-auto w-full max-w-xl px-4 text-center sm:px-5">
            <FloralMotif
              variant="bloom"
              className="mx-auto mb-6 h-auto w-10 text-[var(--gold)] opacity-70 sm:mb-8"
            />
            <p
              className={`text-lg leading-relaxed text-[var(--ink-muted)] sm:text-xl md:text-2xl ${
                isArabic ? "" : "font-display italic"
              }`}
            >
              {invitation.closing[language]}
            </p>
          </section>
        </main>

        <footer className="relative z-1 border-t border-[var(--gold-muted)]/35 px-4 py-12 text-center sm:px-5 sm:py-16">
          <FloralMotif
            variant="roots"
            className="mx-auto mb-6 h-auto w-40 text-[var(--gold)] opacity-45"
          />
          <p className="text-xs tracking-[0.22em] text-[var(--ink-muted)] uppercase">
            {invitation.footer.withLove[language]}
          </p>
          <p
            className={`mt-4 text-[var(--gold)] ${
              isArabic
                ? "font-arabic text-2xl sm:text-3xl"
                : "font-script text-3xl sm:text-4xl"
            }`}
          >
            {invitation.initialsWord[language]}
          </p>
        </footer>
      </div>

      {guideOpen ? (
        <LocationGuideModal
          open
          onClose={() => setGuideOpen(false)}
          language={language}
        />
      ) : null}
    </div>
  );
}
