import { BaseModel } from './base.model';
import { ShotModel } from './shot.model';
import { NoteModel } from './note.model';

export class SeriesModel extends BaseModel {
    private shots: ShotModel[] = [];
    private notes: NoteModel[] = [];
    private _endTimeOffset: number | null = null;

    constructor(id: number | null, private _beginTimeOffset: number, private _maxShots?: number) {
        super(id);
    }

    get beginTimeOffset(): number {
        return this._beginTimeOffset;
    }

    get endTimeOffset(): number | null {
        return this._endTimeOffset;
    }

    set endTimeOffset(value: number | null) {
        if (value && value < this._beginTimeOffset) {
            throw new Error('Время окончания не может быть раньше времени начала');
        }
        this._endTimeOffset = value;
    }

    get maxShots(): number | undefined {
        return this._maxShots;
    }

    addShot(shot: ShotModel): void {
        if (this._maxShots && this.shots.length >= this._maxShots) {
            throw new Error('Достигнуто максимальное количество выстрелов в серии');
        }
        this.shots.push(shot);
    }

    removeShot(shotId: number): void {
        this.shots = this.shots.filter(shot => shot.id !== shotId);
    }

    get allShots(): ShotModel[] {
        return [...this.shots];
    }

    addNote(note: NoteModel): void {
        this.notes.push(note);
    }

    removeNote(noteId: number): void {
        this.notes = this.notes.filter(note => note.id !== noteId);
    }

    get allNotes(): NoteModel[] {
        return [...this.notes];
    }

    get seriesTotalScore(): number {
        return this.shots.reduce((sum, shot) => sum + shot.score, 0);
    }

    get shotCount(): number {
        return this.shots.length;
    }

    get averageScore(): number {
        return this.shots.length > 0 ? this.seriesTotalScore / this.shots.length : 0;
    }

    get averagePoint(): { x: number; y: number } {
        if (this.shots.length === 0) {
            return { x: 0, y: 0 };
        }
        const totalX = this.shots.reduce((sum, shot) => sum + shot.x, 0);
        const totalY = this.shots.reduce((sum, shot) => sum + shot.y, 0);
        return {
            x: totalX / this.shots.length,
            y: totalY / this.shots.length
        };
    }
} 