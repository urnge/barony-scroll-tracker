// component for creating a new character

export default function CreateCharacterForm({ action, }: { action: (formData: FormData) => void; }) {

    return (
        <div className="mb-8 text-center w-full max-w-md space-y-4">
            <div className="border-t border-white/50"></div>

            <form action={action} className="text-center">
                <input
                    type="text"
                    name="name"
                    placeholder="Enter character Name"
                    required
                    className="border border-white px-2 py-1 outline-none"
                />
                <button
                    type="submit"
                    className="ml-3 hover:underline"
                >
                    [ Add Character ]
                </button>
            </form>
            <div className="border-t border-white/50"></div>
        </div>
    );
}