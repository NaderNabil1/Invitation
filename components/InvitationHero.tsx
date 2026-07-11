import { invitation, type Language } from "@/data/invitation";

type InvitationHeroProps = {
  language: Language;
};

export default function InvitationHero({ language }: InvitationHeroProps) {
  const isArabic = language === "ar";
  const andLabel = isArabic ? "و" : "&";

  return (
    <section className="mx-auto w-full max-w-2xl px-4 pb-4 pt-8 text-center sm:px-5 sm:pt-14">
      <p className="font-display text-sm tracking-[0.28em] text-[var(--gold)] uppercase sm:text-base">
        {invitation.initials}
      </p>

      <div className="gold-divider mx-auto my-5 sm:my-6" aria-hidden="true" />

      <p
        className={`mx-auto max-w-xl text-sm leading-relaxed text-[var(--ink-muted)] sm:text-base md:text-lg ${
          isArabic ? "font-arabic" : "font-display italic"
        }`}
      >
        {invitation.hero.preamble[language]}
      </p>

      <h1
        className={`mt-5 flex flex-col items-center gap-2 text-[2rem] leading-[1.15] text-[var(--ink)] sm:mt-6 sm:gap-3 sm:text-5xl md:text-6xl ${
          isArabic ? "font-arabic" : "font-display"
        }`}
      >
        <span>{invitation.groom[language]}</span>
        <span
          className="font-display text-xl text-[var(--gold)] sm:text-2xl md:text-3xl"
          aria-hidden="true"
        >
          {andLabel}
        </span>
        <span>{invitation.bride[language]}</span>
      </h1>

      {!isArabic && invitation.hero.invite.en ? (
        <p className="mx-auto mt-5 max-w-md px-1 font-display text-base italic leading-relaxed text-[var(--ink-muted)] sm:mt-6 sm:text-lg md:text-xl">
          {invitation.hero.invite.en}
        </p>
      ) : null}

      <div className="gold-divider mx-auto mt-7 sm:mt-8" aria-hidden="true" />
    </section>
  );
}
