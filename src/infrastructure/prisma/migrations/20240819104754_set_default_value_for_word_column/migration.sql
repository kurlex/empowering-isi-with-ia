-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "isTreated" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Word" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
