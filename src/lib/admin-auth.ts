import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "ggea_admin_session";
const sessionDurationSeconds = 60 * 60 * 8;

type SessionPayload = { email: string; expiresAt: number };

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET est manquant.");
  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

export function createSessionValue(email: string) {
  const payload = Buffer.from(
    JSON.stringify({ email, expiresAt: Date.now() + sessionDurationSeconds * 1000 })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function verifySessionValue(value: string | undefined): SessionPayload | null {
  if (!value) return null;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const signaturesMatch =
    signature.length === expected.length &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!signaturesMatch) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as SessionPayload;
    return session.expiresAt > Date.now() ? session : null;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const store = await cookies();
  return verifySessionValue(store.get(cookieName)?.value);
}

export function setAdminSession(response: { cookies: { set: (name: string, value: string, options: Record<string, unknown>) => void } }, email: string) {
  response.cookies.set(cookieName, createSessionValue(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: sessionDurationSeconds,
  });
}

export function clearAdminSession(response: { cookies: { set: (name: string, value: string, options: Record<string, unknown>) => void } }) {
  response.cookies.set(cookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
