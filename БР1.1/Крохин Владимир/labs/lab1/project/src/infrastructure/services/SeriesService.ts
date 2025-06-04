import { SeriesRepository } from '../repositories/interfaces/series.repository';
import { SeriesModel } from '../domain/series.model';
import { SeriesDto, SeriesStatisticsDto } from '../../dtos/series/SeriesDto';
import { ShotModel } from '../domain/shot.model';
import { NoteModel } from '../domain/note.model';
import { UserModel } from '../domain/user.model';

export class SeriesService {
    constructor(private readonly seriesRepository: SeriesRepository) {}

    async getSeriesById(id: number): Promise<SeriesDto> {
        const series = await this.seriesRepository.findById(id);
        if (!series) {
            throw new Error('Серия не найдена');
        }
        return this.mapToDto(series);
    }

    async addShot(seriesId: number, x: number, y: number, score: number, timeOffset: number): Promise<SeriesDto> {
        const series = await this.seriesRepository.findById(seriesId);
        if (!series) {
            throw new Error('Серия не найдена');
        }

        const shot = new ShotModel(null, x, y, score, timeOffset);
        series.addShot(shot);
        const updatedSeries = await this.seriesRepository.save(series);
        return this.mapToDto(updatedSeries);
    }

    async addNote(seriesId: number, user: UserModel, content: string): Promise<SeriesDto> {
        const series = await this.seriesRepository.findById(seriesId);
        if (!series) {
            throw new Error('Серия не найдена');
        }

        const note = new NoteModel(null, user, new Date(), null, content);
        series.addNote(note);
        const updatedSeries = await this.seriesRepository.save(series);
        return this.mapToDto(updatedSeries);
    }

    async removeNote(seriesId: number, noteId: number): Promise<void> {
        const series = await this.seriesRepository.findById(seriesId);
        if (!series) {
            throw new Error('Серия не найдена');
        }

        series.removeNote(noteId);
        await this.seriesRepository.save(series);
    }

    async getSeriesStatistics(seriesId: number): Promise<SeriesStatisticsDto> {
        const series = await this.seriesRepository.findById(seriesId);
        if (!series) {
            throw new Error('Серия не найдена');
        }

        const shots = series.allShots;
        if (shots.length === 0) {
            return {
                totalShots: 0,
                averageScore: 0,
                bestScore: 0,
                worstScore: 0,
                averagePoint: { x: 0, y: 0 },
                completionRate: 0
            };
        }

        const totalScore = shots.reduce((sum, shot) => sum + shot.score, 0);
        const totalX = shots.reduce((sum, shot) => sum + shot.x, 0);
        const totalY = shots.reduce((sum, shot) => sum + shot.y, 0);

        return {
            totalShots: shots.length,
            averageScore: totalScore / shots.length,
            bestScore: Math.max(...shots.map(s => s.score)),
            worstScore: Math.min(...shots.map(s => s.score)),
            averagePoint: {
                x: totalX / shots.length,
                y: totalY / shots.length
            },
            completionRate: series.endTimeOffset ? 1 : 0
        };
    }

    private mapToDto(model: SeriesModel): SeriesDto {
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
            notes: model.allNotes.map(note => ({
                id: note.id,
                userId: note.user.id,
                createdAt: note.createdAt,
                editedAt: note.editedAt,
                content: note.content
            })),
            seriesTotalScore: model.seriesTotalScore,
            shotCount: model.shotCount,
            averageScore: model.averageScore,
            averagePoint: model.averagePoint
        };
    }
} 