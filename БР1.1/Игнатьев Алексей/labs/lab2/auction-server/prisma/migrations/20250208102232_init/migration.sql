-- CreateEnum
CREATE TYPE "UserAliasType" AS ENUM ('EMAIL');

-- CreateEnum
CREATE TYPE "AuctionCategory" AS ENUM ('PHONES', 'ELECTRONICS', 'CERTIFICATES');

-- CreateEnum
CREATE TYPE "AuctionStatus" AS ENUM ('NOT_STARTED', 'ACTIVE', 'COMPLETED');

-- CreateEnum
CREATE TYPE "AuctionType" AS ENUM ('OPENED', 'CLOSED');

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_aliases" (
    "user_alias_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "alias_type" "UserAliasType" NOT NULL DEFAULT 'EMAIL',
    "value" VARCHAR(255) NOT NULL,
    "proof" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_aliases_pkey" PRIMARY KEY ("user_alias_id")
);

-- CreateTable
CREATE TABLE "auction_brands" (
    "auction_brand_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "auction_brands_pkey" PRIMARY KEY ("auction_brand_id")
);

-- CreateTable
CREATE TABLE "auctions" (
    "auction_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "start_price" DECIMAL(65,30) NOT NULL,
    "end_price" DECIMAL(65,30) NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "max_participants" INTEGER NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "category" "AuctionCategory" NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "status" "AuctionStatus" NOT NULL,
    "type" "AuctionType" NOT NULL,

    CONSTRAINT "auctions_pkey" PRIMARY KEY ("auction_id")
);

-- CreateTable
CREATE TABLE "auction_participants" (
    "auction_participant_id" SERIAL NOT NULL,
    "auction_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rate" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auction_participants_pkey" PRIMARY KEY ("auction_participant_id")
);

-- AddForeignKey
ALTER TABLE "user_aliases" ADD CONSTRAINT "user_aliases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auctions" ADD CONSTRAINT "auctions_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "auction_brands"("auction_brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auction_participants" ADD CONSTRAINT "auction_participants_auction_id_fkey" FOREIGN KEY ("auction_id") REFERENCES "auctions"("auction_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auction_participants" ADD CONSTRAINT "auction_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
