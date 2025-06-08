"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTypeUserRole1746898783675 = void 0;
class CreateTypeUserRole1746898783675 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TYPE UserRole AS ENUM (
                'admin', 'landlord', 'tenant'
            );
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TYPE IF EXISTS UserRole;
        `);
    }
}
exports.CreateTypeUserRole1746898783675 = CreateTypeUserRole1746898783675;
