import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTypeRentalStatus1746898826442 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE RentalStatus AS ENUM (
                'created', 'inspecting', 'published', 'hidden', 'canceled'
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TYPE IF EXISTS RentalStatus;
        `);
  }
}
