import { BaseModel } from './base.model';

export class TargetModel extends BaseModel {
    constructor(
        id: number | null,
        private _name: string,
        private _description: string,
    ) {
        super(id);
        this.validateName(_name);
        this.validateDescription(_description);
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


    private validateName(name: string): void {
        if (!name || name.trim().length === 0) {
            throw new Error('Название мишени не может быть пустым');
        }
    }

    private validateDescription(description: string): void {
        if (!description || description.trim().length === 0) {
            throw new Error('Описание мишени не может быть пустым');
        }
    }

} 