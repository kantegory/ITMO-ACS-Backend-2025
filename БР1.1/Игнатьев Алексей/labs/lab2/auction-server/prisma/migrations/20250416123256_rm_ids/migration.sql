/*
  Warnings:

  - The primary key for the `bot_strategies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `bot_strategies` table. All the data in the column will be lost.
  - The primary key for the `bots` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `bots` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "bots" DROP CONSTRAINT "bots_strategy_id_fkey";

-- AlterTable
ALTER TABLE "bot_strategies" DROP CONSTRAINT "bot_strategies_pkey",
DROP COLUMN "id",
ADD COLUMN     "bot_strategy_id" SERIAL NOT NULL,
ADD CONSTRAINT "bot_strategies_pkey" PRIMARY KEY ("bot_strategy_id");

-- AlterTable
ALTER TABLE "bots" DROP CONSTRAINT "bots_pkey",
DROP COLUMN "id",
ADD COLUMN     "bot_id" SERIAL NOT NULL,
ADD CONSTRAINT "bots_pkey" PRIMARY KEY ("bot_id");

-- AddForeignKey
ALTER TABLE "bots" ADD CONSTRAINT "bots_strategy_id_fkey" FOREIGN KEY ("strategy_id") REFERENCES "bot_strategies"("bot_strategy_id") ON DELETE RESTRICT ON UPDATE CASCADE;
