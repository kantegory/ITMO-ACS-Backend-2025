import { Series } from "./Series";

export class Shot {
    constructor(
        public series: Series,
        private _x: number,
        private _y: number,
        public score: number,
        public timeOffset: number
    ) {
        this.validateCoordinates(_x, _y);
        this.validateScore(score);
    }

    // Проверка: координаты в диапазоне [-1, 1]
    private validateCoordinates(x: number, y: number): void {
        if (x < -1 || x > 1 || y < -1 || y > 1) {
            throw new Error("Координаты должны быть указаны между -1 и 1");
        }
    }

    private validateScore(score: number): void {
        if (score < 0 || score > 10.9) {
            throw new Error("Указанное количество очков за выстрел должно быть от 0.0 до 10.9")
        }
    }

    // Геттеры и сеттеры с валидацией
    set x(value: number) {
        this.validateCoordinates(value, this._y);
        this._x = value;
    }

    set y(value: number) {
        this.validateCoordinates(this._x, value);
        this._y = value;
    }
}