import { NoteRepository } from '../repositories/interfaces/note.repository';
import { UserRepository } from '../repositories/interfaces/user.repository';
import { NoteService } from '../../application/services/note.service';
import { NoteModel } from '../../application/domain/note.model';
import { UserModel } from '../../application/domain/user.model';

export class NoteInfrastructureService {
    constructor(
        private readonly noteRepository: NoteRepository,
        private readonly userRepository: UserRepository,
        private readonly noteService: NoteService
    ) {}

    async getNoteById(id: number): Promise<NoteModel> {
        const note = await this.noteRepository.findById(id);
        if (!note) throw new Error('Note not found');
        return note;
    }

    async createNote(userId: number, content: string): Promise<NoteModel> {
        const user = await this.userRepository.findById(userId);
        if (!user) throw new Error('User not found');
        const note = new NoteModel(user, content);
        return this.noteRepository.save(note);
    }

    async updateNote(id: number, content: string): Promise<NoteModel> {
        const note = await this.getNoteById(id);
        this.noteService.updateNote(note, content);
        return this.noteRepository.save(note);
    }

    async deleteNote(id: number): Promise<void> {
        await this.getNoteById(id);
        await this.noteRepository.delete(id);
    }
} 