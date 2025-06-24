import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1745436695167 implements MigrationInterface {
    name = 'Init1745436695167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."proficiency_level" AS ENUM('beginner', 'intermediate', 'advanced', 'expert')`);
        await queryRunner.query(`CREATE TABLE "resume_skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "masteryLevel" "public"."proficiency_level" NOT NULL DEFAULT 'beginner', "resume_id" uuid NOT NULL, "skill_id" uuid NOT NULL, CONSTRAINT "PK_79770162f4017856252e1c64b4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" text, CONSTRAINT "UQ_81f05095507fd84aa2769b4a522" UNIQUE ("name"), CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vacancy_skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "mastery_level" "public"."proficiency_level" NOT NULL DEFAULT 'beginner', "vacancy_id" uuid NOT NULL, "skill_id" uuid NOT NULL, CONSTRAINT "PK_370a62c22f096e4903da878923c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."application_status" AS ENUM('applied', 'reviewed', 'interview', 'offered', 'rejected', 'withdrawn')`);
        await queryRunner.query(`CREATE TABLE "applications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."application_status" NOT NULL DEFAULT 'applied', "applied_date" TIMESTAMP WITH TIME ZONE NOT NULL, "cv_text" text, "vacancy_id" uuid NOT NULL, "resume_id" uuid NOT NULL, CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."industry" AS ENUM('technology', 'finance', 'healthcare', 'education', 'manufacturing', 'other')`);
        await queryRunner.query(`CREATE TABLE "vacancies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" text NOT NULL, "requirements" text, "salary_min" numeric, "salary_max" numeric, "industry" "public"."industry" NOT NULL DEFAULT 'other', "experience_required" integer, "posted_date" TIMESTAMP WITH TIME ZONE NOT NULL, "expire_date" TIMESTAMP WITH TIME ZONE, "company_id" uuid NOT NULL, "employer_profile_id" uuid NOT NULL, CONSTRAINT "PK_3b45154a366568190cc15be2906" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" text, "industry" "public"."industry" NOT NULL DEFAULT 'other', "website" character varying, "address" character varying, "phone" character varying, "email" character varying, "founded_date" date, "employees_count" integer, CONSTRAINT "UQ_3dacbb3eb4f095e29372ff8e131" UNIQUE ("name"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employer_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "phone" character varying NOT NULL, "company_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "REL_6385f0fa13fabf53036e972d7e" UNIQUE ("user_id"), CONSTRAINT "PK_efb68f1f0020cb3b6facedde218" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role" AS ENUM('employer', 'jobseeker', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "role" "public"."user_role" NOT NULL DEFAULT 'jobseeker', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job_seeker_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "full_name" character varying NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "REL_8207d40d2262772a0d88cc1f67" UNIQUE ("user_id"), CONSTRAINT "PK_9fabb6759237da3f1b8640bafa4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."education_degree" AS ENUM('high_school', 'associate', 'bachelor', 'master', 'doctorate', 'other')`);
        await queryRunner.query(`CREATE TABLE "educations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "institution" character varying NOT NULL, "degree" "public"."education_degree" NOT NULL, "start_date" date NOT NULL, "end_date" date, "resume_id" uuid NOT NULL, CONSTRAINT "PK_09d2f29e7f6f31f5c01d79d2dbf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resumes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "resume_path" character varying NOT NULL, "profile_id" uuid NOT NULL, CONSTRAINT "PK_9c8677802096d6baece48429d2e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_experiences" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "company" character varying NOT NULL, "title" character varying NOT NULL, "start_date" date NOT NULL, "end_date" date, "description" text, "resume_id" uuid NOT NULL, CONSTRAINT "PK_3189db15aaccc2861851ea3da17" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "resume_skills" ADD CONSTRAINT "FK_a5f1f1a642f40c325a4e98e3b07" FOREIGN KEY ("resume_id") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resume_skills" ADD CONSTRAINT "FK_aadffe49af3185261ef0a09ff73" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancy_skills" ADD CONSTRAINT "FK_e9fb9b8bf0940be78459af00351" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancy_skills" ADD CONSTRAINT "FK_978961a3de63e5180716dc2657e" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_98eda645f55272b67d408cc5c99" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_241f549e92b54bb3538c9bdcf21" FOREIGN KEY ("resume_id") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancies" ADD CONSTRAINT "FK_053198d00d977357314f47d1cf2" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancies" ADD CONSTRAINT "FK_58eea37a911e55f4e8b5867d390" FOREIGN KEY ("employer_profile_id") REFERENCES "employer_profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employer_profiles" ADD CONSTRAINT "FK_074b667a0261060b5ce6b2f2db1" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employer_profiles" ADD CONSTRAINT "FK_6385f0fa13fabf53036e972d7e8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_seeker_profiles" ADD CONSTRAINT "FK_8207d40d2262772a0d88cc1f67b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "educations" ADD CONSTRAINT "FK_ca3a12b3c17f1ab78da88545220" FOREIGN KEY ("resume_id") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resumes" ADD CONSTRAINT "FK_e8a0453b4eed0eb59dfe6d9118c" FOREIGN KEY ("profile_id") REFERENCES "job_seeker_profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_experiences" ADD CONSTRAINT "FK_d2578fd680823107e7c633b8252" FOREIGN KEY ("resume_id") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_experiences" DROP CONSTRAINT "FK_d2578fd680823107e7c633b8252"`);
        await queryRunner.query(`ALTER TABLE "resumes" DROP CONSTRAINT "FK_e8a0453b4eed0eb59dfe6d9118c"`);
        await queryRunner.query(`ALTER TABLE "educations" DROP CONSTRAINT "FK_ca3a12b3c17f1ab78da88545220"`);
        await queryRunner.query(`ALTER TABLE "job_seeker_profiles" DROP CONSTRAINT "FK_8207d40d2262772a0d88cc1f67b"`);
        await queryRunner.query(`ALTER TABLE "employer_profiles" DROP CONSTRAINT "FK_6385f0fa13fabf53036e972d7e8"`);
        await queryRunner.query(`ALTER TABLE "employer_profiles" DROP CONSTRAINT "FK_074b667a0261060b5ce6b2f2db1"`);
        await queryRunner.query(`ALTER TABLE "vacancies" DROP CONSTRAINT "FK_58eea37a911e55f4e8b5867d390"`);
        await queryRunner.query(`ALTER TABLE "vacancies" DROP CONSTRAINT "FK_053198d00d977357314f47d1cf2"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_241f549e92b54bb3538c9bdcf21"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_98eda645f55272b67d408cc5c99"`);
        await queryRunner.query(`ALTER TABLE "vacancy_skills" DROP CONSTRAINT "FK_978961a3de63e5180716dc2657e"`);
        await queryRunner.query(`ALTER TABLE "vacancy_skills" DROP CONSTRAINT "FK_e9fb9b8bf0940be78459af00351"`);
        await queryRunner.query(`ALTER TABLE "resume_skills" DROP CONSTRAINT "FK_aadffe49af3185261ef0a09ff73"`);
        await queryRunner.query(`ALTER TABLE "resume_skills" DROP CONSTRAINT "FK_a5f1f1a642f40c325a4e98e3b07"`);
        await queryRunner.query(`DROP TABLE "work_experiences"`);
        await queryRunner.query(`DROP TABLE "resumes"`);
        await queryRunner.query(`DROP TABLE "educations"`);
        await queryRunner.query(`DROP TYPE "public"."education_degree"`);
        await queryRunner.query(`DROP TABLE "job_seeker_profiles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."user_role"`);
        await queryRunner.query(`DROP TABLE "employer_profiles"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TYPE "public"."industry"`);
        await queryRunner.query(`DROP TABLE "vacancies"`);
        await queryRunner.query(`DROP TABLE "applications"`);
        await queryRunner.query(`DROP TYPE "public"."application_status"`);
        await queryRunner.query(`DROP TABLE "vacancy_skills"`);
        await queryRunner.query(`DROP TYPE "public"."proficiency_level"`);
        await queryRunner.query(`DROP TABLE "skills"`);
        await queryRunner.query(`DROP TABLE "resume_skills"`);
    }

}
