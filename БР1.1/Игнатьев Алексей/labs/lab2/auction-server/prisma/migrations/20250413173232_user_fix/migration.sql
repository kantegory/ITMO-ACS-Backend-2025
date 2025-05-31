/*
  Warnings:

  - You are about to drop the column `max_interval` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `min_interval` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "max_interval",
DROP COLUMN "min_interval";
