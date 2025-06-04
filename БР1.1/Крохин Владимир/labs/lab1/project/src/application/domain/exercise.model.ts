import { BaseModel } from './base.model';
import { TargetModel } from "./target.model";

export class ExerciseModel extends BaseModel {
    constructor(
        id: number | null,
        private _name: string,
        private _description: string,
        private _shotsInSeries: number
    ) {
        super(id);
        this.validateName(_name);
        this.validateDescription(_description);
        this.validateShotsInSeries(_shotsInSeries);
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this.validateName(value);
        this._name = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this.validateDescription(value);
        this._description = value;
    }

    get shotsInSeries(): number {
        return this._shotsInSeries;
    }

    set shotsInSeries(value: number) {
        this.validateShotsInSeries(value);
        this._shotsInSeries = value;
    }

    private validateName(name: string): void {
        if (!name || name.trim().length === 0) {
            throw new Error('Название упражнения не может быть пустым');
        }
    }

    private validateDescription(description: string): void {
        if (!description || description.trim().length === 0) {
            throw new Error('Описание упражнения не может быть пустым');
        }
    }

    private validateShotsInSeries(shotsInSeries: number): void {
        if (shotsInSeries <= 0) {
            throw new Error('Количество выстрелов в серии должно быть положительным числом');
        }
    }
} 