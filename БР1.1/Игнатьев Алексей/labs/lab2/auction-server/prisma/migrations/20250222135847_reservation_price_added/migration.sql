-- AlterTable
ALTER TABLE "auction_participants" ALTER COLUMN "rate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "auctions" ADD COLUMN     "reservation_price" DECIMAL(65,30),
ADD COLUMN     "winner_id" INTEGER;

-- AddForeignKey
ALTER TABLE "auctions" ADD CONSTRAINT "auctions_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
