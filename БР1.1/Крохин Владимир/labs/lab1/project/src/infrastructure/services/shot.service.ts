import { ShotService } from '../../application/services/shot.service';
import { ShotRepository } from '../repositories/interfaces/shot.repository';
import { ShotModel } from '../../application/domain/shot.model';
import { SeriesModel } from '../../application/domain/series.model';
import { ShotDto, ShotStatisticsDto } from '../../dtos/shot/ShotDto';

export class ShotInfrastructureService {
    constructor(
        private readonly shotService: ShotService,
        private readonly shotRepository: ShotRepository
    ) {}

    async getShotById(id: number): Promise<ShotDto | null> {
        const shot = await this.shotRepository.findById(id);
        return shot ? this.mapToDto(shot) : null;
    }

    async addShot(series: SeriesModel, x: number, y: number, score: number, timeOffset: number): Promise<ShotDto> {
        const shot = this.shotService.createShot(series, x, y, score, timeOffset);
        const savedShot = await this.shotRepository.save(shot);
        return this.mapToDto(savedShot);
    }

    async getShotStatistics(seriesId: number): Promise<ShotStatisticsDto> {
        const shots = await this.shotRepository.findAllBySeries(seriesId);
        return this.shotService.calculateStatistics(shots);
    }

    private mapToDto(model: ShotModel): ShotDto {
        return {
            id: model.id,
            x: model.x,
            y: model.y,
            score: model.score,
            timeOffset: model.timeOffset
        };
    }
} 