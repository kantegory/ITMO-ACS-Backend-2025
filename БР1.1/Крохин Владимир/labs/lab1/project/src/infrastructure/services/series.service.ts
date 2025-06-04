import { SeriesService } from '../../application/services/series.service';
import { SeriesRepository } from '../repositories/interfaces/series.repository';
import { SeriesModel } from '../../application/domain/series.model';
import { UserModel } from '../../application/domain/user.model';
import { SeriesDto, SeriesStatisticsDto } from '../../dtos/series/SeriesDto';
import { ShotModel } from '../../application/domain/shot.model';
import { NoteModel } from '../../application/domain/note.model';

export class SeriesInfrastructureService {
    constructor(
        private readonly seriesService: SeriesService,
        private readonly seriesRepository: SeriesRepository
    ) {}

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

        this.seriesService.addShot(series, x, y, score, timeOffset);
        const updatedSeries = await this.seriesRepository.save(series);
        return this.mapToDto(updatedSeries);
    }

    async addNote(seriesId: number, user: UserModel, content: string): Promise<SeriesDto> {
        const series = await this.seriesRepository.findById(seriesId);
        if (!series) {
            throw new Error('Серия не найдена');
        }

        this.seriesService.addNote(series, user, content);
        const updatedSeries = await this.seriesRepository.save(series);
        return this.mapToDto(updatedSeries);
    }

    async removeNote(seriesId: number, noteId: number): Promise<void> {
        const series = await this.seriesRepository.findById(seriesId);
        if (!series) {
            throw new Error('Серия не найдена');
        }

        this.seriesService.removeNote(series, noteId);
        await this.seriesRepository.save(series);
    }

    async getSeriesStatistics(seriesId: number): Promise<SeriesStatisticsDto> {
        const series = await this.seriesRepository.findById(seriesId);
        if (!series) {
            throw new Error('Серия не найдена');
        }

        return this.seriesService.calculateStatistics(series);
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