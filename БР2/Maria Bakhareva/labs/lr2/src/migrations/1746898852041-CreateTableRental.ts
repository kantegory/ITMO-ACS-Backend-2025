import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableRental1746898852041 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS rental (
        rental_id SERIAL PRIMARY KEY,
        tenant_id INT NOT NULL REFERENCES "user"(user_id) ON DELETE CASCADE,
        property_id INT NOT NULL REFERENCES property(property_id) ON DELETE CASCADE,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        status RentalStatus NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS rental;
    `);
  }
}
