/*
  Warnings:

  - The primary key for the `localiztions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `localiztions` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "localiztions_locale_faq_id_key";

-- DropIndex
DROP INDEX "localiztions_locale_news_id_key";

-- AlterTable
ALTER TABLE "localiztions" DROP CONSTRAINT "localiztions_pkey",
DROP COLUMN "id",
ADD COLUMN     "locale_id" SERIAL NOT NULL,
ADD CONSTRAINT "localiztions_pkey" PRIMARY KEY ("locale_id");
