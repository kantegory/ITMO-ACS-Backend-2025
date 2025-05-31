/*
  Warnings:

  - The primary key for the `auction_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `auction_brand_id` on the `auction_categories` table. All the data in the column will be lost.
  - You are about to drop the column `auctionCategoryAuction_brand_id` on the `auctions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "auctions" DROP CONSTRAINT "auctions_auctionCategoryAuction_brand_id_fkey";

-- AlterTable
ALTER TABLE "auction_categories" DROP CONSTRAINT "auction_categories_pkey",
DROP COLUMN "auction_brand_id",
ADD COLUMN     "auction_category_id" SERIAL NOT NULL,
ADD CONSTRAINT "auction_categories_pkey" PRIMARY KEY ("auction_category_id");

-- AlterTable
ALTER TABLE "auctions" DROP COLUMN "auctionCategoryAuction_brand_id",
ADD COLUMN     "category_id" INTEGER;

-- AddForeignKey
ALTER TABLE "auctions" ADD CONSTRAINT "auctions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "auction_categories"("auction_category_id") ON DELETE SET NULL ON UPDATE CASCADE;
