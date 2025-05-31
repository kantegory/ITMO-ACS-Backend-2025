/*
  Warnings:

  - Added the required column `expired_rate` to the `auction_participants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auction_participants" ADD COLUMN     "expired_rate" TIMESTAMP(3) NULL;
