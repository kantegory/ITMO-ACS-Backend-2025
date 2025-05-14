/*
  Warnings:

  - You are about to drop the column `name` on the `bot_strategies` table. All the data in the column will be lost.
  - Added the required column `type` to the `bot_strategies` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BotStrategyType" AS ENUM ('AGGRESSIVE', 'SAFE', 'THRESHOLD');

-- AlterTable
ALTER TABLE "bot_strategies" DROP COLUMN "name",
ADD COLUMN     "type" "BotStrategyType" NOT NULL;
