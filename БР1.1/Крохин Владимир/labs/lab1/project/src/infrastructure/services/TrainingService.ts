import { TrainingRepository } from '../repositories/interfaces/training.repository';
import { TrainingModel } from '../domain/training.model';
import { TrainingDto, TrainingStatisticsDto, UserTrainingStatisticsDto } from '../../dtos/training/TrainingDto';
import { SeriesDto } from '../../dtos/series/SeriesDto';
import { NoteDto } from '../../dtos/note/NoteDto';
import { FreeTrainingModel } from '../domain/free-training.model';
import { QualificationTrainingModel } from '../domain/qualification-training.model';
import { SeriesModel } from '../domain/series.model';
import { NoteModel } from '../domain/note.model';
import { UserModel } from '../domain/user.model';
import { ExerciseModel } from '../domain/exercise.model';
import { TargetModel } from '../domain/target.model';

export class TrainingService {
    constructor(private readonly trainingRepository: TrainingRepository) {}

    async createTraining(startTs: Date): Promise<TrainingDto> {
        const training = new TrainingModel(null, startTs);
        const savedTraining = await this.trainingRepository.save(training);
        return this.mapToDto(savedTraining);
    }

    async getTrainingById(id: number): Promise<TrainingDto> {
        const training = await this.trainingRepository.findById(id);
        if (!training) {
            throw new Error('Тренировка не найдена');
        }
        return this.mapToDto(training);
    }

    async updateTraining(id: number, endTs: Date): Promise<TrainingDto> {
        const training = await this.trainingRepository.findById(id);
        if (!training) {
            throw new Error('Тренировка не найдена');
        }

        training.endTimeStamp = endTs;
        const updatedTraining = await this.trainingRepository.save(training);
        return this.mapToDto(updatedTraining);
    }

    async deleteTraining(id: number): Promise<void> {
        const training = await this.trainingRepository.findById(id);
        if (!training) {
            throw new Error('Тренировка не найдена');
        }
        await this.trainingRepository.delete(id);
    }

    async addSeries(trainingId: number, beginTimeOffset: number, maxShots?: number): Promise<SeriesDto> {
        const training = await this.trainingRepository.findById(trainingId);
        if (!training) {
            throw new Error('Тренировка не найдена');
        }

        const series = training.addSeries(beginTimeOffset, maxShots);
        const updatedTraining = await this.trainingRepository.save(training);
        const addedSeries = updatedTraining.getSeries().find(s => s.beginTimeOffset === beginTimeOffset);
        if (!addedSeries) {
            throw new Error('Не удалось добавить серию');
        }
        return this.mapSeriesToDto(addedSeries);
    }

    async addNote(trainingId: number, user: UserModel, content: string): Promise<NoteDto> {
        const training = await this.trainingRepository.findById(trainingId);
        if (!training) {
            throw new Error('Тренировка не найдена');
        }

        const note = new NoteModel(null, user, new Date(), null, content);
        training.addNote(note);
        const updatedTraining = await this.trainingRepository.save(training);
        const addedNote = updatedTraining.getNotes().find(n => n.content === content);
        if (!addedNote) {
            throw new Error('Не удалось добавить заметку');
        }
        return this.mapNoteToDto(addedNote);
    }

    async removeNote(trainingId: number, noteId: number): Promise<void> {
        const training = await this.trainingRepository.findById(trainingId);
        if (!training) {
            throw new Error('Тренировка не найдена');
        }

        training.removeNote(noteId);
        await this.trainingRepository.save(training);
    }

    // Начать тренировку
    async startTraining(userId: number, type: string, exercise?: ExerciseModel, target?: TargetModel, weaponType?: string): Promise<TrainingDto> {
        let training: TrainingModel;
        
        if (type === 'qualification') {
            if (!exercise) {
                throw new Error('Для квалификационной тренировки необходимо указать упражнение');
            }
            training = new QualificationTrainingModel(null, new Date(), exercise);
        } else if (type === 'free') {
            if (!target || !weaponType) {
                throw new Error('Для свободной тренировки необходимо указать мишень и тип оружия');
            }
            training = new FreeTrainingModel(null, new Date(), weaponType, target);
        } else {
            throw new Error('Неизвестный тип тренировки');
        }

        const savedTraining = await this.trainingRepository.save(training);
        return this.mapToDto(savedTraining);
    }

    // Завершить тренировку
    async finishTraining(id: number): Promise<TrainingDto> {
        const training = await this.trainingRepository.findById(id);
        if (!training) {
            throw new Error('Тренировка не найдена');
        }

        training.endTimeStamp = new Date();
        const updatedTraining = await this.trainingRepository.save(training);
        return this.mapToDto(updatedTraining);
    }

    // Получить список тренировок пользователя
    async getUserTrainings(userId: number): Promise<TrainingDto[]> {
        const trainings = await this.trainingRepository.findAllByUser(userId);
        return trainings.map(training => this.mapToDto(training));
    }

    // Получить статистику по конкретной тренировке
    async getTrainingStatistics(trainingId: number): Promise<TrainingStatisticsDto> {
        const training = await this.trainingRepository.findById(trainingId);
        if (!training) {
            throw new Error('Тренировка не найдена');
        }

        const series = training.getSeries();
        const shots = series.reduce((acc, s) => [...acc, ...s.allShots], []);
        
        if (shots.length === 0) {
            return {
                totalSeries: 0,
                totalShots: 0,
                averageScore: 0,
                averageHitPoint: 0,
                averageHoleSize: 0,
                bestScore: 0,
                worstScore: 0,
                completionRate: 0,
                averageSeriesPerTraining: 0
            };
        }

        const totalScore = shots.reduce((sum, shot) => sum + shot.score, 0);
        const totalX = shots.reduce((sum, shot) => sum + shot.x, 0);
        const totalY = shots.reduce((sum, shot) => sum + shot.y, 0);

        return {
            totalSeries: series.length,
            totalShots: shots.length,
            averageScore: totalScore / shots.length,
            averageHitPoint: totalX / shots.length,
            averageHoleSize: this.calculateMinBoundingCircle(shots.map(s => ({ x: s.x, y: s.y }))),
            bestScore: Math.max(...shots.map(s => s.score)),
            worstScore: Math.min(...shots.map(s => s.score)),
            completionRate: training.endTimeStamp ? 1 : 0,
            averageSeriesPerTraining: series.length
        };
    }

    // Получить статистику по всем тренировкам пользователя
    async getUserTrainingStatistics(userId: number): Promise<UserTrainingStatisticsDto> {
        const trainings = await this.trainingRepository.findAllByUser(userId);
        if (trainings.length === 0) {
            return {
                totalTrainings: 0,
                averageScore: 0,
                averageHitPoint: 0,
                averageHoleSize: 0,
                bestScore: 0,
                worstScore: 0,
                completionRate: 0
            };
        }

        const allShots = trainings.reduce((acc, t) => [...acc, ...t.getSeries().reduce((acc2, s) => [...acc2, ...s.allShots], [])], []);
        if (allShots.length === 0) {
            return {
                totalTrainings: trainings.length,
                averageScore: 0,
                averageHitPoint: 0,
                averageHoleSize: 0,
                bestScore: 0,
                worstScore: 0,
                completionRate: trainings.filter(t => t.endTimeStamp).length / trainings.length
            };
        }

        const totalScore = allShots.reduce((sum, shot) => sum + shot.score, 0);
        const totalX = allShots.reduce((sum, shot) => sum + shot.x, 0);
        const totalY = allShots.reduce((sum, shot) => sum + shot.y, 0);

        return {
            totalTrainings: trainings.length,
            averageScore: totalScore / allShots.length,
            averageHitPoint: totalX / allShots.length,
            averageHoleSize: this.calculateMinBoundingCircle(allShots.map(s => ({ x: s.x, y: s.y }))),
            bestScore: Math.max(...allShots.map(s => s.score)),
            worstScore: Math.min(...allShots.map(s => s.score)),
            completionRate: trainings.filter(t => t.endTimeStamp).length / trainings.length
        };
    }

    private mapToDto(model: TrainingModel): TrainingDto {
        return {
            id: model.id,
            startTimeStamp: model.startTimeStamp,
            endTimeStamp: model.endTimeStamp,
            series: model.getSeries().map(s => this.mapSeriesToDto(s)),
            notes: model.getNotes().map(n => this.mapNoteToDto(n)),
            type: model instanceof QualificationTrainingModel ? 'qualification' : 'free'
        };
    }

    private mapSeriesToDto(model: SeriesModel): SeriesDto {
        return {
            id: model.id,
            beginTimeOffset: model.beginTimeOffset,
            endTimeOffset: model.endTimeOffset,
            maxShots: model.maxShots,
            shots: model.allShots.map(shot => ({
                id: shot.id,
                x: shot.x,
                y: shot.y,
                score: shot.score,
                timeOffset: shot.timeOffset
            })),
            notes: model.allNotes.map(n => this.mapNoteToDto(n)),
            seriesTotalScore: model.seriesTotalScore,
            shotCount: model.shotCount,
            averageScore: model.averageScore,
            averagePoint: model.averagePoint
        };
    }

    private mapNoteToDto(model: NoteModel): NoteDto {
        return {
            id: model.id,
            userId: model.user.id,
            createdAt: model.createdAt,
            editedAt: model.editedAt,
            content: model.content
        };
    }

    // Вычисление наименьшей окружности, описывающей все центры попаданий
    private calculateMinBoundingCircle(shots: { x: number; y: number }[]): number {
        if (shots.length === 0) return 0;
        if (shots.length === 1) return 0;

        // Находим центр масс
        const centerX = shots.reduce((sum, shot) => sum + shot.x, 0) / shots.length;
        const centerY = shots.reduce((sum, shot) => sum + shot.y, 0) / shots.length;

        // Находим максимальное расстояние от центра масс до любой точки
        const maxDistance = Math.max(...shots.map(shot => 
            Math.sqrt(Math.pow(shot.x - centerX, 2) + Math.pow(shot.y - centerY, 2))
        ));

        return maxDistance * 2; // Диаметр окружности
    }
} 