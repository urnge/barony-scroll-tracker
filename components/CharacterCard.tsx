// component module for the character card, which displays the character's name, open and delete buttons on the main page
"use client";

import Link from "next/link";

type Props = {
    id: string;
    name: string;
    deleteAction: (characterData: FormData) => void;
}

export default function CharacterCard({ id, name, deleteAction }: Props) {

    // method that handles the delete action when the delete button is clicked
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {

        const confirmed = window.confirm("Are you sure you want to delete this character?");

        if (!confirmed) {
            event.preventDefault();
        }
    }

    return (
        <div className="p-4 inline-block">
            <div className="border-t border-white/50"></div>

            <div>{name}</div>

            <div className="mt-1">
                <Link href={`/character/${id}`} className="hover:underline">
                    [ Open ]
                </Link>

                <span className="mx-3"></span>
                <form action={deleteAction} className="inline">
                    <input type="hidden" name="id" value={id} />
                    <button type="submit" className="hover:underline" onClick={handleDelete}>
                        [ Delete ]
                    </button>
                </form>
            </div>

            <div className="border-t border-white/50 mt-1"></div>
        </div>
    )
}