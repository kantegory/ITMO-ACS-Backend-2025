/*
  Warnings:

  - The primary key for the `localiztions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `localiztions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[locale,news_id]` on the table `localiztions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[locale,faq_id]` on the table `localiztions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "localiztions" DROP CONSTRAINT "localiztions_pkey",
DROP COLUMN "id",
ADD COLUMN     "faq_id" INTEGER,
ADD COLUMN     "locale_id" SERIAL NOT NULL,
ADD COLUMN     "news_id" INTEGER,
ADD CONSTRAINT "localiztions_pkey" PRIMARY KEY ("locale_id");

-- CreateTable
CREATE TABLE "news" (
    "news_id" SERIAL NOT NULL,
    "image_url" TEXT,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "news_pkey" PRIMARY KEY ("news_id")
);

-- CreateTable
CREATE TABLE "faqs" (
    "faq_id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("faq_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "localiztions_locale_news_id_key" ON "localiztions"("locale", "news_id");

-- CreateIndex
CREATE UNIQUE INDEX "localiztions_locale_faq_id_key" ON "localiztions"("locale", "faq_id");

-- AddForeignKey
ALTER TABLE "localiztions" ADD CONSTRAINT "localiztions_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "news"("news_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localiztions" ADD CONSTRAINT "localiztions_faq_id_fkey" FOREIGN KEY ("faq_id") REFERENCES "faqs"("faq_id") ON DELETE SET NULL ON UPDATE CASCADE;
