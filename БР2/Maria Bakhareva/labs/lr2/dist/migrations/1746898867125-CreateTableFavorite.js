"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableFavorite1746898867125 = void 0;
class CreateTableFavorite1746898867125 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS favorite (
      favorite_id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES "user"(user_id),
      property_id INTEGER NOT NULL REFERENCES property(property_id)
      );
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DROP TABLE IF EXISTS favorite;`);
    }
}
exports.CreateTableFavorite1746898867125 = CreateTableFavorite1746898867125;
