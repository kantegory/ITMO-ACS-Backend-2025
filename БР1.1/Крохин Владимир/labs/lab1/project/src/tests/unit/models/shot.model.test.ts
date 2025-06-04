import { ShotModel } from '../../../application/domain/shot.model';

describe('ShotModel', () => {
    let shotModel: ShotModel;

    beforeEach(() => {
        shotModel = new ShotModel(null, 0, 0, 10, 0);
    });

    describe('конструктор', () => {
        it('должен создавать выстрел с корректными данными', () => {
            expect(shotModel.x).toBe(0);
            expect(shotModel.y).toBe(0);
            expect(shotModel.score).toBe(10);
            expect(shotModel.timeOffset).toBe(0);
            expect(shotModel.holeSize).toBeUndefined();
        });

        it('должен создавать выстрел с размером отверстия', () => {
            const shot = new ShotModel(null, 0, 0, 10, 0, 0.5);
            expect(shot.holeSize).toBe(0.5);
        });

        it('должен выбрасывать ошибку при некорректной координате x', () => {
            expect(() => {
                new ShotModel(null, 11, 0, 10, 0);
            }).toThrow('Координаты должны быть в диапазоне от -10 до 10');
        });

        it('должен выбрасывать ошибку при некорректной координате y', () => {
            expect(() => {
                new ShotModel(null, 0, -11, 10, 0);
            }).toThrow('Координаты должны быть в диапазоне от -10 до 10');
        });

        it('должен выбрасывать ошибку при некорректной оценке', () => {
            expect(() => {
                new ShotModel(null, 0, 0, 11, 0);
            }).toThrow('Оценка должна быть в диапазоне от 0 до 10');
        });

        it('должен выбрасывать ошибку при отрицательном временном смещении', () => {
            expect(() => {
                new ShotModel(null, 0, 0, 10, -1);
            }).toThrow('Временное смещение не может быть отрицательным');
        });

        it('должен выбрасывать ошибку при некорректном размере отверстия', () => {
            expect(() => {
                new ShotModel(null, 0, 0, 10, 0, 1.5);
            }).toThrow('Размер отверстия должен быть в диапазоне от 0 до 1');
        });
    });

    describe('координаты', () => {
        it('должен корректно устанавливать координату x', () => {
            shotModel.x = 5;
            expect(shotModel.x).toBe(5);
        });

        it('должен корректно устанавливать координату y', () => {
            shotModel.y = -5;
            expect(shotModel.y).toBe(-5);
        });

        it('должен выбрасывать ошибку при установке некорректной координаты x', () => {
            expect(() => {
                shotModel.x = 11;
            }).toThrow('Координаты должны быть в диапазоне от -10 до 10');
        });

        it('должен выбрасывать ошибку при установке некорректной координаты y', () => {
            expect(() => {
                shotModel.y = -11;
            }).toThrow('Координаты должны быть в диапазоне от -10 до 10');
        });
    });

    describe('оценка', () => {
        it('должен корректно устанавливать оценку', () => {
            shotModel.score = 8;
            expect(shotModel.score).toBe(8);
        });

        it('должен выбрасывать ошибку при установке некорректной оценки', () => {
            expect(() => {
                shotModel.score = 11;
            }).toThrow('Оценка должна быть в диапазоне от 0 до 10');
        });
    });

    describe('временное смещение', () => {
        it('должен корректно устанавливать временное смещение', () => {
            shotModel.timeOffset = 100;
            expect(shotModel.timeOffset).toBe(100);
        });

        it('должен выбрасывать ошибку при установке отрицательного временного смещения', () => {
            expect(() => {
                shotModel.timeOffset = -1;
            }).toThrow('Временное смещение не может быть отрицательным');
        });
    });

    describe('размер отверстия', () => {
        it('должен корректно устанавливать размер отверстия', () => {
            shotModel.holeSize = 0.5;
            expect(shotModel.holeSize).toBe(0.5);
        });

        it('должен позволять установить размер отверстия как undefined', () => {
            shotModel.holeSize = 0.5;
            shotModel.holeSize = undefined;
            expect(shotModel.holeSize).toBeUndefined();
        });

        it('должен выбрасывать ошибку при установке некорректного размера отверстия', () => {
            expect(() => {
                shotModel.holeSize = 1.5;
            }).toThrow('Размер отверстия должен быть в диапазоне от 0 до 1');
        });
    });
}); 