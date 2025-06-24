"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main1750185077817 = void 0;
class Main1750185077817 {
    constructor() {
        this.name = 'Main1750185077817';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "Application" DROP CONSTRAINT "FK_b5bb088c401d646ebddade8ad8b"`);
            yield queryRunner.query(`ALTER TABLE "Application" DROP CONSTRAINT "FK_8e9b31a9a82c9e11145a29927f0"`);
            yield queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "user_id" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "job_id" SET NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "job_id" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "user_id" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "Application" ADD CONSTRAINT "FK_8e9b31a9a82c9e11145a29927f0" FOREIGN KEY ("job_id") REFERENCES "Job"("job_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "Application" ADD CONSTRAINT "FK_b5bb088c401d646ebddade8ad8b" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.Main1750185077817 = Main1750185077817;
