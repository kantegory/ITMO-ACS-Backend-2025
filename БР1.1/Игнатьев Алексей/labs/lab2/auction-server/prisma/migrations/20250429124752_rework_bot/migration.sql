/*
  Warnings:

  - The values [AGGRESSIVE,SAFE,THRESHOLD] on the enum `BotStrategyType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `max_bid` on the `bot_strategies` table. All the data in the column will be lost.
  - You are about to drop the column `max_outbid_amount` on the `bot_strategies` table. All the data in the column will be lost.
  - You are about to drop the column `max_participants_with_bid` on the `bot_strategies` table. All the data in the column will be lost.
  - You are about to drop the column `max_seconds_before_end` on the `bot_strategies` table. All the data in the column will be lost.
  - You are about to drop the column `min_bid` on the `bot_strategies` table. All the data in the column will be lost.
  - You are about to drop the column `min_interval` on the `bot_strategies` table. All the data in the column will be lost.
  - You are about to drop the column `min_outbid_amount` on the `bot_strategies` table. All the data in the column will be lost.
  - You are about to drop the column `min_participants_with_bid` on the `bot_strategies` table. All the data in the column will be lost.
  - You are about to drop the column `min_seconds_before_end` on the `bot_strategies` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BotStrategyType_new" AS ENUM ('LOW', 'MIDDLE', 'HIGH', 'BOSS');
ALTER TABLE "bot_strategies" ALTER COLUMN "type" TYPE "BotStrategyType_new" USING ("type"::text::"BotStrategyType_new");
ALTER TYPE "BotStrategyType" RENAME TO "BotStrategyType_old";
ALTER TYPE "BotStrategyType_new" RENAME TO "BotStrategyType";
DROP TYPE "BotStrategyType_old";
COMMIT;

-- AlterTable
ALTER TABLE "bot_strategies" DROP COLUMN "max_bid",
DROP COLUMN "max_outbid_amount",
DROP COLUMN "max_participants_with_bid",
DROP COLUMN "max_seconds_before_end",
DROP COLUMN "min_bid",
DROP COLUMN "min_interval",
DROP COLUMN "min_outbid_amount",
DROP COLUMN "min_participants_with_bid",
DROP COLUMN "min_seconds_before_end",
ADD COLUMN     "max_bid_amount" INTEGER,
ADD COLUMN     "min_bid_amount" INTEGER,
ADD COLUMN     "time_from_start" INTEGER,
ADD COLUMN     "time_to_end" INTEGER;
