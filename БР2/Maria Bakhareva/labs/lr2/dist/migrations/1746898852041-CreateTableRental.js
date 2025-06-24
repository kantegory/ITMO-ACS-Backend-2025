"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableRental1746898852041 = void 0;
class CreateTableRental1746898852041 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS rental (
        rental_id SERIAL PRIMARY KEY,
        tenant_id INT NOT NULL REFERENCES "user"(user_id) ON DELETE CASCADE,
        property_id INT NOT NULL REFERENCES property(property_id) ON DELETE CASCADE,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        status RentalStatus NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DROP TABLE IF EXISTS rental;
    `);
    }
}
exports.CreateTableRental1746898852041 = CreateTableRental1746898852041;
