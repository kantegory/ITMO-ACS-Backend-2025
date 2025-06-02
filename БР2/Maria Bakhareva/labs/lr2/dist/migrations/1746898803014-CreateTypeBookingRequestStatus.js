"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTypeBookingRequestStatus1746898803014 = void 0;
class CreateTypeBookingRequestStatus1746898803014 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TYPE BookingRequestStatus AS ENUM (
                'created', 'active', 'canceled', 'accepted'
            );
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TYPE IF EXISTS BookingRequestStatus;
        `);
    }
}
exports.CreateTypeBookingRequestStatus1746898803014 = CreateTypeBookingRequestStatus1746898803014;
