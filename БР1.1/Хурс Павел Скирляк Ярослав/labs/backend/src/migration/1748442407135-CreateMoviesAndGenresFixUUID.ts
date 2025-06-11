import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMoviesAndGenresFixUUID1748442407135
  implements MigrationInterface
{
  name = 'CreateMoviesAndGenresFixUUID1748442407135';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_664ea405ae2a10c264d582ee563" UNIQUE ("name"), CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movie_matches" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user1_id" uuid NOT NULL, "user2_id" uuid NOT NULL, "tmdb_movie_id" integer NOT NULL, "movie_details" jsonb, "matched_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3c71a3a541f6bd1dfcb9e702f94" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_deaf51f6cbd403ce71bb9e3961" ON "movie_matches" ("user1_id", "user2_id", "tmdb_movie_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "nickname" character varying NOT NULL, "password_hash" character varying NOT NULL, "group_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_ad02a1be8707004cb805a4b5023" UNIQUE ("nickname"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "genres" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tmdb_id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_f105f8230a83b86a346427de94d" UNIQUE ("name"), CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tmdb_id" integer NOT NULL, "title" character varying NOT NULL, "overview" text NOT NULL, "release_date" TIMESTAMP NOT NULL, "vote_average" numeric(3,1) NOT NULL, "poster_path" character varying NOT NULL, "backdrop_path" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "friendships" ("user_id" uuid NOT NULL, "friend_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a8e4ede8e2df44f3f21f557d379" PRIMARY KEY ("user_id", "friend_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "friend_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "from_user_id" uuid NOT NULL, "to_user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3827ba86ce64ecb4b90c92eeea6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movie_genres" ("movie_id" uuid NOT NULL, "genre_id" uuid NOT NULL, CONSTRAINT "PK_ec45eae1bc95d1461ad55713ffc" PRIMARY KEY ("movie_id", "genre_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ae967ce58ef99e9ff3933ccea4" ON "movie_genres" ("movie_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bbbc12542564f7ff56e36f5bbf" ON "movie_genres" ("genre_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_matches" ADD CONSTRAINT "FK_0b3a3fd6f9caaddea03de305d9b" FOREIGN KEY ("user1_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_matches" ADD CONSTRAINT "FK_cc439fc2014fd016cb5d1adb096" FOREIGN KEY ("user2_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_b8d62b3714f81341caa13ab0ff0" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "friendships" ADD CONSTRAINT "FK_c73eec6c7e7d5d1f2b3ce8b9002" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "friendships" ADD CONSTRAINT "FK_972c6bdd4bc18dda48b8aa4714c" FOREIGN KEY ("friend_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "friend_requests" ADD CONSTRAINT "FK_5e9a1caaf3e22527e20256ef724" FOREIGN KEY ("from_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "friend_requests" ADD CONSTRAINT "FK_8085211f8c9a14a68cc82ff134d" FOREIGN KEY ("to_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_genres" ADD CONSTRAINT "FK_ae967ce58ef99e9ff3933ccea48" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_genres" ADD CONSTRAINT "FK_bbbc12542564f7ff56e36f5bbf6" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie_genres" DROP CONSTRAINT "FK_bbbc12542564f7ff56e36f5bbf6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_genres" DROP CONSTRAINT "FK_ae967ce58ef99e9ff3933ccea48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "friend_requests" DROP CONSTRAINT "FK_8085211f8c9a14a68cc82ff134d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "friend_requests" DROP CONSTRAINT "FK_5e9a1caaf3e22527e20256ef724"`,
    );
    await queryRunner.query(
      `ALTER TABLE "friendships" DROP CONSTRAINT "FK_972c6bdd4bc18dda48b8aa4714c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "friendships" DROP CONSTRAINT "FK_c73eec6c7e7d5d1f2b3ce8b9002"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_b8d62b3714f81341caa13ab0ff0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_matches" DROP CONSTRAINT "FK_cc439fc2014fd016cb5d1adb096"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_matches" DROP CONSTRAINT "FK_0b3a3fd6f9caaddea03de305d9b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bbbc12542564f7ff56e36f5bbf"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ae967ce58ef99e9ff3933ccea4"`,
    );
    await queryRunner.query(`DROP TABLE "movie_genres"`);
    await queryRunner.query(`DROP TABLE "friend_requests"`);
    await queryRunner.query(`DROP TABLE "friendships"`);
    await queryRunner.query(`DROP TABLE "movies"`);
    await queryRunner.query(`DROP TABLE "genres"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_deaf51f6cbd403ce71bb9e3961"`,
    );
    await queryRunner.query(`DROP TABLE "movie_matches"`);
    await queryRunner.query(`DROP TABLE "groups"`);
  }
}
