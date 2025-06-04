import { ShotDto } from '../shot/ShotDto';
import { NoteDto } from '../note/NoteDto';

export interface SeriesDto {
    id: number | null;
    beginTimeOffset: number;
    endTimeOffset: number | null;
    maxShots?: number;
    shots: ShotDto[];
    notes: NoteDto[];
    seriesTotalScore: number;
    shotCount: number;
    averageScore: number;
    averagePoint: { x: number; y: number };
}

export interface SeriesStatisticsDto {
    totalShots: number;
    averageScore: number;
    bestScore: number;
    worstScore: number;
    averagePoint: {
        x: number;
        y: number;
    };
    completionRate: number;
} 