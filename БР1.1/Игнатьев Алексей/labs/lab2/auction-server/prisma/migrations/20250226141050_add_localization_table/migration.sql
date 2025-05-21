-- CreateTable
CREATE TABLE "Localization" (
    "id" SERIAL NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "brand_id" INTEGER,
    "category_id" INTEGER,

    CONSTRAINT "Localization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Localization_locale_brand_id_key" ON "Localization"("locale", "brand_id");

-- CreateIndex
CREATE UNIQUE INDEX "Localization_locale_category_id_key" ON "Localization"("locale", "category_id");

-- AddForeignKey
ALTER TABLE "Localization" ADD CONSTRAINT "Localization_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "auction_brands"("auction_brand_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Localization" ADD CONSTRAINT "Localization_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "auction_categories"("auction_category_id") ON DELETE SET NULL ON UPDATE CASCADE;
