import { User } from "./User";


export class Note {
    private _createdAt: Date = new Date()
    private _editedAt: Date = new Date()

    constructor(
        public user: User,
        private _content: string,
    ) {
        this.validateContentLength(_content);
    }

    // Валидация длины текста
    private validateContentLength(content: string): void {
        if (content.length < 10) {
            throw new Error("Заметка должна содержать хотя бы 10 символов.");
        }
    }

    // Обновление текста заметки
    updateContent(content: string): void {
        this.validateContentLength(content);
        this._content = content;
        this._editedAt = new Date();
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get editedAt(): Date {
        return this._editedAt
    }

    // Получение текста заметки
    get content(): string {
        return this._content;
    }
}