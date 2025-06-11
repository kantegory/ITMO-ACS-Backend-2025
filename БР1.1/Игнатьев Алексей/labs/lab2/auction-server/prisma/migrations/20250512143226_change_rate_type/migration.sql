/*
  Warnings:

  - You are about to alter the column `rate` on the `auction_participants` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "auction_participants" ALTER COLUMN "rate" SET DATA TYPE INTEGER;
