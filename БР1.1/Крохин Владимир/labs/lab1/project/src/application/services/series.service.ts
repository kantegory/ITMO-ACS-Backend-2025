import { SeriesModel } from '../domain/series.model';
import { ShotModel } from '../domain/shot.model';
import { NoteModel } from '../domain/note.model';
import { UserModel } from '../domain/user.model';

export class SeriesService {
    addShot(series: SeriesModel, x: number, y: number, score: number, timeOffset: number): void {
        const shot = new ShotModel(null, x, y, score, timeOffset);
        series.addShot(shot);
    }

    addNote(series: SeriesModel, user: UserModel, content: string): void {
        const note = new NoteModel(null, user, new Date(), null, content);
        series.addNote(note);
    }

    removeNote(series: SeriesModel, noteId: number): void {
        series.removeNote(noteId);
    }

    calculateStatistics(series: SeriesModel): {
        totalShots: number;
        averageScore: number;
        bestScore: number;
        worstScore: number;
        averagePoint: { x: number; y: number };
        completionRate: number;
    } {
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
} 