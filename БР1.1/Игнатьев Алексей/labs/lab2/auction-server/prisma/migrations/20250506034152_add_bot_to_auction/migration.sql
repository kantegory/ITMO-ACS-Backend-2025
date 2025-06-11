/*
  Warnings:

  - Added the required column `auction_id` to the `bots` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bots" ADD COLUMN     "auction_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "bots" ADD CONSTRAINT "bots_auction_id_fkey" FOREIGN KEY ("auction_id") REFERENCES "auctions"("auction_id") ON DELETE RESTRICT ON UPDATE CASCADE;
