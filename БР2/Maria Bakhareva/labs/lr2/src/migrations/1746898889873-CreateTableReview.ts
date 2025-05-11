import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableReview1746898889873 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS review (
        review_id SERIAL PRIMARY KEY,
        author_id INT NOT NULL REFERENCES "user"(user_id) ON DELETE CASCADE,
        property_id INT NOT NULL REFERENCES property(property_id) ON DELETE CASCADE,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS review;
    `);
  }
}
