/*
  Warnings:

  - You are about to drop the column `rate` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `state` to the `auctions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exchange_rate` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuctionState" AS ENUM ('PAYMENT', 'DELIVERY', 'OBTAINING', 'REVIEW');

-- AlterTable
ALTER TABLE "auctions" ADD COLUMN     "state" "AuctionState" NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "rate",
ADD COLUMN     "exchange_rate" DOUBLE PRECISION NOT NULL;
