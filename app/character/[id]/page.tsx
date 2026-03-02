import { prisma } from "@/lib/prisma";
import { getSessionId } from "@/lib/session";
import { DEFAULT_SCROLL_LABELS } from "@/lib/scrolls";
import ScrollTable from "@/components/ScrollTable";


// function to display the character page
export default async function CharacterPage({ params }: { params: Promise<{ id: string }>; }) {

    const { id } = await params; 

    const sessionId = await getSessionId();

    if (!sessionId) {
        throw new Error("No session found");
    }

    // fetch the character
    const character = await prisma.character.findFirst({
        where: {
            id: id,
            sessionId,
        },
        include: {
            scrolls: true,
        },
    });

    if (!character) {
        throw new Error("Character not found");
    }

    // sort the scrolls
    const sortedScrolls = [...character.scrolls].sort(
        (a, b) => 
            DEFAULT_SCROLL_LABELS.indexOf(a.label) - DEFAULT_SCROLL_LABELS.indexOf(b.label)
    );

    return (
        <main style={{ padding: "20px" }}>
            <h1>{character.name}</h1>
            <ScrollTable scrolls={sortedScrolls} characterId={character.id} />
        </main>
    );
}