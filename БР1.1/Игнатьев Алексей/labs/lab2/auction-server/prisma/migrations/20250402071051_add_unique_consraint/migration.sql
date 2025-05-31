/*
  Warnings:

  - A unique constraint covering the columns `[user_id,task_id]` on the table `user_tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_tasks_user_id_task_id_key" ON "user_tasks"("user_id", "task_id");
