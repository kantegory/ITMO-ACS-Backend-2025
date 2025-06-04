import { NoteModel } from '../domain/note.model';
import { UserModel } from '../domain/user.model';

export class NoteService {
    updateNote(note: NoteModel, content: string): void {
        note.content = content;
    }
} 