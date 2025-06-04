import { NoteService } from '../../../application/services/note.service';
import { FakeNoteRepository } from '../../../infrastructure/repositories/fakes/note.repository';
import { NoteModel } from '../../../application/domain/note.model';
import { UserModel } from '../../../application/domain/user.model';
import { UserRole } from '../../../application/domain/user-role.enum';

describe('NoteService', () => {
    let noteService: NoteService;
    let fakeNoteRepository: FakeNoteRepository;
    let user: UserModel;
    let note: NoteModel;

    beforeEach(() => {
        fakeNoteRepository = new FakeNoteRepository();
        noteService = new NoteService(fakeNoteRepository);
        user = new UserModel(1, 'testuser', 'password', UserRole.ATHLETE);
        note = new NoteModel(null, 'Test Note', 'Test Content', user);
    });

    describe('создание заметки', () => {
        it('должен создавать новую заметку', async () => {
            const text = 'New Note';
            const newNote = await noteService.createNote(text, user);

            expect(newNote).toBeInstanceOf(NoteModel);
            expect(newNote.text).toBe(text);
            expect(newNote.user).toBe(user);
        });

        it('должен выбрасывать ошибку при создании заметки с пустым текстом', async () => {
            await expect(noteService.createNote('', user))
                .rejects.toThrow('Текст заметки не может быть пустым');
        });
    });

    describe('получение заметки', () => {
        let noteId: number;
        beforeEach(async () => {
            const note = await noteService.createNote('Заметка 2', user);
            noteId = note.id!;
        });

        it('должен получать заметку по id', async () => {
            const note = await noteService.getNoteById(noteId);
            expect(note).toBeDefined();
            expect(note.id).toBe(noteId);
        });

        it('должен выбрасывать ошибку при получении несуществующей заметки', async () => {
            await expect(noteService.getNoteById(999))
                .rejects.toThrow('Заметка не найдена');
        });
    });

    describe('обновление заметки', () => {
        let noteId: number;
        beforeEach(async () => {
            const note = await noteService.createNote('Заметка 3', user);
            noteId = note.id!;
        });

        it('должен обновлять текст заметки', async () => {
            const newText = 'Updated Note';
            const updated = await noteService.updateNote(noteId, newText);
            expect(updated.text).toBe(newText);
        });

        it('должен выбрасывать ошибку при обновлении несуществующей заметки', async () => {
            await expect(noteService.updateNote(999, 'Текст'))
                .rejects.toThrow('Заметка не найдена');
        });

        it('должен не обновлять текст заметки, если нет нового текста', async () => {
            const initialText = note.text;

            await noteService.updateNote(note.id!, '');

            expect(note.text).toBe(initialText);
        });
    });

    describe('удаление заметки', () => {
        let noteId: number;
        beforeEach(async () => {
            const note = await noteService.createNote('Заметка 4', user);
            noteId = note.id!;
        });

        it('должен удалять заметку', async () => {
            await expect(noteService.deleteNote(noteId)).resolves.not.toThrow();
            await expect(noteService.getNoteById(noteId))
                .rejects.toThrow('Заметка не найдена');
        });

        it('должен выбрасывать ошибку при удалении несуществующей заметки', async () => {
            await expect(noteService.deleteNote(999))
                .rejects.toThrow('Заметка не найдена');
        });
    });

    describe('createNote', () => {
        it('should create a new note with provided title, content and author', () => {
            const title = 'New Note';
            const content = 'New Content';
            const newNote = noteService.createNote(title, content, user);

            expect(newNote).toBeInstanceOf(NoteModel);
            expect(newNote.title).toBe(title);
            expect(newNote.content).toBe(content);
            expect(newNote.author).toBe(user);
        });
    });

    describe('updateNote', () => {
        it('should update note title', () => {
            const newTitle = 'Updated Note';
            noteService.updateNote(note, newTitle);

            expect(note.title).toBe(newTitle);
        });

        it('should update note content', () => {
            const newContent = 'Updated Content';
            noteService.updateNote(note, undefined, newContent);

            expect(note.content).toBe(newContent);
        });

        it('should update both title and content when both are provided', () => {
            const newTitle = 'Updated Note';
            const newContent = 'Updated Content';
            noteService.updateNote(note, newTitle, newContent);

            expect(note.title).toBe(newTitle);
            expect(note.content).toBe(newContent);
        });

        it('should not update anything when no parameters are provided', () => {
            const initialTitle = note.title;
            const initialContent = note.content;

            noteService.updateNote(note);

            expect(note.title).toBe(initialTitle);
            expect(note.content).toBe(initialContent);
        });
    });
}); 