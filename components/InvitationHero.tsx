import { invitation, type Language } from "@/data/invitation";
import FloralMotif from "@/components/FloralMotif";
import { greatVibesRegular } from "@/app/fonts/great-vibes";

type InvitationHeroProps = {
  language: Language;
};

export default function InvitationHero({ language }: InvitationHeroProps) {
  const isArabic = language === "ar";
  const andLabel = isArabic ? "و" : "&";
  const nameFontClass = isArabic ? "font-arabic" : greatVibesRegular.className;

  return (
    <section className="invite-section mx-auto w-full max-w-2xl px-4 pt-10 text-center sm:px-5 sm:pt-16">
      <FloralMotif
        variant="divider"
        className="mx-auto h-auto w-[min(16rem,70vw)] text-[var(--gold)]"
      />

      <blockquote
        className={`mx-auto mt-10 max-w-xl space-y-4 text-[23px] leading-relaxed text-[var(--ink-muted)] sm:mt-12 sm:space-y-4 ${
          isArabic ? "font-arabic" : "font-display italic"
        }`}
      >
        {invitation.hero.scripture[language].map((line) => (
          <p key={line}>{line}</p>
        ))}
      </blockquote>

      <FloralMotif
        variant="bloom"
        className="mx-auto mt-10 h-auto w-9 text-[var(--gold)] opacity-70 sm:mt-12"
      />

      <p
        className={`mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[var(--ink-muted)] sm:mt-10 sm:text-xl md:text-2xl ${
          isArabic ? "font-arabic" : "font-display italic"
        }`}
      >
        {invitation.hero.preamble[language]}
      </p>

      <h1
        className={`mt-8 flex flex-col items-center gap-3 text-[var(--ink)] sm:mt-10 sm:gap-4 ${
          isArabic
            ? "text-[2.35rem] leading-[1.15] sm:text-5xl md:text-6xl"
            : "text-[2.35rem] leading-[1.15] tracking-[0.02em] sm:text-[3.35rem] md:text-[3.85rem]"
        }`}
      >
        <span className={nameFontClass}>{invitation.groom[language]}</span>
        <span
          className="flex w-full items-center justify-center gap-4 text-[var(--gold)] sm:gap-5"
          aria-hidden="true"
        >
          <span className="h-px w-10 bg-[linear-gradient(to_right,transparent,var(--gold-muted))] sm:w-16" />
          <span
            className={
              isArabic
                ? "font-arabic text-2xl leading-none sm:text-3xl"
                : "font-names text-4xl leading-none sm:text-5xl"
            }
          >
            {andLabel}
          </span>
          <span className="h-px w-10 bg-[linear-gradient(to_left,transparent,var(--gold-muted))] sm:w-16" />
        </span>
        <span className={nameFontClass}>{invitation.bride[language]}</span>
      </h1>

      {!isArabic && invitation.hero.invite.en ? (
        <p className="mx-auto mt-8 max-w-md px-1 font-display text-xl italic leading-relaxed text-[var(--ink-muted)] sm:mt-10 sm:text-2xl md:text-3xl">
          {invitation.hero.invite.en}
        </p>
      ) : null}

      <FloralMotif
        variant="roots"
        className="mx-auto mt-6 h-auto w-[min(12rem,55vw)] text-[var(--gold)] opacity-50 sm:mt-8"
      />
    </section>
  );
}
