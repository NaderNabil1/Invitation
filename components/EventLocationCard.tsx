import type { ReactNode } from "react";
import SectionHeading from "@/components/SectionHeading";

type EventLocationCardProps = {
  title: string;
  description: string;
  timeLabel?: string;
  timeValue?: string;
  mapUrl: string;
  mapButtonLabel: string;
  icon: "church" | "hall";
  secondaryAction?: ReactNode;
  useDisplayFont?: boolean;
};

function ChurchIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-16 w-16 text-[var(--gold)] sm:h-[4.5rem] sm:w-[4.5rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path d="M32 6v8" strokeLinecap="round" />
      <path d="M28 10h8" strokeLinecap="round" />
      <path d="M18 28 L32 14 L46 28 V54 H18 Z" />
      <path d="M28 54 V40 h8 v14" />
      <path d="M22 34 h6 M36 34 h6" strokeLinecap="round" />
      <circle cx="32" cy="30" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function HallIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-16 w-16 text-[var(--gold)] sm:h-[4.5rem] sm:w-[4.5rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path d="M10 54h44" strokeLinecap="round" />
      <path d="M14 54 V28 L32 14 L50 28 V54" />
      <path d="M26 54 V38 h12 v16" />
      <path d="M20 34h8 M36 34h8" strokeLinecap="round" />
      <path d="M32 14v6" strokeLinecap="round" />
    </svg>
  );
}

export default function EventLocationCard({
  title,
  description,
  timeLabel,
  timeValue,
  mapUrl,
  mapButtonLabel,
  icon,
  secondaryAction,
  useDisplayFont = true,
}: EventLocationCardProps) {
  return (
    <section className="invite-section mx-auto w-full max-w-xl px-4 text-center sm:px-5">
      <div className="mb-6 flex justify-center sm:mb-8">
        {icon === "church" ? <ChurchIcon /> : <HallIcon />}
      </div>

      <SectionHeading useDisplayFont={useDisplayFont}>{title}</SectionHeading>

      <p className="mt-8 text-base leading-relaxed text-[var(--ink-muted)] sm:mt-10 sm:text-lg md:text-xl">
        {description}
      </p>

      {timeLabel && timeValue ? (
        <p className="mt-6 text-base tracking-wide text-[var(--gold-deep)] sm:mt-8 sm:text-lg">
          <span className="font-medium">{timeLabel}:</span>{" "}
          <span>{timeValue}</span>
        </p>
      ) : null}

      <div className="mt-9 flex w-full flex-col items-center gap-3.5 sm:mt-11 sm:flex-row sm:justify-center">
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="invite-btn"
        >
          {mapButtonLabel}
        </a>
        {secondaryAction}
      </div>
    </section>
  );
}
