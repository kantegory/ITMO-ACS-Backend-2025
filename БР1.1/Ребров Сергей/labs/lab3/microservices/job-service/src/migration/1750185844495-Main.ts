import { MigrationInterface, QueryRunner } from "typeorm";

export class Main1750185844495 implements MigrationInterface {
    name = 'Main1750185844495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Job" DROP CONSTRAINT "FK_49e7fe616ab0301bd31084eac9e"`);
        await queryRunner.query(`ALTER TABLE "Job" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Job" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "Job" ADD "experience" character varying(256) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Job" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "Job" ADD "experience" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Job" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Job" ADD CONSTRAINT "FK_49e7fe616ab0301bd31084eac9e" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
