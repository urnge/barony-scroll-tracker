-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scroll" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "effect" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "Scroll_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Scroll" ADD CONSTRAINT "Scroll_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
