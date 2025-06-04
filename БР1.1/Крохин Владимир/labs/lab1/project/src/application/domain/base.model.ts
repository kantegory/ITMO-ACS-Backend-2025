export abstract class BaseModel {
    constructor(protected _id: number | null) {}

    get id(): number | null {
        return this._id;
    }

    set id(value: number | null) {
        this._id = value;
    }
} 