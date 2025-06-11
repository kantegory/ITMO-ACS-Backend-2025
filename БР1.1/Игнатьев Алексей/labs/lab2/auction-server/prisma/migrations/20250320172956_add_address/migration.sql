-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "last_name" TEXT;

-- CreateTable
CREATE TABLE "addresses" (
    "address_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "house_number" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("address_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "addresses_user_id_key" ON "addresses"("user_id");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
