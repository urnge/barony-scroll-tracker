// component file for the scroll table
"use client";
import { updateScrollEffect } from "@/app/character/[id]/actions";
import { DEFAULT_SCROLL_EFFECTS } from "@/lib/scrolls";
import { useState } from "react";

type Scroll = {
    id: string;
    label: string;
    effect: string | null;
}

type Props = {
    scrolls: Scroll[];
    characterId: string;
}



// function that displays the scroll table
// includes the label and effect of each scroll, and allows the user to edit the effect of each scroll
// editing effects uses dropdown functionality
export default function ScrollTable({ scrolls, characterId }: Props) {
    
    // create a local state for the scrolls, initialized with the scrolls prop
    const [localScrolls, setLocalScrolls] = useState(scrolls);

    return (
        <table className="border-collapse border border-gray-400 w-auto">
            <thead>
                <tr>
                    <th className="border px-2 py-1 text-left">Label</th>
                    <th className="border px-2 py-1 text-left">Effect</th>
                </tr>
            </thead>
            <tbody>
                {localScrolls.map((scroll) => (
                    <tr key={scroll.id}>
                        <td className="border px-2 py-1 whitespace-nowrap">
                            {scroll.label}
                        </td>
                        <td className="border px-2 py-1 whitespace-nowrap">
                            <select value={scroll.effect ?? ""}
                                onChange={(e) => {
                                    
                                    const newEffect = e.target.value;

                                    // update the local state with the new effect
                                    setLocalScrolls((prevScrolls) =>
                                        prevScrolls.map((s) =>
                                            s.id === scroll.id ? { ...s, effect: newEffect } : s
                                        )
                                    );

                                    // call the server action to update the effect in the database
                                    updateScrollEffect(scroll.id, newEffect, characterId);
                                }}
                                className="border rounded px-1 py-0.5"
                            >
                                <option value="">--</option>
                                {DEFAULT_SCROLL_EFFECTS.map((effect) => (
                                    <option key={effect} value={effect}>
                                        {effect}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}