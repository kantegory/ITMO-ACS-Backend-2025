"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTablePropertyImages1746898897868 = void 0;
class CreateTablePropertyImages1746898897868 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS property_images (
        image_id SERIAL PRIMARY KEY,
        property_id INTEGER NOT NULL REFERENCES property(property_id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        "order" INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DROP TABLE IF EXISTS property_images;
    `);
    }
}
exports.CreateTablePropertyImages1746898897868 = CreateTablePropertyImages1746898897868;
