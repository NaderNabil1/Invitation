"use client";

import { invitation, type Language } from "@/data/invitation";

type LanguageToggleProps = {
  language: Language;
  onChange: (language: Language) => void;
};

export default function LanguageToggle({
  language,
  onChange,
}: LanguageToggleProps) {
  const isArabic = language === "ar";

  return (
    <div
      className="inline-flex items-center rounded-full border border-[var(--gold-muted)] bg-white/80 p-1 shadow-sm backdrop-blur-sm"
      role="group"
      aria-label={isArabic ? "اختيار اللغة" : "Language selection"}
    >
      <button
        type="button"
        onClick={() => onChange("en")}
        aria-pressed={!isArabic}
        className={`rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors sm:text-sm ${
          !isArabic
            ? "bg-[var(--gold)] text-white shadow-sm"
            : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
        }`}
      >
        {invitation.languageToggle.enLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange("ar")}
        aria-pressed={isArabic}
        className={`rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors sm:text-sm ${
          isArabic
            ? "bg-[var(--gold)] text-white shadow-sm"
            : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
        }`}
      >
        {invitation.languageToggle.arLabel}
      </button>
    </div>
  );
}
