import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTypeUserRole1746898783675 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE UserRole AS ENUM (
                'admin', 'landlord', 'tenant'
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TYPE IF EXISTS UserRole;
        `);
  }
}
