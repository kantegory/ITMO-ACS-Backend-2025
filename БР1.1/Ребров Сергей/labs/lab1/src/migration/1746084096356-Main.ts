import { MigrationInterface, QueryRunner } from "typeorm";

export class Main1746084096356 implements MigrationInterface {
    name = 'Main1746084096356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Role" ("role_id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_f13c488072f8da1993c4a304625" PRIMARY KEY ("role_id"))`);
        await queryRunner.query(`CREATE TABLE "Experience" ("experience_id" SERIAL NOT NULL, "title" character varying(256) NOT NULL, "description" text NOT NULL, "company" character varying(256) NOT NULL, "start_date" date NOT NULL, "end_date" date, "resume_id" integer, CONSTRAINT "PK_d86530a008f39da9a4ac1e3d2c4" PRIMARY KEY ("experience_id"))`);
        await queryRunner.query(`CREATE TABLE "Education" ("education_id" SERIAL NOT NULL, "institution" character varying(256) NOT NULL, "degree" character varying(256) NOT NULL, "start_date" date NOT NULL, "end_date" date, "resume_id" integer, CONSTRAINT "PK_74aff027456b35b2481ce9bb71e" PRIMARY KEY ("education_id"))`);
        await queryRunner.query(`CREATE TABLE "Resume" ("resume_id" SERIAL NOT NULL, "title" character varying(256) NOT NULL, "skills" text NOT NULL, "contact_info" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_bfcee5a4018ece32f16fb86c822" PRIMARY KEY ("resume_id"))`);
        await queryRunner.query(`CREATE TABLE "Application" ("application_id" SERIAL NOT NULL, "cover_letter" text NOT NULL, "status" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "job_id" integer, CONSTRAINT "PK_6498cde271a1b11bb9232ead403" PRIMARY KEY ("application_id"))`);
        await queryRunner.query(`CREATE TABLE "Job" ("job_id" SERIAL NOT NULL, "title" character varying(256) NOT NULL, "description" text NOT NULL, "requirements" text NOT NULL, "salary_min" integer NOT NULL, "salary_max" integer NOT NULL, "experience" character varying(100) NOT NULL, "location" character varying(256) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_d8f9b418d6ce284965176b3f22b" PRIMARY KEY ("job_id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("user_id" SERIAL NOT NULL, "name" character varying(256) NOT NULL, "email" character varying(256) NOT NULL, "password" character varying(256) NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "role_id" integer, CONSTRAINT "PK_af4be3eb77a4bdbafac6f808ff3" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`ALTER TABLE "Experience" ADD CONSTRAINT "FK_7291dc3e33374881e939138e433" FOREIGN KEY ("resume_id") REFERENCES "Resume"("resume_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Education" ADD CONSTRAINT "FK_5fca7c9703cec240188b3ce9ea2" FOREIGN KEY ("resume_id") REFERENCES "Resume"("resume_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Resume" ADD CONSTRAINT "FK_332b324f006fd2d54e4844dad43" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Application" ADD CONSTRAINT "FK_b5bb088c401d646ebddade8ad8b" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Application" ADD CONSTRAINT "FK_8e9b31a9a82c9e11145a29927f0" FOREIGN KEY ("job_id") REFERENCES "Job"("job_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Job" ADD CONSTRAINT "FK_49e7fe616ab0301bd31084eac9e" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_775147058c769ea57efe923d288" FOREIGN KEY ("role_id") REFERENCES "Role"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_775147058c769ea57efe923d288"`);
        await queryRunner.query(`ALTER TABLE "Job" DROP CONSTRAINT "FK_49e7fe616ab0301bd31084eac9e"`);
        await queryRunner.query(`ALTER TABLE "Application" DROP CONSTRAINT "FK_8e9b31a9a82c9e11145a29927f0"`);
        await queryRunner.query(`ALTER TABLE "Application" DROP CONSTRAINT "FK_b5bb088c401d646ebddade8ad8b"`);
        await queryRunner.query(`ALTER TABLE "Resume" DROP CONSTRAINT "FK_332b324f006fd2d54e4844dad43"`);
        await queryRunner.query(`ALTER TABLE "Education" DROP CONSTRAINT "FK_5fca7c9703cec240188b3ce9ea2"`);
        await queryRunner.query(`ALTER TABLE "Experience" DROP CONSTRAINT "FK_7291dc3e33374881e939138e433"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Job"`);
        await queryRunner.query(`DROP TABLE "Application"`);
        await queryRunner.query(`DROP TABLE "Resume"`);
        await queryRunner.query(`DROP TABLE "Education"`);
        await queryRunner.query(`DROP TABLE "Experience"`);
        await queryRunner.query(`DROP TABLE "Role"`);
    }

}
