// helper module that stores server actions for the character page, such as updating scroll effects
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// function to update scroll effect
export async function updateScrollEffect(scrolldId: string, scrollEffect: string, characterId: string) {

    await prisma.scroll.update({
        where: { id: scrolldId },
        data: { effect: scrollEffect },
    });

    revalidatePath(`/character/${characterId}`);
}