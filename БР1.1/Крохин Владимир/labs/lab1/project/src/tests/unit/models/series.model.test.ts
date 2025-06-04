import { SeriesModel } from '../../../application/domain/series.model';
import { ShotModel } from '../../../application/domain/shot.model';
import { NoteModel } from '../../../application/domain/note.model';
import { UserModel } from '../../../application/domain/user.model';

describe('SeriesModel', () => {
    let seriesModel: SeriesModel;
    let userModel: UserModel;
    let shotModel: ShotModel;
    let noteModel: NoteModel;

    beforeEach(() => {
        seriesModel = new SeriesModel(null, 0, 10);
        userModel = new UserModel(null, 'user1', 'password123');
        shotModel = new ShotModel(null, 0, 0, 10, 0);
        const now = new Date();
        noteModel = new NoteModel(null, userModel, now, null, 'Тестовая заметка');
    });

    describe('конструктор', () => {
        it('должен создавать серию с корректными данными', () => {
            expect(seriesModel.beginTimeOffset).toBe(0);
            expect(seriesModel.endTimeOffset).toBeNull();
            expect(seriesModel.maxShots).toBe(10);
        });

        it('должен создавать серию без максимального количества выстрелов', () => {
            const series = new SeriesModel(null, 0);
            expect(series.maxShots).toBeUndefined();
        });
    });

    describe('временные метки', () => {
        it('должен корректно получать время начала', () => {
            expect(seriesModel.beginTimeOffset).toBe(0);
        });

        it('должен корректно устанавливать время окончания', () => {
            seriesModel.endTimeOffset = 100;
            expect(seriesModel.endTimeOffset).toBe(100);
        });

        it('должен выбрасывать ошибку при установке времени окончания раньше времени начала', () => {
            expect(() => {
                seriesModel.endTimeOffset = -1;
            }).toThrow('Время окончания не может быть раньше времени начала');
        });

        it('должен позволять установить время окончания как null', () => {
            seriesModel.endTimeOffset = 100;
            seriesModel.endTimeOffset = null;
            expect(seriesModel.endTimeOffset).toBeNull();
        });
    });

    describe('выстрелы', () => {
        it('должен корректно добавлять выстрел', () => {
            seriesModel.addShot(shotModel);
            expect(seriesModel.allShots).toContain(shotModel);
        });

        it('должен выбрасывать ошибку при добавлении выстрела в полную серию', () => {
            for (let i = 0; i < 10; i++) {
                seriesModel.addShot(new ShotModel(null, 0, 0, 10, i));
            }
            expect(() => {
                seriesModel.addShot(shotModel);
            }).toThrow('Достигнуто максимальное количество выстрелов в серии');
        });

        it('должен корректно удалять выстрел', () => {
            seriesModel.addShot(shotModel);
            if (shotModel.id !== null) {
                seriesModel.removeShot(shotModel.id);
                expect(seriesModel.allShots).not.toContain(shotModel);
            }
        });

        it('должен возвращать копию массива выстрелов', () => {
            seriesModel.addShot(shotModel);
            const shots1 = seriesModel.allShots;
            const shots2 = seriesModel.allShots;
            expect(shots1).not.toBe(shots2);
            expect(shots1).toEqual(shots2);
        });
    });

    describe('заметки', () => {
        it('должен корректно добавлять заметку', () => {
            seriesModel.addNote(noteModel);
            expect(seriesModel.allNotes).toContain(noteModel);
        });

        it('должен корректно удалять заметку', () => {
            seriesModel.addNote(noteModel);
            if (noteModel.id !== null) {
                seriesModel.removeNote(noteModel.id);
                expect(seriesModel.allNotes).not.toContain(noteModel);
            }
        });

        it('должен возвращать копию массива заметок', () => {
            seriesModel.addNote(noteModel);
            const notes1 = seriesModel.allNotes;
            const notes2 = seriesModel.allNotes;
            expect(notes1).not.toBe(notes2);
            expect(notes1).toEqual(notes2);
        });
    });

    describe('статистика', () => {
        it('должен корректно рассчитывать общий счет серии', () => {
            seriesModel.addShot(new ShotModel(null, 0, 0, 10, 0));
            seriesModel.addShot(new ShotModel(null, 0, 0, 8, 1));
            expect(seriesModel.seriesTotalScore).toBe(18);
        });

        it('должен корректно рассчитывать количество выстрелов', () => {
            seriesModel.addShot(new ShotModel(null, 0, 0, 10, 0));
            seriesModel.addShot(new ShotModel(null, 0, 0, 8, 1));
            expect(seriesModel.shotCount).toBe(2);
        });

        it('должен корректно рассчитывать средний счет', () => {
            seriesModel.addShot(new ShotModel(null, 0, 0, 10, 0));
            seriesModel.addShot(new ShotModel(null, 0, 0, 8, 1));
            expect(seriesModel.averageScore).toBe(9);
        });

        it('должен возвращать нулевой средний счет для пустой серии', () => {
            expect(seriesModel.averageScore).toBe(0);
        });

        it('должен корректно рассчитывать среднюю точку', () => {
            seriesModel.addShot(new ShotModel(null, 1, 1, 10, 0));
            seriesModel.addShot(new ShotModel(null, 3, 3, 8, 1));
            const avgPoint = seriesModel.averagePoint;
            expect(avgPoint.x).toBe(2);
            expect(avgPoint.y).toBe(2);
        });

        it('должен возвращать нулевую точку для пустой серии', () => {
            const avgPoint = seriesModel.averagePoint;
            expect(avgPoint.x).toBe(0);
            expect(avgPoint.y).toBe(0);
        });
    });
}); 