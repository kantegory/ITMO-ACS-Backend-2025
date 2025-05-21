/*
  Warnings:

  - Added the required column `announce_time` to the `auctions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `auctions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auctions" ADD COLUMN     "announce_time" TIMESTAMP(3) NULL,
ADD COLUMN     "color" VARCHAR(7) NULL;
