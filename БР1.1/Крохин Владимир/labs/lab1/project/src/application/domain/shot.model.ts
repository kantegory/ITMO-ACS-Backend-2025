import { BaseModel } from './base.model';

export class ShotModel extends BaseModel {
    private _x: number;
    private _y: number;
    private _score: number;
    private _timeOffset: number;
    private _holeSize?: number;

    constructor(id: number | null, x: number, y: number, score: number, timeOffset: number, holeSize?: number) {
        super(id);
        this.validateCoordinates(x, y);
        this.validateScore(score);
        this.validateTimeOffset(timeOffset);
        this.validateHoleSize(holeSize);
        this._x = x;
        this._y = y;
        this._score = score;
        this._timeOffset = timeOffset;
        this._holeSize = holeSize;
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this.validateCoordinates(value, this._y);
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this.validateCoordinates(this._x, value);
        this._y = value;
    }

    get score(): number {
        return this._score;
    }

    set score(value: number) {
        this.validateScore(value);
        this._score = value;
    }

    get timeOffset(): number {
        return this._timeOffset;
    }

    set timeOffset(value: number) {
        this.validateTimeOffset(value);
        this._timeOffset = value;
    }

    get holeSize(): number | undefined {
        return this._holeSize;
    }

    set holeSize(value: number | undefined) {
        this.validateHoleSize(value);
        this._holeSize = value;
    }

    private validateCoordinates(x: number, y: number): void {
        if (x < -10 || x > 10 || y < -10 || y > 10) {
            throw new Error('Координаты должны быть в диапазоне от -10 до 10');
        }
    }

    private validateScore(score: number): void {
        if (score < 0 || score > 10) {
            throw new Error('Оценка должна быть в диапазоне от 0 до 10');
        }
    }

    private validateTimeOffset(timeOffset: number): void {
        if (timeOffset < 0) {
            throw new Error('Временное смещение не может быть отрицательным');
        }
    }

    private validateHoleSize(holeSize: number | undefined): void {
        if (holeSize !== undefined && (holeSize < 0 || holeSize > 1)) {
            throw new Error('Размер отверстия должен быть в диапазоне от 0 до 1');
        }
    }
} 