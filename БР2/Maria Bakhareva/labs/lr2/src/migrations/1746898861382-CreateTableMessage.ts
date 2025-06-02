import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableMessage1746898861382 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS message (
                message_id SERIAL PRIMARY KEY,
                chat_id INTEGER NOT NULL REFERENCES chat(chat_id),
                sender_id INTEGER NOT NULL REFERENCES "user"(user_id),
                receiver_id INTEGER NOT NULL REFERENCES "user"(user_id),
                rental_id INTEGER NOT NULL REFERENCES rental(rental_id),
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS message;
        `);
  }
}
