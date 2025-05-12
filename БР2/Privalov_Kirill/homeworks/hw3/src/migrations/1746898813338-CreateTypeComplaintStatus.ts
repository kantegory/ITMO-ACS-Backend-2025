import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTypeComplaintStatus1746898813338
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE ComplaintStatus AS ENUM (
                'created', 'inspecting', 'resolved', 'denied'
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TYPE IF EXISTS ComplaintStatus;
        `);
  }
}
