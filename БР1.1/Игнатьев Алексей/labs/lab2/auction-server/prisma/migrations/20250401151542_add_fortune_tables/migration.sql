-- CreateEnum
CREATE TYPE "SpinItemType" AS ENUM ('RATO', 'OTHER');

-- CreateTable
CREATE TABLE "spin_items" (
    "spin_item_id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "image_url" TEXT,
    "amount" INTEGER,
    "probability" DOUBLE PRECISION NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "type" "SpinItemType" NOT NULL,

    CONSTRAINT "spin_items_pkey" PRIMARY KEY ("spin_item_id")
);
