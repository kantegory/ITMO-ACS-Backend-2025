import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableChat1746898854512 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS chat (
        chat_id SERIAL PRIMARY KEY,
        property_id INTEGER REFERENCES property(property_id) ON DELETE CASCADE,
        tenant_id INTEGER REFERENCES "user"(user_id) ON DELETE CASCADE,
        landlord_id INTEGER REFERENCES "user"(user_id) ON DELETE CASCADE
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS chat;
    `);
  }
}
