"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  invitation,
  WEDDING_DETAILS,
  type Language,
} from "@/data/invitation";
import EventLocationCard from "@/components/EventLocationCard";
import InvitationEnvelope from "@/components/InvitationEnvelope";
import InvitationHero from "@/components/InvitationHero";
import LanguageToggle from "@/components/LanguageToggle";
import LocationGuideModal from "@/components/LocationGuideModal";

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
        <header className="sticky top-0 z-40 border-b border-[var(--gold-muted)]/40 bg-[var(--ivory)]/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-3.5">
            <p className="font-display text-base tracking-[0.22em] text-[var(--gold)] sm:text-lg">
              {invitation.initials}
            </p>
            <LanguageToggle language={language} onChange={persistLanguage} />
          </div>
        </header>

        <main className="flex-1 w-full overflow-x-hidden">
          <InvitationHero language={language} />

          <section className="mx-auto w-full max-w-xl px-4 py-6 text-center sm:px-5 sm:py-10">
            <h2
              className={`text-sm tracking-[0.28em] text-[var(--gold)] ${
                isArabic ? "" : "font-display uppercase"
              }`}
            >
              {invitation.dateSection.label[language]}
            </h2>
            <p
              className={`mt-3 text-xl text-[var(--ink)] sm:mt-4 sm:text-2xl md:text-3xl ${
                isArabic ? "" : "font-display"
              }`}
            >
              {WEDDING_DETAILS.date[language]}
            </p>
            <div className="mt-5 space-y-2 text-sm text-[var(--ink-muted)] sm:mt-6 sm:text-base">
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

          <div className="section-rule mx-auto max-w-xs" aria-hidden="true" />

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

          <div className="section-rule mx-auto max-w-xs" aria-hidden="true" />

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

          <section className="mx-auto w-full max-w-xl px-4 py-10 text-center sm:px-5 sm:py-16">
            <div className="gold-divider mx-auto mb-6 sm:mb-8" aria-hidden="true" />
            <p
              className={`text-base leading-relaxed text-[var(--ink-muted)] sm:text-lg md:text-xl ${
                isArabic ? "" : "font-display italic"
              }`}
            >
              {invitation.closing[language]}
            </p>
          </section>
        </main>

        <footer className="border-t border-[var(--gold-muted)]/40 px-4 py-8 text-center sm:px-5 sm:py-10">
          <p className="text-xs tracking-[0.2em] text-[var(--ink-muted)] uppercase">
            {invitation.footer.withLove[language]}
          </p>
          <p className="mt-3 font-display text-2xl tracking-[0.28em] text-[var(--gold)] sm:text-3xl">
            {invitation.initials}
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
