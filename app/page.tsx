// import prisma from lib/prisma
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSessionId } from "@/lib/session";
import { cookies } from "next/headers";
import { DEFAULT_SCROLL_LABELS } from "@/lib/scrolls";
import CharacterCard from "@/components/CharacterCard";
import TopLinks from "@/components/TopLinks";
import CreateCharacterForm from "@/components/CreateCharacterForm";
import { randomUUID } from "crypto";

// server action to create a new character
async function createCharacter(characterData: FormData) {

  "use server";

  // get sessionId from cookies
  let sessionId = await getSessionId();

  // if no sessionId, create one
  if (!sessionId) {
    sessionId = randomUUID();
    const cookieStore = await cookies();
    cookieStore.set("sessionId", sessionId, { path: "/", httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 31536000 }); // expires in 1 year 
  }

  const name = characterData.get("name") as string;

  if (!name) {
    throw new Error("Name is required");
  }

  await prisma.character.create({
    data: {
      name,
      sessionId,
      scrolls: {
        create: DEFAULT_SCROLL_LABELS.map((label) => ({
          label,
          effect: "",
        })),
      }
    },
  });

  revalidatePath("/");
}

// function to delete a character
async function deleteCharacter(characterData: FormData) {

  "use server";

  // get sessionId and character id from form data
  const characterId = characterData.get("id") as string;
  const sessionId = await getSessionId();

  // if no sessionId, show error message
  if (!sessionId) {
    throw new Error("No session found");
  }

  await prisma.character.deleteMany({
    where: {
      id: characterId,
      sessionId,
    },
  });

  revalidatePath("/");
}

// home function
export default async function Home() {

  // get sessionId from cookies
  const sessionId = await getSessionId();

  // get characters from Neon database
  // only get characters if sessionId exists
  const characters = sessionId ? await prisma.character.findMany({
    where: { sessionId },
  }) : [];

  return (
    <main className="relative min-h-screen text-white flex flex-col items-center p-6">
      <div className="w-full max-w-4xl mb-8">

        {/* Mobile Layout */}
        <div className="flex flex-col items-center gap-4 sm:hidden">
          <h1 className="text-2xl text-center">Barony Scroll Tracker</h1>
          <TopLinks />
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex relative items-center justify-center">

          <h1 className="text-2xl text-center">Barony Scroll Tracker</h1>

          <div className="absolute right-0"><TopLinks /></div>

        </div>

      </div>




      <CreateCharacterForm action={createCharacter} />

      <h2 className="mb-4 text-center">Characters</h2>

      {characters.length === 0 && <p>No characters yet.</p>}

      {/* character cards */}
      <div className="flex flex-wrap gap-6 justify-center w-full max-w-4xl">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            id={character.id}
            name={character.name}
            deleteAction={deleteCharacter}
          />
        ))}
      </div>
    </main>
  );
}