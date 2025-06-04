import { NoteModel } from "../../../domain/note.model";

export interface NoteRepository {
    findById(id: number): Promise<NoteModel | null>;
    findAllByUser(userId: number): Promise<NoteModel[]>;
    save(note: NoteModel): Promise<NoteModel>;
    delete(id: number): Promise<void>;
} 