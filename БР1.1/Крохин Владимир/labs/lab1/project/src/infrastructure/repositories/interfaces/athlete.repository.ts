import { AthleteModel } from "../../../domain/athlete.model";

export interface AthleteRepository {
    findById(id: number): Promise<AthleteModel | null>;
    findByUserId(userId: number): Promise<AthleteModel | null>;
    findAll(): Promise<AthleteModel[]>;
    save(athlete: AthleteModel): Promise<AthleteModel>;
    delete(id: number): Promise<void>;
} 