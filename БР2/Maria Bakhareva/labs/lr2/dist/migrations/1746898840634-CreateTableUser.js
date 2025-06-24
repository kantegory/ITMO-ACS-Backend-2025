"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUser1746898840634 = void 0;
class CreateTableUser1746898840634 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user" (
                user_id SERIAL PRIMARY KEY,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                birth_date DATE NOT NULL,
                phone TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                role UserRole NOT NULL DEFAULT 'tenant',
                password TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "user";
        `);
    }
}
exports.CreateTableUser1746898840634 = CreateTableUser1746898840634;
