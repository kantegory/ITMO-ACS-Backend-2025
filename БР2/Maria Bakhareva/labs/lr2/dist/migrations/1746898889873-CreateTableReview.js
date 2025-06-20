"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableReview1746898889873 = void 0;
class CreateTableReview1746898889873 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS review (
        review_id SERIAL PRIMARY KEY,
        author_id INT NOT NULL REFERENCES "user"(user_id) ON DELETE CASCADE,
        property_id INT NOT NULL REFERENCES property(property_id) ON DELETE CASCADE,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DROP TABLE IF EXISTS review;
    `);
    }
}
exports.CreateTableReview1746898889873 = CreateTableReview1746898889873;
