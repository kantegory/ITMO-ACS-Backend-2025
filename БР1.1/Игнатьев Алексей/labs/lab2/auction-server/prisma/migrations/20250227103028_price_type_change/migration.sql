/*
  Warnings:

  - You are about to alter the column `start_price` on the `auctions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `end_price` on the `auctions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `reservation_price` on the `auctions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "auctions" ALTER COLUMN "start_price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "end_price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "reservation_price" SET DATA TYPE DOUBLE PRECISION;
