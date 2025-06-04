import { BaseModel } from './base.model';
import { SeriesModel } from './series.model';
import { NoteModel } from './note.model';
import { ExerciseModel } from './exercise.model';

export class TrainingModel extends BaseModel {
    protected notes: NoteModel[] = [];
    protected series: SeriesModel[] = [];
    protected _endTs: Date | null = null;

    constructor(
        id: number | null,
        protected _startTs: Date,
        protected _exercise?: ExerciseModel
    ) {
        super(id);
    }

    get startTimeStamp(): Date {
        return this._startTs;
    }

    get endTimeStamp(): Date | null {
        return this._endTs;
    }

    set endTimeStamp(value: Date | null) {
        if (value && value < this._startTs) {
            throw new Error('Время окончания не может быть раньше времени начала');
        }
        this._endTs = value;
    }

    get exercise(): ExerciseModel | undefined {
        return this._exercise;
    }

    set exercise(value: ExerciseModel | undefined) {
        this._exercise = value;
    }

    addNote(note: NoteModel): void {
        this.notes.push(note);
    }

    removeNote(noteId: number): void {
        this.notes = this.notes.filter(note => note.id !== noteId);
    }

    getNotes(): NoteModel[] {
        return [...this.notes];
    }

    addSeries(beginTimeOffset: number, maxShots?: number): SeriesModel {
        const series = new SeriesModel(null, beginTimeOffset, maxShots);
        this.series.push(series);
        return series;
    }

    getSeries(): SeriesModel[] {
        return [...this.series];
    }
} 