// component that displays links
"use client";

import { useState } from "react";

export default function TopLinks() {

    const [showInfo, setShowInfo] = useState(false);

    const content = `
BARONY SCROLL TRACKER

OVERVIEW
This is a fan-made web app that allows users to conveniently track the
discovery of scrolls in the video game Barony.

USAGE
- When you start a Barony run, create a character with the same name.
- A database is created for that character.
- Record scroll effects as you discover them in-game.
- Multiple runs can be tracked independently by creating separate characters for each run.

DISCLAIMER
This app is fan-made and not affiliated with the developers of Barony.
`.trim();

    const longestLine = content.split("\n").reduce((max, line) => Math.max(max, line.length), 0);
    const divider = "-".repeat(longestLine);

    return (
        <div className="flex gap-4 text-sm sm:text-base">
            <a
                href="https://github.com/urnge/barony-scroll-tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
            >
                [ GitHub ]
            </a>

            <span className="mx-4"></span>

            <button
                className="hover:underline"
                onClick={() => setShowInfo(true)}
            >
                [ Info ]
            </button>

            {showInfo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
                    onClick={() => setShowInfo(false)}
                >
                    <div className="border border-white p-6 text-left bg-black inline-block"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <pre className="whitespace-pre-wrap">
                            {`${divider}\n${content}\n${divider}`}
                        </pre>

                        <div className="mt-4 text-center">
                            <button
                                className="hover:underline"
                                onClick={() => setShowInfo(false)}
                            >
                                [ Close ]
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}