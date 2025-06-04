import { SeriesModel } from "../../../domain/series.model";

export interface SeriesRepository {
    findById(id: number): Promise<SeriesModel | null>;
    findAllByTraining(trainingId: number): Promise<SeriesModel[]>;
    save(series: SeriesModel): Promise<SeriesModel>;
    delete(id: number): Promise<void>;
} 