/*
  Warnings:

  - You are about to drop the column `text` on the `auction_brands` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `auction_categories` table. All the data in the column will be lost.
  - Added the required column `title` to the `auction_brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `auction_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auction_brands" DROP COLUMN "text",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "auction_categories" DROP COLUMN "text",
ADD COLUMN     "title" TEXT NOT NULL;
