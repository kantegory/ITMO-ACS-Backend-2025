-- CreateTable
CREATE TABLE "fortune_wins" (
    "fortune_win_id" SERIAL NOT NULL,
    "spin_item_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_received" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "fortune_wins_pkey" PRIMARY KEY ("fortune_win_id")
);

-- AddForeignKey
ALTER TABLE "fortune_wins" ADD CONSTRAINT "fortune_wins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fortune_wins" ADD CONSTRAINT "fortune_wins_spin_item_id_fkey" FOREIGN KEY ("spin_item_id") REFERENCES "spin_items"("spin_item_id") ON DELETE RESTRICT ON UPDATE CASCADE;
