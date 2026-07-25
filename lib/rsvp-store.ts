import { promises as fs } from "fs";
import path from "path";

export type RsvpKind = "coming" | "not-coming";

export type ComingEntry = {
  id: string;
  name: string;
  message: string;
  language: "en" | "ar";
  submittedAt: string;
};

export type DeclineEntry = {
  id: string;
  name: string;
  reason: string;
  language: "en" | "ar";
  submittedAt: string;
};

export type RsvpEntry = ComingEntry | DeclineEntry;

const RELATIVE_PATHS: Record<RsvpKind, string> = {
  coming: "data/rsvp/coming.json",
  "not-coming": "data/rsvp/not-coming.json",
};

function localPath(kind: RsvpKind) {
  return path.join(process.cwd(), RELATIVE_PATHS[kind]);
}

function githubConfig() {
  const token =
    process.env.RSVP_GITHUB_TOKEN?.trim() ||
    process.env.GITHUB_TOKEN?.trim() ||
    "";

  const repoFromEnv = process.env.RSVP_GITHUB_REPO?.trim();
  const owner =
    process.env.VERCEL_GIT_REPO_OWNER?.trim() ||
    (repoFromEnv?.includes("/") ? repoFromEnv.split("/")[0] : "");
  const repo =
    process.env.VERCEL_GIT_REPO_SLUG?.trim() ||
    (repoFromEnv?.includes("/") ? repoFromEnv.split("/")[1] : "");

  const branch =
    process.env.RSVP_GITHUB_BRANCH?.trim() ||
    process.env.VERCEL_GIT_COMMIT_REF?.trim() ||
    "main";

  if (!token || !owner || !repo) return null;

  return { token, owner, repo, branch };
}

function useGitHubStore() {
  // Hosted platforms (e.g. Vercel) have a read-only app filesystem.
  return Boolean(process.env.VERCEL) || Boolean(githubConfig());
}

async function readLocalEntries<T>(kind: RsvpKind): Promise<T[]> {
  const filePath = localPath(kind);
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

async function writeLocalEntries(kind: RsvpKind, entries: RsvpEntry[]) {
  const dir = path.join(process.cwd(), "data", "rsvp");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    localPath(kind),
    `${JSON.stringify(entries, null, 2)}\n`,
    "utf8",
  );
}

type GitHubContentResponse = {
  sha?: string;
  content?: string;
  encoding?: string;
  message?: string;
};

async function githubRequest(
  url: string,
  token: string,
  init?: RequestInit,
): Promise<Response> {
  return fetch(url, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "invitation-rsvp",
      ...(init?.headers ?? {}),
    },
  });
}

async function readGitHubEntries<T>(kind: RsvpKind): Promise<{
  entries: T[];
  sha: string | null;
}> {
  const config = githubConfig();
  if (!config) {
    throw new Error(
      "Missing RSVP_GITHUB_TOKEN and repo settings for hosted RSVP storage.",
    );
  }

  const filePath = RELATIVE_PATHS[kind];
  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${filePath}?ref=${encodeURIComponent(config.branch)}`;
  const response = await githubRequest(url, config.token);

  if (response.status === 404) {
    return { entries: [], sha: null };
  }

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GitHub read failed (${response.status}): ${detail}`);
  }

  const data = (await response.json()) as GitHubContentResponse;
  if (!data.content || data.encoding !== "base64") {
    return { entries: [], sha: data.sha ?? null };
  }

  const raw = Buffer.from(data.content.replace(/\n/g, ""), "base64").toString(
    "utf8",
  );
  const parsed: unknown = JSON.parse(raw || "[]");
  return {
    entries: Array.isArray(parsed) ? (parsed as T[]) : [],
    sha: data.sha ?? null,
  };
}

async function writeGitHubEntries(
  kind: RsvpKind,
  entries: RsvpEntry[],
  sha: string | null,
  guestName: string,
) {
  const config = githubConfig();
  if (!config) {
    throw new Error(
      "Missing RSVP_GITHUB_TOKEN and repo settings for hosted RSVP storage.",
    );
  }

  const filePath = RELATIVE_PATHS[kind];
  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${filePath}`;
  const body = {
    message: `rsvp: ${kind} — ${guestName}`,
    content: Buffer.from(`${JSON.stringify(entries, null, 2)}\n`, "utf8").toString(
      "base64",
    ),
    branch: config.branch,
    ...(sha ? { sha } : {}),
  };

  const response = await githubRequest(url, config.token, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text();
    const error = new Error(
      `GitHub write failed (${response.status}): ${detail}`,
    ) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }
}

async function appendViaGitHub(kind: RsvpKind, entry: RsvpEntry) {
  let lastError: unknown;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      if (kind === "coming") {
        const { entries, sha } = await readGitHubEntries<ComingEntry>(kind);
        entries.push(entry as ComingEntry);
        await writeGitHubEntries(kind, entries, sha, entry.name);
        return;
      }

      const { entries, sha } = await readGitHubEntries<DeclineEntry>(kind);
      entries.push(entry as DeclineEntry);
      await writeGitHubEntries(kind, entries, sha, entry.name);
      return;
    } catch (error) {
      lastError = error;
      const status =
        error && typeof error === "object" && "status" in error
          ? (error as { status?: number }).status
          : undefined;
      // 409 = concurrent update; re-read and retry.
      if (status !== 409) throw error;
    }
  }

  throw lastError;
}

export async function appendRsvpEntry(
  kind: RsvpKind,
  entry: RsvpEntry,
): Promise<void> {
  if (useGitHubStore() && githubConfig()) {
    await appendViaGitHub(kind, entry);
    return;
  }

  if (process.env.VERCEL) {
    throw new Error(
      "Hosted RSVP needs RSVP_GITHUB_TOKEN (and repo access). Local file writes do not work on Vercel.",
    );
  }

  if (kind === "coming") {
    const entries = await readLocalEntries<ComingEntry>(kind);
    entries.push(entry as ComingEntry);
    await writeLocalEntries(kind, entries);
    return;
  }

  const entries = await readLocalEntries<DeclineEntry>(kind);
  entries.push(entry as DeclineEntry);
  await writeLocalEntries(kind, entries);
}
