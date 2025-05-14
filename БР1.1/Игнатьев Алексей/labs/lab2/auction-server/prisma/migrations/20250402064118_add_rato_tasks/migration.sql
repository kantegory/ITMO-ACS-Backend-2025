-- CreateEnum
CREATE TYPE "RatoTaskType" AS ENUM ('INVITE_FRIEND', 'MAKE_BID', 'SHARE_PLATFORM');

-- CreateEnum
CREATE TYPE "RewardType" AS ENUM ('RATO', 'FREE_SPIN');

-- CreateTable
CREATE TABLE "rato_tasks" (
    "rato_task_id" SERIAL NOT NULL,
    "data" TEXT,
    "image_url" TEXT NOT NULL,
    "type" "RatoTaskType" NOT NULL,
    "reward_type" "RewardType" NOT NULL,
    "reward_amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rato_tasks_pkey" PRIMARY KEY ("rato_task_id")
);

-- CreateTable
CREATE TABLE "user_tasks" (
    "user_task_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "user_tasks_pkey" PRIMARY KEY ("user_task_id")
);

-- AddForeignKey
ALTER TABLE "user_tasks" ADD CONSTRAINT "user_tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_tasks" ADD CONSTRAINT "user_tasks_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "rato_tasks"("rato_task_id") ON DELETE RESTRICT ON UPDATE CASCADE;
