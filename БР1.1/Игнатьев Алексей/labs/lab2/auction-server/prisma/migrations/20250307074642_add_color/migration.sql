/*
  Warnings:

  - Made the column `announce_time` on table `auctions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `auctions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "auctions" ALTER COLUMN "announce_time" SET NOT NULL,
ALTER COLUMN "color" SET NOT NULL;
