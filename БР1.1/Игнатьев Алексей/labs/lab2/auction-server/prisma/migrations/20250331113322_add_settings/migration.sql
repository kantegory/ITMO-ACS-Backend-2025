-- AlterTable
ALTER TABLE "auctions" ADD COLUMN     "free_spin_amount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "free_spin_amount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "settings" (
    "settings_id" SERIAL NOT NULL,
    "cost_per_spin" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("settings_id")
);
