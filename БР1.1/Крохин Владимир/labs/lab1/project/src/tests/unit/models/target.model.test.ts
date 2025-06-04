import { TargetModel } from '../../../application/domain/target.model';

describe('TargetModel', () => {
    let targetModel: TargetModel;

    beforeEach(() => {
        targetModel = new TargetModel(null, 'Тестовая мишень', 'Тестовое описание');
    });

    describe('конструктор', () => {
        it('должен создавать мишень с корректными данными', () => {
            expect(targetModel.name).toBe('Тестовая мишень');
            expect(targetModel.description).toBe('Тестовое описание');
        });

        it('должен выбрасывать ошибку при пустом названии', () => {
            expect(() => {
                new TargetModel(null, '', 'Тестовое описание');
            }).toThrow('Название мишени не может быть пустым');
        });

        it('должен выбрасывать ошибку при названии из пробелов', () => {
            expect(() => {
                new TargetModel(null, '   ', 'Тестовое описание');
            }).toThrow('Название мишени не может быть пустым');
        });

        it('должен выбрасывать ошибку при пустом описании', () => {
            expect(() => {
                new TargetModel(null, 'Тестовая мишень', '');
            }).toThrow('Описание мишени не может быть пустым');
        });

        it('должен выбрасывать ошибку при описании из пробелов', () => {
            expect(() => {
                new TargetModel(null, 'Тестовая мишень', '   ');
            }).toThrow('Описание мишени не может быть пустым');
        });
    });

    describe('свойство name', () => {
        it('должен корректно получать название', () => {
            expect(targetModel.name).toBe('Тестовая мишень');
        });

        it('должен корректно устанавливать название', () => {
            targetModel.name = 'Новая мишень';
            expect(targetModel.name).toBe('Новая мишень');
        });

        it('должен выбрасывать ошибку при установке пустого названия', () => {
            expect(() => {
                targetModel.name = '';
            }).toThrow('Название мишени не может быть пустым');
        });

        it('должен выбрасывать ошибку при установке названия из пробелов', () => {
            expect(() => {
                targetModel.name = '   ';
            }).toThrow('Название мишени не может быть пустым');
        });
    });

    describe('свойство description', () => {
        it('должен корректно получать описание', () => {
            expect(targetModel.description).toBe('Тестовое описание');
        });

        it('должен корректно устанавливать описание', () => {
            targetModel.description = 'Новое описание';
            expect(targetModel.description).toBe('Новое описание');
        });

        it('должен выбрасывать ошибку при установке пустого описания', () => {
            expect(() => {
                targetModel.description = '';
            }).toThrow('Описание мишени не может быть пустым');
        });

        it('должен выбрасывать ошибку при установке описания из пробелов', () => {
            expect(() => {
                targetModel.description = '   ';
            }).toThrow('Описание мишени не может быть пустым');
        });
    });
}); 