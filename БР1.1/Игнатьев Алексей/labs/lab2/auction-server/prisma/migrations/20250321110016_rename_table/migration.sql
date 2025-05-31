/*
  Warnings:

  - The primary key for the `localiztions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `locale_id` on the `localiztions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "localiztions" DROP CONSTRAINT "localiztions_pkey",
DROP COLUMN "locale_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "localiztions_pkey" PRIMARY KEY ("id");
