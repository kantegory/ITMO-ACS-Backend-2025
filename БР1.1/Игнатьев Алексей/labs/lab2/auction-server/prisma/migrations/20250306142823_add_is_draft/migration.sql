-- AlterTable
ALTER TABLE "auctions" ADD COLUMN     "is_draft" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "max_participants" DROP NOT NULL,
ALTER COLUMN "end_time" DROP NOT NULL;
