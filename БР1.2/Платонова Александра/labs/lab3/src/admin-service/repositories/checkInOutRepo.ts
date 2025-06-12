import { EntityRepository, Repository, Between } from 'typeorm';
import { CheckInOut } from '../models/checkInOut';

@EntityRepository(CheckInOut)
export class CheckInOutRepository extends Repository<CheckInOut> {
    async createCheckInOut(checkInOutData: Partial<CheckInOut>): Promise<CheckInOut> {
        const checkInOut = this.create(checkInOutData);
        return this.save(checkInOut);
    }

    async findWithFilters(filters: {
        doc_num?: number;
        date_from?: Date;
        date_to?: Date;
        residentId?: number;
        roomId?: number;
    }): Promise<CheckInOut[]> {
        return this.find({
            where: {
                doc_num: filters.doc_num,
                date_of_issue: filters.date_from && filters.date_to
                    ? Between(filters.date_from, filters.date_to)
                    : undefined,
                resident: { id: filters.residentId },
                room: { id: filters.roomId },
            },
            relations: ['resident', 'room', 'payment'],
        });
    }

    async findById(id: number): Promise<CheckInOut | undefined> {
        return this.findOne({
            where: { id },
            relations: ['resident', 'room', 'payment']
        });
    }

    async updateCheckInOut(id: number, updateData: Partial<CheckInOut>): Promise<CheckInOut | undefined> {
        await this.update(id, updateData);
        return this.findOne({ where: { id } });
    }

    async deleteCheckInOut(id: number): Promise<void> {
        await this.delete(id);
    }
}