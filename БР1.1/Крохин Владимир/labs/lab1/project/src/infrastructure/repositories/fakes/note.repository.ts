import { NoteModel } from '../../../application/domain/note.model';
import { BaseFakeRepository } from './base.repository';
import { NoteRepository } from '../interfaces/note.repository';

export class FakeNoteRepository extends BaseFakeRepository<NoteModel> implements NoteRepository {
    async findAllByUser(userId: number): Promise<NoteModel[]> {
        return this.items.filter(note => note.user.id === userId);
    }
} 