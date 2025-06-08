"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTypeComplaintStatus1746898813338 = void 0;
class CreateTypeComplaintStatus1746898813338 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TYPE ComplaintStatus AS ENUM (
                'created', 'inspecting', 'resolved', 'denied'
            );
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TYPE IF EXISTS ComplaintStatus;
        `);
    }
}
exports.CreateTypeComplaintStatus1746898813338 = CreateTypeComplaintStatus1746898813338;
