/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `referrals` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "referrals_user_id_key" ON "referrals"("user_id");
