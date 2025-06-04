import { ShotModel } from '../domain/shot.model';
import { SeriesModel } from '../domain/series.model';

export class ShotService {
    createShot(series: SeriesModel, x: number, y: number, score: number, timeOffset: number): ShotModel {
        const shot = new ShotModel(null, x, y, score, timeOffset);
        series.addShot(shot);
        return shot;
    }

    calculateStatistics(shots: ShotModel[]): {
        averageHitPoint: { x: number; y: number };
        averageHoleSize: number;
        accuracy: number;
        averageScore: number;
        bestScore: number;
        worstScore: number;
    } {
        if (shots.length === 0) {
            return {
                averageHitPoint: { x: 0, y: 0 },
                averageHoleSize: 0,
                accuracy: 0,
                averageScore: 0,
                bestScore: 0,
                worstScore: 0
            };
        }

        const totalScore = shots.reduce((sum, shot) => sum + shot.score, 0);
        const totalX = shots.reduce((sum, shot) => sum + shot.x, 0);
        const totalY = shots.reduce((sum, shot) => sum + shot.y, 0);

        // Вычисляем точность как процент попаданий в десятку
        const accuracy = (shots.filter(shot => shot.score >= 10).length / shots.length) * 100;

        return {
            averageHitPoint: {
                x: totalX / shots.length,
                y: totalY / shots.length
            },
            averageHoleSize: this.calculateMinBoundingCircle(shots.map(s => ({ x: s.x, y: s.y }))),
            accuracy,
            averageScore: totalScore / shots.length,
            bestScore: Math.max(...shots.map(s => s.score)),
            worstScore: Math.min(...shots.map(s => s.score))
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