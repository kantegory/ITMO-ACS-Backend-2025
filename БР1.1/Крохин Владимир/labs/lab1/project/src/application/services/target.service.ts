import { TargetModel } from '../domain/target.model';

export class TargetService {
    createTarget(name: string, description: string): TargetModel {
        return new TargetModel(null, name, description);
    }

    updateTarget(target: TargetModel, name: string, description: string): void {
        target.name = name;
        target.description = description;
    }