import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePropertyImages1746898897868
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS property_images (
        image_id SERIAL PRIMARY KEY,
        property_id INTEGER NOT NULL REFERENCES property(property_id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        "order" INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS property_images;
    `);
  }
}
