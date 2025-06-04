import { Note } from "./Note";
import { Shot } from "./Shot";
import { Training } from "./Training";

export class Series {
    private notes: Note[] = [];
    private shots: Shot[] = [];
    public endTimeOffset: number | undefined = undefined;


    constructor(
        public training: Training,
        public beginTimeOffset: number,
        public max_shots: number | undefined = undefined // undefined — без ограничений
    ) {
        this.validateMaxShots(max_shots);
    }

    private validateMaxShots(max_shots: number | undefined): void {
        if (max_shots && max_shots < 0) {
            throw Error("Указанное максимальное количество выстрелов должно быть больше 0.")
        }
    }

    // Добавление выстрела с проверкой ограничения
    addShot(x: number, y: number, score: number, timeOffset: number): void {
        if (this.max_shots && this.shots.length >= this.max_shots) {
            throw new Error(`Максимальное количество выстрелов (${this.max_shots}) в серии достигнуто`);
        }

        const newShot = new Shot(
            this,
            x,
            y,
            score,
            timeOffset
        );

        this.shots.push(newShot);
    }

    // Добавление заметки
    addNote(note: Note): void {
        this.notes.push(note);
    }

    // Удаление заметки
    removeNote(note: Note): void {
        this.notes = this.notes.filter(n => n !== note);
    }

    // Получение всех заметок
    get allNotes(): Note[] {
        return this.notes;
    }

    // Получение всех выстрелов
    get allShots(): Shot[] {
        return this.shots
    }

    get seriesTotalScore(): number {
        if (this.shots.length === 0) return 0;
        const total = this.shots.reduce((sum, s) => sum + s.score, 0);
        return total
    }

    // Получение текущего количества выстрелов
    get shotCount(): number {
        return this.shots.length;
    }

    // Получение среднего значения серии
    get averageScore(): number {
        const total = this.seriesTotalScore;
        const shotsCount = this.shotCount;
        return shotsCount === 0 ? 0 : total / shotsCount;
    }

    // Вычисление средней точки попадания
    get averagePoint(): { x: number; y: number } {
        if (this.shots.length === 0) return { x: 0, y: 0 };
        const totalX = this.shots.reduce((sum, s) => sum + s.x, 0);
        const totalY = this.shots.reduce((sum, s) => sum + s.y, 0);
        return {
            x: totalX / this.shots.length,
            y: totalY / this.shots.length
        };
    }


}