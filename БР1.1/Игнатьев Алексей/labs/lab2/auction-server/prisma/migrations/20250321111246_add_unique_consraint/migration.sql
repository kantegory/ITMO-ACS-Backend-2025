/*
  Warnings:

  - A unique constraint covering the columns `[locale,news_id]` on the table `localiztions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[locale,faq_id]` on the table `localiztions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "localiztions_locale_news_id_key" ON "localiztions"("locale", "news_id");

-- CreateIndex
CREATE UNIQUE INDEX "localiztions_locale_faq_id_key" ON "localiztions"("locale", "faq_id");
