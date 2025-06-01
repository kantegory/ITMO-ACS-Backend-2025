import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableChat1746898854512 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS chat (
        chat_id SERIAL PRIMARY KEY,
        property_id INTEGER NOT NULL,
        tenant_id INTEGER NOT NULL,
        landlord_id INTEGER NOT NULL
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS chat;
    `);
  }
}
