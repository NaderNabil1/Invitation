import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RsvpKind = "coming" | "not-coming";

type RsvpPayload = {
  kind?: unknown;
  name?: unknown;
  message?: unknown;
  language?: unknown;
};

type ComingEntry = {
  id: string;
  name: string;
  message: string;
  language: "en" | "ar";
  submittedAt: string;
};

type DeclineEntry = {
  id: string;
  name: string;
  reason: string;
  language: "en" | "ar";
  submittedAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data", "rsvp");
const MAX_NAME = 120;
const MAX_TEXT = 1000;

function fileFor(kind: RsvpKind) {
  return path.join(
    DATA_DIR,
    kind === "coming" ? "coming.json" : "not-coming.json",
  );
}

function cleanText(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().replace(/\s+/g, " ");
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

async function readEntries<T>(filePath: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? (error as { code?: string }).code
        : undefined;
    if (code === "ENOENT") return [];
    throw error;
  }
}

export async function POST(request: Request) {
  let body: RsvpPayload;

  try {
    body = (await request.json()) as RsvpPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const kind = body.kind;
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

  await fs.mkdir(DATA_DIR, { recursive: true });

  const filePath = fileFor(kind);
  const submittedAt = new Date().toISOString();
  const id = randomUUID();

  if (kind === "coming") {
    const entries = await readEntries<ComingEntry>(filePath);
    entries.push({ id, name, message, language, submittedAt });
    await fs.writeFile(filePath, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
  } else {
    const entries = await readEntries<DeclineEntry>(filePath);
    entries.push({
      id,
      name,
      reason: message,
      language,
      submittedAt,
    });
    await fs.writeFile(filePath, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
  }

  return NextResponse.json({ ok: true });
}
