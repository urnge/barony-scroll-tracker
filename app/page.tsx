// import prisma from lib/prisma
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSessionId } from "@/lib/session";
import { getOrCreateSessionId } from "@/lib/session";
import { DEFAULT_SCROLL_LABELS } from "@/lib/scrolls";
import CharacterCard from "@/components/CharacterCard";
import TopLinks from "@/components/TopLinks";
import CreateCharacterForm from "@/components/CreateCharacterForm";

// server action to create a new character
async function createCharacter(characterData: FormData) {

  "use server";

  // get sessionId from cookies
  const sessionId = await getOrCreateSessionId();

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
      <h1 className="text-2xl mb-6 text-center">Barony Scroll Tracker</h1>
      <TopLinks />

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