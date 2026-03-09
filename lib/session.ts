import { cookies } from "next/headers";

// function that gets a sessionId
export async function getSessionId() {

    const cookieStore = await cookies();

    const sessionId = cookieStore.get("sessionId")?.value ?? null;

    return sessionId;
}