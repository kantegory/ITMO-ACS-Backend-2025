"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTypeRentalStatus1746898826442 = void 0;
class CreateTypeRentalStatus1746898826442 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TYPE RentalStatus AS ENUM (
                'created', 'inspecting', 'published', 'hidden', 'canceled'
            );
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TYPE IF EXISTS RentalStatus;
        `);
    }
}
exports.CreateTypeRentalStatus1746898826442 = CreateTypeRentalStatus1746898826442;
