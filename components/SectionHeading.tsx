import FloralMotif from "@/components/FloralMotif";

type SectionHeadingProps = {
  children: string;
  useDisplayFont?: boolean;
  size?: "sm" | "lg";
};

export default function SectionHeading({
  children,
  useDisplayFont = true,
  size = "lg",
}: SectionHeadingProps) {
  const isLarge = size === "lg";

  return (
    <div className="section-heading">
      <FloralMotif variant="bloom" className="section-heading__bloom" />
      <h2
        className={`section-heading__title ${
          useDisplayFont ? "font-display" : ""
        } ${isLarge ? "section-heading__title--lg" : "section-heading__title--sm"}`}
      >
        {children}
      </h2>
      <FloralMotif variant="divider" className="section-heading__divider" />
    </div>
  );
}
