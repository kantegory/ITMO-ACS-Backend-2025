import { EntityRepository, Repository } from 'typeorm';
import { CheckInOut } from '../models/checkInOut';

@EntityRepository(CheckInOut)
export class CheckInOutRepository extends Repository<CheckInOut> {
    async findByResidentId(residentId: number): Promise<CheckInOut[]> {
        return this.find({
            where: { resident: { id: residentId } },
        });
    }
}