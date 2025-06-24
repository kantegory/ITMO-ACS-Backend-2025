"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableProperty1746898848453 = void 0;
class CreateTableProperty1746898848453 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS property (
              property_id SERIAL PRIMARY KEY,
              owner_id INTEGER REFERENCES "user"(user_id) ON DELETE CASCADE,
              title VARCHAR(255) NOT NULL,
              description TEXT NOT NULL,
              price DECIMAL(10, 2) NOT NULL,
              location VARCHAR(255) NOT NULL,
              property_type VARCHAR(50) NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DROP TABLE IF EXISTS property;
    `);
    }
}
exports.CreateTableProperty1746898848453 = CreateTableProperty1746898848453;
