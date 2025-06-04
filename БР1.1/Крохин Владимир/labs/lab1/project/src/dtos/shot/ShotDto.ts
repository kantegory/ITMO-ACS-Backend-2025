export interface ShotDto {
    id: number | null;
    x: number;
    y: number;
    score: number;
    timeOffset: number;
}

export interface ShotStatisticsDto {
    averageHitPoint: {
        x: number;
        y: number;
    };
    averageHoleSize: number;
    accuracy: number;
    averageScore: number;
    bestScore: number;
    worstScore: number;
} 