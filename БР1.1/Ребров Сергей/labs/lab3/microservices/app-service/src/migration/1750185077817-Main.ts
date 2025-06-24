import { MigrationInterface, QueryRunner } from "typeorm";

export class Main1750185077817 implements MigrationInterface {
    name = 'Main1750185077817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Application" DROP CONSTRAINT "FK_b5bb088c401d646ebddade8ad8b"`);
        await queryRunner.query(`ALTER TABLE "Application" DROP CONSTRAINT "FK_8e9b31a9a82c9e11145a29927f0"`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "job_id" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "job_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Application" ADD CONSTRAINT "FK_8e9b31a9a82c9e11145a29927f0" FOREIGN KEY ("job_id") REFERENCES "Job"("job_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Application" ADD CONSTRAINT "FK_b5bb088c401d646ebddade8ad8b" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
