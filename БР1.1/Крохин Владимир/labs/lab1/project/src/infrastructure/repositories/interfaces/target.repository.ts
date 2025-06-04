import { TargetModel } from '../../../application/domain/target.model';

export interface TargetRepository {
    findById(id: number): Promise<TargetModel | null>;
    findByName(name: string): Promise<TargetModel | null>;
    save(target: TargetModel): Promise<TargetModel>;
    delete(id: number): Promise<void>;
}
 