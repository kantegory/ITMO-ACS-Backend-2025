import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableFavorite1746898867125 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS favorite (
      favorite_id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES "user"(user_id),
      property_id INTEGER NOT NULL REFERENCES property(property_id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS favorite;`);
  }
}
