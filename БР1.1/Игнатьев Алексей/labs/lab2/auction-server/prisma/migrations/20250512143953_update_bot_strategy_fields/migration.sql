/*
  Warnings:

  - You are about to drop the column `max_participants_on_activate` on the `bot_strategies` table. All the data in the column will be lost.
  - You are about to drop the column `min_participants_on_activate` on the `bot_strategies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bot_strategies" DROP COLUMN "max_participants_on_activate",
DROP COLUMN "min_participants_on_activate",
ADD COLUMN     "max_active_participants" INTEGER,
ADD COLUMN     "max_auction_participants" INTEGER,
ADD COLUMN     "max_rato_increase" INTEGER,
ADD COLUMN     "min_active_participants" INTEGER,
ADD COLUMN     "min_auction_participants" INTEGER,
ADD COLUMN     "min_bid_interval" INTEGER,
ADD COLUMN     "min_rato_increase" INTEGER,
ADD COLUMN     "time_from_end" INTEGER,
ADD COLUMN     "time_to_start" INTEGER;
