/*
  Warnings:

  - You are about to drop the column `type` on the `bot_strategies` table. All the data in the column will be lost.
  - You are about to drop the column `bot_strategy_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_bot` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_bot_strategy_id_fkey";

-- AlterTable
ALTER TABLE "bot_strategies" DROP COLUMN "type",
ADD COLUMN     "max_bid" DOUBLE PRECISION,
ADD COLUMN     "max_outbid_amount" DOUBLE PRECISION,
ADD COLUMN     "max_participants_on_activate" INTEGER,
ADD COLUMN     "max_participants_with_bid" INTEGER,
ADD COLUMN     "max_seconds_before_end" INTEGER,
ADD COLUMN     "min_bid" DOUBLE PRECISION,
ADD COLUMN     "min_interval" INTEGER,
ADD COLUMN     "min_outbid_amount" DOUBLE PRECISION,
ADD COLUMN     "min_participants_on_activate" INTEGER,
ADD COLUMN     "min_participants_with_bid" INTEGER,
ADD COLUMN     "min_seconds_before_end" INTEGER;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "bot_strategy_id",
DROP COLUMN "is_active",
DROP COLUMN "is_bot";

-- CreateTable
CREATE TABLE "bots" (
    "id" SERIAL NOT NULL,
    "strategy_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "bots_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bots" ADD CONSTRAINT "bots_strategy_id_fkey" FOREIGN KEY ("strategy_id") REFERENCES "bot_strategies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bots" ADD CONSTRAINT "bots_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
