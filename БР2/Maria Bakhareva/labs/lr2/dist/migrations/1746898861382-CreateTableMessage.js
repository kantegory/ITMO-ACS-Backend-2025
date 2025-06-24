"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableMessage1746898861382 = void 0;
class CreateTableMessage1746898861382 {
    async up(queryRunner) {
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
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE IF EXISTS message;
        `);
    }
}
exports.CreateTableMessage1746898861382 = CreateTableMessage1746898861382;
