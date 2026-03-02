import { cookies } from "next/headers";
import { randomUUID } from "crypto";

// function that gets a sessionId
export async function getSessionId() {

    const cookieStore = await cookies();

    const sessionId = cookieStore.get("sessionId")?.value ?? null;

    return sessionId;
}

// function that gets or creates a sessionId
export async function getOrCreateSessionId() {

"use server";

  // get sessionId from cookies
  const cookieStore = await cookies();
  let sessionId = cookieStore.get("sessionId")?.value;

  // if sessionId doesn't exist, create a new one and set it in cookies
  if (!sessionId) {
    sessionId = randomUUID();
    cookieStore.set("sessionId", sessionId, { path: "/", httpOnly: true });
  }

  return sessionId;
}