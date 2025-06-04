import { BaseModel } from './base.model';
import { UserModel } from './user.model';

export class NoteModel extends BaseModel {
    constructor(
        id: number | null,
        public user: UserModel,
        public createdAt: Date,
        public editedAt: Date | null,
        private _content: string
    ) {
        super(id);
        this.validateContent(_content);
    }

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this.validateContent(value);
        this._content = value;
        this.editedAt = new Date();
    }

    private validateContent(content: string): void {
        if (!content || content.trim().length === 0) {
            throw new Error('Содержимое заметки не может быть пустым');
        }
    }
} 