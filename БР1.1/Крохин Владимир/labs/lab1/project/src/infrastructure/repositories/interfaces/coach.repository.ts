import { CoachModel } from "../../../domain/coach.model";

export interface CoachRepository {
    findById(id: number): Promise<CoachModel | null>;
    findByUserId(userId: number): Promise<CoachModel | null>;
    findAll(): Promise<CoachModel[]>;
    save(coach: CoachModel): Promise<CoachModel>;
    delete(id: number): Promise<void>;
} 