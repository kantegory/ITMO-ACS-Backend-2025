-- AlterTable
ALTER TABLE "localiztions" ADD COLUMN     "answer" TEXT,
ADD COLUMN     "question" TEXT,
ADD COLUMN     "text" TEXT,
ALTER COLUMN "title" DROP NOT NULL;
