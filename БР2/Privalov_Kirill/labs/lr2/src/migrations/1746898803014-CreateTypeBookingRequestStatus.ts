import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTypeBookingRequestStatus1746898803014
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE BookingRequestStatus AS ENUM (
                'created', 'active', 'canceled', 'accepted'
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TYPE IF EXISTS BookingRequestStatus;
        `);
  }
}
