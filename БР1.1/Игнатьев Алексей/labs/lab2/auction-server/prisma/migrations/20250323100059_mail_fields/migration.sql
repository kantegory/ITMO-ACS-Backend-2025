-- AlterTable
ALTER TABLE "users" ADD COLUMN     "language" TEXT,
ADD COLUMN     "mail_new_auctions" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "mail_promo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "mail_rate_result" BOOLEAN NOT NULL DEFAULT true;
