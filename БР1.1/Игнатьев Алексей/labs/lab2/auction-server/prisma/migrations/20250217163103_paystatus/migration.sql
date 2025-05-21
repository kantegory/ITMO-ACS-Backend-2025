/*
  Warnings:

  - Changed the type of `status` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('CREATED', 'EXPIRED', 'COMPLETED');

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "expired_at" TIMESTAMP(3),
DROP COLUMN "status",
ADD COLUMN     "status" "PaymentStatus" NOT NULL,
ALTER COLUMN "currency" DROP NOT NULL,
ALTER COLUMN "rato_amount" DROP NOT NULL,
ALTER COLUMN "exchange_rate" DROP NOT NULL;

-- DropEnum
DROP TYPE "TransactionStatus";
