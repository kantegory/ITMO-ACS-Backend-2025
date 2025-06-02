"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableComplaint1746898884411 = void 0;
class CreateTableComplaint1746898884411 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS complaint (
        complaint_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES "user"(user_id),
        property_id INT REFERENCES property(property_id),
        message VARCHAR(255),
        status ComplaintStatus,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DROP TABLE IF EXISTS complaint;
    `);
    }
}
exports.CreateTableComplaint1746898884411 = CreateTableComplaint1746898884411;
