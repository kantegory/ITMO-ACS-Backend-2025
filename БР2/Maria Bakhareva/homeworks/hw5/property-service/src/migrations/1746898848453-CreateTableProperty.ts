import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProperty1746898848453 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS property (
              property_id SERIAL PRIMARY KEY,
              owner_id INTEGER NOT NULL,
              title VARCHAR(255) NOT NULL,
              description TEXT NOT NULL,
              price DECIMAL(10, 2) NOT NULL,
              location VARCHAR(255) NOT NULL,
              property_type VARCHAR(50) NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS property;
    `);
  }
}
