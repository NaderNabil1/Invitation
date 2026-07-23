type FloralMotifProps = {
  variant?:
    | "divider"
    | "corner-tl"
    | "corner-tr"
    | "corner-bl"
    | "corner-br"
    | "side-left"
    | "side-right"
    | "bloom"
    | "roots";
  className?: string;
};

export default function FloralMotif({
  variant = "divider",
  className = "",
}: FloralMotifProps) {
  const shared = `floral-motif floral-motif--${variant} ${className}`.trim();

  if (variant === "divider") {
    return (
      <svg
        className={shared}
        viewBox="0 0 280 48"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 24c28-14 48-10 70-2 14 5 28 8 50 8s36-3 50-8c22-8 42-12 70-2"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M40 28c18-10 32-8 48-3M192 25c16 5 30 7 48 0"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.4"
        />
        {/* left bud */}
        <g transform="translate(78 20)" opacity="0.85">
          <ellipse cx="0" cy="0" rx="5" ry="8" fill="currentColor" opacity="0.22" />
          <path
            d="M0 8c-4-4-5-9-2-12 3 1 5 5 2 12Z"
            fill="currentColor"
            opacity="0.45"
          />
          <path
            d="M0 8c4-4 5-9 2-12-3 1-5 5-2 12Z"
            fill="currentColor"
            opacity="0.45"
          />
        </g>
        {/* center flower */}
        <g transform="translate(140 22)">
          <circle cx="0" cy="0" r="3.2" fill="currentColor" opacity="0.55" />
          <ellipse cx="0" cy="-7" rx="3.5" ry="6.5" fill="currentColor" opacity="0.35" />
          <ellipse cx="0" cy="7" rx="3.5" ry="6.5" fill="currentColor" opacity="0.35" />
          <ellipse cx="-7" cy="0" rx="6.5" ry="3.5" fill="currentColor" opacity="0.35" />
          <ellipse cx="7" cy="0" rx="6.5" ry="3.5" fill="currentColor" opacity="0.35" />
          <ellipse
            cx="-5"
            cy="-5"
            rx="5"
            ry="3.2"
            transform="rotate(-45)"
            fill="currentColor"
            opacity="0.28"
          />
          <ellipse
            cx="5"
            cy="-5"
            rx="5"
            ry="3.2"
            transform="rotate(45)"
            fill="currentColor"
            opacity="0.28"
          />
        </g>
        {/* right bud */}
        <g transform="translate(202 20)" opacity="0.85">
          <ellipse cx="0" cy="0" rx="5" ry="8" fill="currentColor" opacity="0.22" />
          <path
            d="M0 8c-4-4-5-9-2-12 3 1 5 5 2 12Z"
            fill="currentColor"
            opacity="0.45"
          />
          <path
            d="M0 8c4-4 5-9 2-12-3 1-5 5-2 12Z"
            fill="currentColor"
            opacity="0.45"
          />
        </g>
        {/* tiny leaves */}
        <path
          d="M108 18c6 2 10 6 11 11-6-1-11-5-11-11Z"
          fill="currentColor"
          opacity="0.3"
        />
        <path
          d="M172 18c-6 2-10 6-11 11 6-1 11-5 11-11Z"
          fill="currentColor"
          opacity="0.3"
        />
      </svg>
    );
  }

  if (variant === "bloom") {
    return (
      <svg
        className={shared}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.55" />
        <ellipse cx="32" cy="20" rx="5" ry="10" fill="currentColor" opacity="0.38" />
        <ellipse cx="32" cy="44" rx="5" ry="10" fill="currentColor" opacity="0.38" />
        <ellipse cx="20" cy="32" rx="10" ry="5" fill="currentColor" opacity="0.38" />
        <ellipse cx="44" cy="32" rx="10" ry="5" fill="currentColor" opacity="0.38" />
        <ellipse
          cx="23"
          cy="23"
          rx="8"
          ry="4.5"
          transform="rotate(-45 23 23)"
          fill="currentColor"
          opacity="0.28"
        />
        <ellipse
          cx="41"
          cy="23"
          rx="8"
          ry="4.5"
          transform="rotate(45 41 23)"
          fill="currentColor"
          opacity="0.28"
        />
        <ellipse
          cx="23"
          cy="41"
          rx="8"
          ry="4.5"
          transform="rotate(45 23 41)"
          fill="currentColor"
          opacity="0.28"
        />
        <ellipse
          cx="41"
          cy="41"
          rx="8"
          ry="4.5"
          transform="rotate(-45 41 41)"
          fill="currentColor"
          opacity="0.28"
        />
      </svg>
    );
  }

  if (variant === "roots") {
    return (
      <svg
        className={shared}
        viewBox="0 0 240 56"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M120 4c-2 10-1 18 2 28"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M122 18c-14 6-24 10-38 14M122 22c14 5 26 9 40 12"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.42"
        />
        <path
          d="M100 28c-16 8-28 16-42 26M140 30c18 7 30 14 46 22"
          stroke="currentColor"
          strokeWidth="0.95"
          strokeLinecap="round"
          opacity="0.35"
        />
        <path
          d="M108 34c-10 10-16 16-22 22M132 34c12 9 20 16 28 22"
          stroke="currentColor"
          strokeWidth="0.85"
          strokeLinecap="round"
          opacity="0.28"
        />
        <path
          d="M118 40c-6 6-10 10-14 14M126 40c5 5 9 9 14 14"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.22"
        />
        <circle cx="84" cy="32" r="1.4" fill="currentColor" opacity="0.35" />
        <circle cx="162" cy="34" r="1.4" fill="currentColor" opacity="0.35" />
        <circle cx="60" cy="48" r="1.1" fill="currentColor" opacity="0.28" />
        <circle cx="186" cy="46" r="1.1" fill="currentColor" opacity="0.28" />
      </svg>
    );
  }

  if (variant === "side-left" || variant === "side-right") {
    const flip = variant === "side-right";
    return (
      <svg
        className={shared}
        viewBox="0 0 72 220"
        fill="none"
        aria-hidden="true"
        style={flip ? { transform: "scaleX(-1)" } : undefined}
      >
        <path
          d="M48 8c-6 28-18 48-28 72-8 20-12 40-8 68 3 22 14 42 28 62"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
          opacity="0.42"
        />
        <path
          d="M36 40c-14 4-22 2-28-4M30 78c-12 8-20 10-28 8M28 120c-14 4-22 2-30-2M36 162c-12 8-22 10-30 6"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.32"
        />
        {/* flowers along vine */}
        <g transform="translate(42 52)" opacity="0.7">
          <circle cx="0" cy="0" r="2.2" fill="currentColor" opacity="0.55" />
          <ellipse cx="0" cy="-5" rx="2.4" ry="5" fill="currentColor" opacity="0.4" />
          <ellipse cx="0" cy="5" rx="2.4" ry="5" fill="currentColor" opacity="0.4" />
          <ellipse cx="-5" cy="0" rx="5" ry="2.4" fill="currentColor" opacity="0.4" />
          <ellipse cx="5" cy="0" rx="5" ry="2.4" fill="currentColor" opacity="0.4" />
        </g>
        <g transform="translate(28 112)" opacity="0.65">
          <ellipse cx="0" cy="0" rx="3.5" ry="6" fill="currentColor" opacity="0.35" />
          <path
            d="M0 6c-3-3-4-7-1.5-10 2.5 1 4 4 1.5 10Z"
            fill="currentColor"
            opacity="0.45"
          />
          <path
            d="M0 6c3-3 4-7 1.5-10-2.5 1-4 4-1.5 10Z"
            fill="currentColor"
            opacity="0.45"
          />
        </g>
        <g transform="translate(44 168)" opacity="0.6">
          <circle cx="0" cy="0" r="1.8" fill="currentColor" opacity="0.5" />
          <ellipse cx="0" cy="-4" rx="2" ry="4.2" fill="currentColor" opacity="0.35" />
          <ellipse cx="0" cy="4" rx="2" ry="4.2" fill="currentColor" opacity="0.35" />
          <ellipse cx="-4" cy="0" rx="4.2" ry="2" fill="currentColor" opacity="0.35" />
          <ellipse cx="4" cy="0" rx="4.2" ry="2" fill="currentColor" opacity="0.35" />
        </g>
        {/* root tendrils at bottom */}
        <path
          d="M40 200c-8 6-14 10-20 14M40 204c6 5 12 9 20 12"
          stroke="currentColor"
          strokeWidth="0.85"
          strokeLinecap="round"
          opacity="0.28"
        />
      </svg>
    );
  }

  // Corner variants
  const corners: Record<string, string> = {
    "corner-tl": "",
    "corner-tr": "scaleX(-1)",
    "corner-bl": "scaleY(-1)",
    "corner-br": "scale(-1)",
  };

  return (
    <svg
      className={shared}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      style={{ transform: corners[variant] }}
    >
      <path
        d="M8 8c18 4 34 14 46 30 10 14 16 30 18 48"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M18 10c8 14 10 28 6 42M12 22c16 6 28 16 36 30"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.32"
      />
      <g transform="translate(52 42)" opacity="0.75">
        <circle cx="0" cy="0" r="2.5" fill="currentColor" opacity="0.55" />
        <ellipse cx="0" cy="-6" rx="2.8" ry="5.5" fill="currentColor" opacity="0.38" />
        <ellipse cx="0" cy="6" rx="2.8" ry="5.5" fill="currentColor" opacity="0.38" />
        <ellipse cx="-6" cy="0" rx="5.5" ry="2.8" fill="currentColor" opacity="0.38" />
        <ellipse cx="6" cy="0" rx="5.5" ry="2.8" fill="currentColor" opacity="0.38" />
      </g>
      <g transform="translate(28 28)" opacity="0.65">
        <ellipse cx="0" cy="0" rx="4" ry="7" fill="currentColor" opacity="0.28" />
        <path
          d="M0 7c-3.5-3.5-4.5-8-2-11 2.5 1 4.5 4.5 2 11Z"
          fill="currentColor"
          opacity="0.42"
        />
        <path
          d="M0 7c3.5-3.5 4.5-8 2-11-2.5 1-4.5 4.5-2 11Z"
          fill="currentColor"
          opacity="0.42"
        />
      </g>
      <path
        d="M8 40c-2 8-2 14 0 22M40 8c8-2 14-2 22 0"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.25"
      />
      <circle cx="14" cy="48" r="1.2" fill="currentColor" opacity="0.3" />
      <circle cx="48" cy="14" r="1.2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}
