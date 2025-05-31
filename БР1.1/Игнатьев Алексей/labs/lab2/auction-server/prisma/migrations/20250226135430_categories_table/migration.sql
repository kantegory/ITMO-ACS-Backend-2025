/*
  Warnings:

  - You are about to drop the column `category` on the `auctions` table. All the data in the column will be lost.
  - Added the required column `auctionCategoryAuction_brand_id` to the `auctions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auctions" DROP COLUMN "category",
ADD COLUMN     "auctionCategoryAuction_brand_id" INTEGER NULL;

-- DropEnum
DROP TYPE "AuctionCategory";

-- CreateTable
CREATE TABLE "auction_categories" (
    "auction_brand_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "auction_categories_pkey" PRIMARY KEY ("auction_brand_id")
);

-- AddForeignKey
ALTER TABLE "auctions" ADD CONSTRAINT "auctions_auctionCategoryAuction_brand_id_fkey" FOREIGN KEY ("auctionCategoryAuction_brand_id") REFERENCES "auction_categories"("auction_brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;
