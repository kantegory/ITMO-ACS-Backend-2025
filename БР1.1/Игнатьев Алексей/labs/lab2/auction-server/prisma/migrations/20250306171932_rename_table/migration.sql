/*
  Warnings:

  - You are about to drop the `AuctionImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuctionImage" DROP CONSTRAINT "AuctionImage_auction_id_fkey";

-- DropTable
DROP TABLE "AuctionImage";

-- CreateTable
CREATE TABLE "auction_images" (
    "auction_image_id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "auction_id" INTEGER NOT NULL,

    CONSTRAINT "auction_images_pkey" PRIMARY KEY ("auction_image_id")
);

-- AddForeignKey
ALTER TABLE "auction_images" ADD CONSTRAINT "auction_images_auction_id_fkey" FOREIGN KEY ("auction_id") REFERENCES "auctions"("auction_id") ON DELETE CASCADE ON UPDATE CASCADE;
