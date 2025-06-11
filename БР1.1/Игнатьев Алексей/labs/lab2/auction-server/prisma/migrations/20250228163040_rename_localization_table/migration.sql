/*
  Warnings:

  - You are about to drop the `Localization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Localization" DROP CONSTRAINT "Localization_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "Localization" DROP CONSTRAINT "Localization_category_id_fkey";

-- DropTable
DROP TABLE "Localization";

-- CreateTable
CREATE TABLE "localiztions" (
    "id" SERIAL NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "brand_id" INTEGER,
    "category_id" INTEGER,

    CONSTRAINT "localiztions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "localiztions_locale_brand_id_key" ON "localiztions"("locale", "brand_id");

-- CreateIndex
CREATE UNIQUE INDEX "localiztions_locale_category_id_key" ON "localiztions"("locale", "category_id");

-- AddForeignKey
ALTER TABLE "localiztions" ADD CONSTRAINT "localiztions_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "auction_brands"("auction_brand_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localiztions" ADD CONSTRAINT "localiztions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "auction_categories"("auction_category_id") ON DELETE SET NULL ON UPDATE CASCADE;
