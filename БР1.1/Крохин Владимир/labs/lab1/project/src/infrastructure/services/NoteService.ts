import { NoteRepository } from '../repositories/interfaces/note.repository';
import { NoteModel } from '../domain/note.model';
import { NoteDto } from '../../dtos/note/NoteDto';
import { UserModel } from '../domain/user.model';

export class NoteService {
    constructor(private readonly noteRepository: NoteRepository) {}

    // Создать заметку
    async createNote(user: UserModel, content: string): Promise<NoteDto> {
        const note = new NoteModel(null, user, new Date(), null, content);
        const savedNote = await this.noteRepository.save(note);
        return this.mapToDto(savedNote);
    }

    // Получить заметку по ID
    async getNoteById(id: number): Promise<NoteDto> {
        const note = await this.noteRepository.findById(id);
        if (!note) {
            throw new Error('Заметка не найдена');
        }
        return this.mapToDto(note);
    }

    // Обновить заметку
    async updateNote(id: number, content: string): Promise<NoteDto> {
        const note = await this.noteRepository.findById(id);
        if (!note) {
            throw new Error('Заметка не найдена');
        }

        note.content = content;
        const updatedNote = await this.noteRepository.save(note);
        return this.mapToDto(updatedNote);
    }

    // Удалить заметку
    async deleteNote(id: number): Promise<void> {
        const note = await this.noteRepository.findById(id);
        if (!note) {
            throw new Error('Заметка не найдена');
        }
        await this.noteRepository.delete(id);
    }

    // Получить историю заметки
    async getNoteHistory(id: number): Promise<NoteDto[]> {
        const note = await this.noteRepository.findById(id);
        if (!note) {
            throw new Error('Заметка не найдена');
        }

        const history = await this.noteRepository.getHistory(id);
        return history.map(note => this.mapToDto(note));
    }

    private mapToDto(model: NoteModel): NoteDto {
        return {
            id: model.id,
            userId: model.user.id,
            createdAt: model.createdAt,
            editedAt: model.editedAt,
            content: model.content
        };
    }
} 