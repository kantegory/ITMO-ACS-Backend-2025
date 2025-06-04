import { Note } from "./Note";
import { Series } from "./Series";

export abstract class Training {
    protected notes: Note[] = [];
    protected series: Series[] = [];

    protected _endTs: Date | undefined = undefined
    

    constructor(
        protected _startTs: Date,
    ) {
    }

    // Проверка времени
    private validateTimeRange(start: Date, end: Date): void {
        if (start >= end) {
            throw new Error("Время начала должно быть раньше времени конца");
        }
    }

    // Добавление заметки
    addNote(note: Note): void {
        this.notes.push(note);
    }

    // Удаление заметки
    removeNote(note: Note): void {
        this.notes = this.notes.filter(n => n !== note);
    }

    // Получение заметок
    getNotes(): Note[] {
        return this.notes;
    }


    // Создание и добавление серии
    addSeries(
        beginTimeOffset: number,
        max_shots: number | undefined = undefined
    ): Series {
        const newSeries = new Series(
            this,
            beginTimeOffset,
            max_shots
        );
        this.series.push(newSeries);
        return newSeries;
    }

    // Получение всех серий
    getSeries(): Series[] {
        return this.series;
    }
}