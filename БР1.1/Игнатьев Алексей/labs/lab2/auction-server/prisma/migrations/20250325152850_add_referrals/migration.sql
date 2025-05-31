/*
  Warnings:

  - A unique constraint covering the columns `[referral_code]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'REFERRAL_BALANCE_UPDATE';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "referral_code" TEXT;

-- CreateTable
CREATE TABLE "referrals" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "referred_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "referrals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "referrals_referred_by_key" ON "referrals"("referred_by");

-- CreateIndex
CREATE UNIQUE INDEX "users_referral_code_key" ON "users"("referral_code");

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referred_by_fkey" FOREIGN KEY ("referred_by") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
