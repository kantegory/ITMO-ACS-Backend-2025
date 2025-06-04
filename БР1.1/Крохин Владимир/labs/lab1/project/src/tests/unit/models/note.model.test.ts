import { NoteModel } from '../../../application/domain/note.model';
import { UserModel } from '../../../application/domain/user.model';

describe('NoteModel', () => {
    let noteModel: NoteModel;
    let userModel: UserModel;
    let testDate: Date;

    beforeEach(() => {
        userModel = new UserModel(null, 'testuser', 'password123');
        testDate = new Date();
        noteModel = new NoteModel(1, userModel, testDate, null, 'Тестовая заметка');
    });

    describe('конструктор', () => {
        it('должен создавать заметку с корректными данными', () => {
            expect(noteModel.id).toBe(1);
            expect(noteModel.user).toBe(userModel);
            expect(noteModel.createdAt).toBe(testDate);
            expect(noteModel.editedAt).toBeNull();
            expect(noteModel.content).toBe('Тестовая заметка');
        });

        it('должен выбрасывать ошибку при пустом содержимом', () => {
            expect(() => {
                new NoteModel(1, userModel, testDate, null, '');
            }).toThrow('Содержимое заметки не может быть пустым');

            expect(() => {
                new NoteModel(1, userModel, testDate, null, '   ');
            }).toThrow('Содержимое заметки не может быть пустым');
        });
    });

    describe('свойство content', () => {
        it('должен возвращать корректное содержимое', () => {
            expect(noteModel.content).toBe('Тестовая заметка');
        });

        it('должен корректно обновлять содержимое', () => {
            noteModel.content = 'Обновленная заметка';
            expect(noteModel.content).toBe('Обновленная заметка');
            expect(noteModel.editedAt).not.toBeNull();
        });

        it('должен выбрасывать ошибку при установке пустого содержимого', () => {
            expect(() => {
                noteModel.content = '';
            }).toThrow('Содержимое заметки не может быть пустым');

            expect(() => {
                noteModel.content = '   ';
            }).toThrow('Содержимое заметки не может быть пустым');
        });
    });

    describe('временные метки', () => {
        it('должен сохранять время создания', () => {
            expect(noteModel.createdAt).toBe(testDate);
        });

        it('должен обновлять время редактирования при изменении содержимого', () => {
            const beforeEdit = noteModel.editedAt;
            noteModel.content = 'Новое содержимое';
            expect(noteModel.editedAt).not.toBe(beforeEdit);
            expect(noteModel.editedAt).toBeInstanceOf(Date);
        });
    });
}); 