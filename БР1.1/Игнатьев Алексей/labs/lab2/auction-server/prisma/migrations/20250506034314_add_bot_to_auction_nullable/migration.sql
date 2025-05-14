-- DropForeignKey
ALTER TABLE "bots" DROP CONSTRAINT "bots_auction_id_fkey";

-- AlterTable
ALTER TABLE "bots" ALTER COLUMN "auction_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "bots" ADD CONSTRAINT "bots_auction_id_fkey" FOREIGN KEY ("auction_id") REFERENCES "auctions"("auction_id") ON DELETE SET NULL ON UPDATE CASCADE;
