-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bot_strategy_id" INTEGER,
ADD COLUMN     "is_bot" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "bot_strategies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "bot_strategies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_bot_strategy_id_fkey" FOREIGN KEY ("bot_strategy_id") REFERENCES "bot_strategies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
