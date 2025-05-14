/*
  Warnings:

  - You are about to drop the column `title` on the `auction_brands` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `auction_categories` table. All the data in the column will be lost.
  - You are about to alter the column `value` on the `notifications` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to drop the `localiztions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `text` to the `auction_brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `auction_categories` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LocalizationType" AS ENUM ('BRAND_TITLE', 'CATEGORY_TITLE', 'NEWS_TITLE', 'NEWS_TEXT', 'FAQ_QUESTION', 'FAQ_ANSWER');

-- DropForeignKey
ALTER TABLE "localiztions" DROP CONSTRAINT "localiztions_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "localiztions" DROP CONSTRAINT "localiztions_category_id_fkey";

-- DropForeignKey
ALTER TABLE "localiztions" DROP CONSTRAINT "localiztions_faq_id_fkey";

-- DropForeignKey
ALTER TABLE "localiztions" DROP CONSTRAINT "localiztions_news_id_fkey";

-- AlterTable
ALTER TABLE "auction_brands" DROP COLUMN "title",
ADD COLUMN     "text" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "auction_categories" DROP COLUMN "title",
ADD COLUMN     "text" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "notifications" ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "localiztions";

-- CreateTable
CREATE TABLE "localizations" (
    "locale_id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "reference_id" INTEGER NOT NULL,

    CONSTRAINT "localizations_pkey" PRIMARY KEY ("locale_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "localizations_locale_id_type_key" ON "localizations"("locale_id", "type");
