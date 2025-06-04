import { ExerciseModel } from '../../../application/domain/exercise.model';

describe('ExerciseModel', () => {
    let exerciseModel: ExerciseModel;

    beforeEach(() => {
        exerciseModel = new ExerciseModel(null, 'Тестовое упражнение', 'Тестовое описание', 10);
    });

    describe('конструктор', () => {
        it('должен создавать упражнение с корректными данными', () => {
            expect(exerciseModel.name).toBe('Тестовое упражнение');
            expect(exerciseModel.description).toBe('Тестовое описание');
            expect(exerciseModel.shotsInSeries).toBe(10);
        });

        it('должен выбрасывать ошибку при пустом названии', () => {
            expect(() => {
                new ExerciseModel(null, '', 'Тестовое описание', 10);
            }).toThrow('Название упражнения не может быть пустым');
        });

        it('должен выбрасывать ошибку при названии из пробелов', () => {
            expect(() => {
                new ExerciseModel(null, '   ', 'Тестовое описание', 10);
            }).toThrow('Название упражнения не может быть пустым');
        });

        it('должен выбрасывать ошибку при пустом описании', () => {
            expect(() => {
                new ExerciseModel(null, 'Тестовое упражнение', '', 10);
            }).toThrow('Описание упражнения не может быть пустым');
        });

        it('должен выбрасывать ошибку при описании из пробелов', () => {
            expect(() => {
                new ExerciseModel(null, 'Тестовое упражнение', '   ', 10);
            }).toThrow('Описание упражнения не может быть пустым');
        });

        it('должен выбрасывать ошибку при неположительном количестве выстрелов', () => {
            expect(() => {
                new ExerciseModel(null, 'Тестовое упражнение', 'Тестовое описание', 0);
            }).toThrow('Количество выстрелов в серии должно быть положительным числом');
        });
    });

    describe('свойство name', () => {
        it('должен корректно получать название', () => {
            expect(exerciseModel.name).toBe('Тестовое упражнение');
        });

        it('должен корректно устанавливать название', () => {
            exerciseModel.name = 'Новое упражнение';
            expect(exerciseModel.name).toBe('Новое упражнение');
        });

        it('должен выбрасывать ошибку при установке пустого названия', () => {
            expect(() => {
                exerciseModel.name = '';
            }).toThrow('Название упражнения не может быть пустым');
        });

        it('должен выбрасывать ошибку при установке названия из пробелов', () => {
            expect(() => {
                exerciseModel.name = '   ';
            }).toThrow('Название упражнения не может быть пустым');
        });
    });

    describe('свойство description', () => {
        it('должен корректно получать описание', () => {
            expect(exerciseModel.description).toBe('Тестовое описание');
        });

        it('должен корректно устанавливать описание', () => {
            exerciseModel.description = 'Новое описание';
            expect(exerciseModel.description).toBe('Новое описание');
        });

        it('должен выбрасывать ошибку при установке пустого описания', () => {
            expect(() => {
                exerciseModel.description = '';
            }).toThrow('Описание упражнения не может быть пустым');
        });

        it('должен выбрасывать ошибку при установке описания из пробелов', () => {
            expect(() => {
                exerciseModel.description = '   ';
            }).toThrow('Описание упражнения не может быть пустым');
        });
    });

    describe('свойство shotsInSeries', () => {
        it('должен корректно получать количество выстрелов', () => {
            expect(exerciseModel.shotsInSeries).toBe(10);
        });

        it('должен корректно устанавливать количество выстрелов', () => {
            exerciseModel.shotsInSeries = 20;
            expect(exerciseModel.shotsInSeries).toBe(20);
        });

        it('должен выбрасывать ошибку при установке нулевого количества выстрелов', () => {
            expect(() => {
                exerciseModel.shotsInSeries = 0;
            }).toThrow('Количество выстрелов в серии должно быть положительным числом');
        });

        it('должен выбрасывать ошибку при установке отрицательного количества выстрелов', () => {
            expect(() => {
                exerciseModel.shotsInSeries = -1;
            }).toThrow('Количество выстрелов в серии должно быть положительным числом');
        });
    });
}); 