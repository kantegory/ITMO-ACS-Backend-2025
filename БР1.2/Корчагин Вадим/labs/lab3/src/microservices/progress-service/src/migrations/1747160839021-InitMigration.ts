import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1747160839021 implements MigrationInterface {
    name = 'InitMigration1747160839021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_progress" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "current_weight" numeric(5,2), "target_weight" numeric(5,2), "steps_walked" integer, "water_intake" numeric(4,1), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7b5eb2436efb0051fdf05cbe839" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_training_plan" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "training_plan_id" integer NOT NULL, "started_at" date, "ended_at" date, CONSTRAINT "PK_dff78ae81f1c8649f5c3174067c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_training_plan"`);
        await queryRunner.query(`DROP TABLE "user_progress"`);
    }

}
