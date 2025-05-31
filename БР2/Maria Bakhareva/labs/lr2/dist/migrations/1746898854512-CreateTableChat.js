"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableChat1746898854512 = void 0;
class CreateTableChat1746898854512 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS chat (
        chat_id SERIAL PRIMARY KEY,
        rental_id INTEGER REFERENCES rental(rental_id) ON DELETE CASCADE
      )`);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DROP TABLE IF EXISTS chat;
    `);
    }
}
exports.CreateTableChat1746898854512 = CreateTableChat1746898854512;
