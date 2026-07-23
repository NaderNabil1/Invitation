"use client";

import { useEffect, useState } from "react";
import {
  invitation,
  WEDDING_COUNTDOWN_AT,
  type Language,
} from "@/data/invitation";
import SectionHeading from "@/components/SectionHeading";

type WeddingCountdownProps = {
  language: Language;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

const CONFETTI = [
  { x: "-42%", delay: "0ms", duration: "2.4s", size: "0.45rem", rotate: "18deg", shape: "diamond" },
  { x: "-28%", delay: "120ms", duration: "2.8s", size: "0.35rem", rotate: "-12deg", shape: "dot" },
  { x: "-14%", delay: "80ms", duration: "2.2s", size: "0.55rem", rotate: "40deg", shape: "diamond" },
  { x: "0%", delay: "40ms", duration: "2.6s", size: "0.4rem", rotate: "-25deg", shape: "dot" },
  { x: "12%", delay: "160ms", duration: "2.3s", size: "0.5rem", rotate: "8deg", shape: "diamond" },
  { x: "26%", delay: "60ms", duration: "2.9s", size: "0.32rem", rotate: "-35deg", shape: "dot" },
  { x: "38%", delay: "200ms", duration: "2.5s", size: "0.48rem", rotate: "22deg", shape: "diamond" },
  { x: "-36%", delay: "280ms", duration: "3.1s", size: "0.28rem", rotate: "55deg", shape: "dot" },
  { x: "18%", delay: "240ms", duration: "2.7s", size: "0.42rem", rotate: "-48deg", shape: "diamond" },
  { x: "-8%", delay: "320ms", duration: "3s", size: "0.36rem", rotate: "12deg", shape: "dot" },
  { x: "32%", delay: "180ms", duration: "2.4s", size: "0.3rem", rotate: "-8deg", shape: "dot" },
  { x: "-22%", delay: "100ms", duration: "2.85s", size: "0.52rem", rotate: "30deg", shape: "diamond" },
] as const;

function getEgyptOffsetMs(utcMs: number): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Cairo",
    timeZoneName: "shortOffset",
  }).formatToParts(new Date(utcMs));
  const tzName = parts.find((part) => part.type === "timeZoneName")?.value ?? "GMT+2";
  const match = tzName.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
  if (!match) return 2 * 60 * 60 * 1000;
  const sign = match[1] === "-" ? -1 : 1;
  const hours = Number(match[2]);
  const minutes = Number(match[3] ?? "0");
  return sign * (hours * 60 + minutes) * 60 * 1000;
}

/** Wall-clock time in Africa/Cairo → UTC epoch ms */
function egyptLocalToUtcMs(isoLocal: string): number {
  const [datePart, timePart] = isoLocal.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute, second = 0] = timePart.split(":").map(Number);
  const asUtc = Date.UTC(year, month - 1, day, hour, minute, second);
  let utc = asUtc - getEgyptOffsetMs(asUtc);
  utc = asUtc - getEgyptOffsetMs(utc);
  return utc;
}

const TARGET_MS = egyptLocalToUtcMs(WEDDING_COUNTDOWN_AT);

function calcTimeLeft(now: number): TimeLeft {
  const diff = Math.max(0, TARGET_MS - now);
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
    done: diff <= 0,
  };
}

function formatUnit(value: number, language: Language): string {
  return value.toLocaleString(language === "ar" ? "ar-EG" : "en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

function CelebrationMessage({ language }: { language: Language }) {
  const isArabic = language === "ar";
  const copy = invitation.countdown;

  return (
    <div className="countdown-celebrate relative mt-6 overflow-hidden px-2 pt-2 sm:mt-8">
      <div className="countdown-celebrate__burst" aria-hidden="true" />
      <div className="countdown-celebrate__ring" aria-hidden="true" />

      <div className="countdown-celebrate__confetti" aria-hidden="true">
        {CONFETTI.map((piece, i) => (
          <span
            key={i}
            className={`countdown-celebrate__piece countdown-celebrate__piece--${piece.shape}`}
            style={{
              ["--cx" as string]: piece.x,
              ["--delay" as string]: piece.delay,
              ["--dur" as string]: piece.duration,
              ["--size" as string]: piece.size,
              ["--rot" as string]: piece.rotate,
            }}
          />
        ))}
      </div>

      <p className="countdown-celebrate__initials font-display text-sm tracking-[0.35em] text-[var(--gold)] sm:text-base">
        {invitation.initials}
      </p>

      <div className="gold-divider mx-auto my-4 sm:my-5" aria-hidden="true" />

      <p
        className={`countdown-celebrate__title text-2xl leading-snug text-[var(--ink)] sm:text-3xl md:text-4xl ${
          isArabic ? "font-arabic" : "font-display"
        }`}
      >
        {copy.arrived[language]}
      </p>

      <p
        className={`countdown-celebrate__sub mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[var(--ink-muted)] sm:mt-4 sm:text-base ${
          isArabic ? "" : "font-display italic"
        }`}
      >
        {copy.arrivedSub[language]}
      </p>

      <div className="countdown-celebrate__sparkles" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default function WeddingCountdown({ language }: WeddingCountdownProps) {
  const isArabic = language === "ar";
  const copy = invitation.countdown;
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => {
      const next = calcTimeLeft(Date.now());
      setTimeLeft(next);
      return next.done;
    };

    if (tick()) return;

    const id = window.setInterval(() => {
      if (tick()) window.clearInterval(id);
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  const units = [
    { key: "days", value: timeLeft?.days ?? 0, label: copy.days[language] },
    { key: "hours", value: timeLeft?.hours ?? 0, label: copy.hours[language] },
    { key: "minutes", value: timeLeft?.minutes ?? 0, label: copy.minutes[language] },
    { key: "seconds", value: timeLeft?.seconds ?? 0, label: copy.seconds[language] },
  ];

  const done = Boolean(timeLeft?.done);
  const heading = done ? copy.arrivedLabel[language] : copy.label[language];

  return (
    <section
      className="invite-section mx-auto w-full max-w-xl px-4 text-center sm:px-5"
      aria-live="polite"
      aria-atomic="true"
    >
      <SectionHeading useDisplayFont={!isArabic} size="sm">
        {heading}
      </SectionHeading>

      <div
        className={`mx-auto mt-10 grid max-w-md grid-cols-4 gap-2 sm:mt-12 sm:gap-3 ${
          done ? "countdown-celebrate__zeros" : ""
        }`}
      >
        {units.map((unit) => (
          <div key={unit.key} className="flex flex-col items-center px-1">
            <span
              className={`text-4xl leading-none tracking-wide text-[var(--gold-deep)] sm:text-5xl md:text-6xl ${
                isArabic ? "font-arabic" : "font-display"
              }`}
            >
              {formatUnit(unit.value, language)}
            </span>
            <span className="mt-3 text-[0.7rem] tracking-[0.16em] text-[var(--ink-muted)] uppercase sm:mt-3.5 sm:text-xs">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {done ? <CelebrationMessage language={language} /> : null}
    </section>
  );
}
