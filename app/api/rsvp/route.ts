import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { appendRsvpEntry, type RsvpKind } from "@/lib/rsvp-store";

export const runtime = "nodejs";

type RsvpPayload = {
  kind?: unknown;
  name?: unknown;
  message?: unknown;
  language?: unknown;
};

const MAX_NAME = 120;
const MAX_TEXT = 1000;

function cleanText(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().replace(/\s+/g, " ");
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

export async function POST(request: Request) {
  let body: RsvpPayload;

  try {
    body = (await request.json()) as RsvpPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const kind = body.kind as RsvpKind | unknown;
  if (kind !== "coming" && kind !== "not-coming") {
    return NextResponse.json({ error: "Invalid kind" }, { status: 400 });
  }

  const name = cleanText(body.name, MAX_NAME);
  const message = cleanText(body.message, MAX_TEXT);
  const language = body.language === "ar" ? "ar" : "en";

  if (!name || !message) {
    return NextResponse.json(
      { error: "Name and message are required" },
      { status: 400 },
    );
  }

  const submittedAt = new Date().toISOString();
  const id = randomUUID();

  try {
    if (kind === "coming") {
      await appendRsvpEntry("coming", {
        id,
        name,
        message,
        language,
        submittedAt,
      });
    } else {
      await appendRsvpEntry("not-coming", {
        id,
        name,
        reason: message,
        language,
        submittedAt,
      });
    }
  } catch (error) {
    const detail =
      error instanceof Error ? error.message : "Failed to save RSVP";
    console.error("[rsvp]", detail);
    return NextResponse.json({ error: detail }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
