/*
  Warnings:

  - You are about to drop the column `image` on the `auctions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auctions" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "AuctionImage" (
    "auction_image_id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "auction_id" INTEGER NOT NULL,

    CONSTRAINT "AuctionImage_pkey" PRIMARY KEY ("auction_image_id")
);

-- AddForeignKey
ALTER TABLE "AuctionImage" ADD CONSTRAINT "AuctionImage_auction_id_fkey" FOREIGN KEY ("auction_id") REFERENCES "auctions"("auction_id") ON DELETE CASCADE ON UPDATE CASCADE;
