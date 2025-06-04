import { TargetService } from '../../../application/services/target.service';
import { FakeTargetRepository } from '../../../infrastructure/repositories/fakes/target.repository';
import { TargetModel } from '../../../application/domain/target.model';

describe('TargetService', () => {
    let targetService: TargetService;
    let fakeTargetRepository: FakeTargetRepository;
    let target: TargetModel;

    beforeEach(() => {
        fakeTargetRepository = new FakeTargetRepository();
        targetService = new TargetService(fakeTargetRepository);
        target = new TargetModel(1, 'Test Target', 'Test Description');
    });

    describe('getTargetById', () => {
        it('should return target by id', async () => {
            const target = new TargetModel(1, 'Мишень 1', 'Описание мишени 1');
            await fakeTargetRepository.save(target);

            const foundTarget = await targetService.getTargetById(1);

            expect(foundTarget).toBeDefined();
            expect(foundTarget.id).toBe(1);
            expect(foundTarget.name).toBe('Мишень 1');
            expect(foundTarget.description).toBe('Описание мишени 1');
        });

        it('should throw error if target not found', async () => {
            await expect(targetService.getTargetById(999))
                .rejects.toThrow('Мишень не найдена');
        });
    });

    describe('getTargetByName', () => {
        it('should return target by name', async () => {
            const target = new TargetModel(1, 'Мишень 1', 'Описание мишени 1');
            await fakeTargetRepository.save(target);

            const foundTarget = await targetService.getTargetByName('Мишень 1');

            expect(foundTarget).toBeDefined();
            expect(foundTarget.id).toBe(1);
            expect(foundTarget.name).toBe('Мишень 1');
            expect(foundTarget.description).toBe('Описание мишени 1');
        });

        it('should throw error if target not found', async () => {
            await expect(targetService.getTargetByName('Несуществующая мишень'))
                .rejects.toThrow('Мишень не найдена');
        });
    });

    describe('getAllTargets', () => {
        it('should return all targets', async () => {
            const target1 = new TargetModel(1, 'Мишень 1', 'Описание мишени 1');
            const target2 = new TargetModel(2, 'Мишень 2', 'Описание мишени 2');
            await fakeTargetRepository.save(target1);
            await fakeTargetRepository.save(target2);

            const targets = await targetService.getAllTargets();

            expect(targets).toHaveLength(2);
            expect(targets[0]).toBeInstanceOf(TargetModel);
            expect(targets[1]).toBeInstanceOf(TargetModel);
            expect(targets[0].name).toBe('Мишень 1');
            expect(targets[1].name).toBe('Мишень 2');
        });
    });

    describe('createTarget', () => {
        it('should create a new target with provided name and description', () => {
            const name = 'Test Target';
            const description = 'Test Description';

            const target = targetService.createTarget(name, description);

            expect(target).toBeInstanceOf(TargetModel);
            expect(target.name).toBe(name);
            expect(target.description).toBe(description);
        });

        it('should throw error if target with same name exists', async () => {
            const target = new TargetModel(1, 'Мишень 1', 'Описание мишени 1');
            await fakeTargetRepository.save(target);

            await expect(targetService.createTarget('Мишень 1', 'Описание'))
                .rejects.toThrow('Мишень с таким названием уже существует');
        });

        it('should throw error if name is empty', async () => {
            await expect(targetService.createTarget('', 'Описание'))
                .rejects.toThrow('Название мишени не может быть пустым');
        });

        it('should throw error if description is empty', async () => {
            await expect(targetService.createTarget('Мишень', ''))
                .rejects.toThrow('Описание мишени не может быть пустым');
        });

        it('should throw error if size is not positive', async () => {
            await expect(targetService.createTarget('Мишень', 'Описание'))
                .rejects.toThrow('Размер мишени должен быть положительным числом');
        });

        it('should throw error if image is empty', async () => {
            await expect(targetService.createTarget('Мишень', 'Описание'))
                .rejects.toThrow('Изображение мишени не может быть пустым');
        });
    });

    describe('updateTarget', () => {
        it('should update target name', () => {
            const target = new TargetModel(1, 'Old Name', 'Description');
            const newName = 'New Name';

            targetService.updateTarget(target, newName);

            expect(target.name).toBe(newName);
        });

        it('should update target description', () => {
            const target = new TargetModel(1, 'Name', 'Old Description');
            const newDescription = 'New Description';

            targetService.updateTarget(target, undefined, newDescription);

            expect(target.description).toBe(newDescription);
        });

        it('should update both name and description when both are provided', () => {
            const target = new TargetModel(1, 'Old Name', 'Old Description');
            const newName = 'New Name';
            const newDescription = 'New Description';

            targetService.updateTarget(target, newName, newDescription);

            expect(target.name).toBe(newName);
            expect(target.description).toBe(newDescription);
        });

        it('should not update anything when no parameters are provided', () => {
            const target = new TargetModel(1, 'Name', 'Description');
            const initialName = target.name;
            const initialDescription = target.description;

            targetService.updateTarget(target);

            expect(target.name).toBe(initialName);
            expect(target.description).toBe(initialDescription);
        });

        it('should throw error if target not found', async () => {
            await expect(targetService.updateTarget(999, 'Новое имя', 'Новое описание'))
                .rejects.toThrow('Мишень не найдена');
        });

        it('should throw error if target with same name exists', async () => {
            const target1 = new TargetModel(1, 'Мишень 1', 'Описание мишени 1');
            const target2 = new TargetModel(2, 'Мишень 2', 'Описание мишени 2');
            await fakeTargetRepository.save(target1);
            await fakeTargetRepository.save(target2);

            await expect(targetService.updateTarget(1, 'Мишень 2', 'Описание'))
                .rejects.toThrow('Мишень с таким названием уже существует');
        });

        it('should throw error if name is empty', async () => {
            await expect(targetService.updateTarget(1, '', 'Описание'))
                .rejects.toThrow('Название мишени не может быть пустым');
        });

        it('should throw error if description is empty', async () => {
            await expect(targetService.updateTarget(1, 'Мишень', ''))
                .rejects.toThrow('Описание мишени не может быть пустым');
        });

        it('should throw error if size is not positive', async () => {
            await expect(targetService.updateTarget(1, 'Мишень', 'Описание'))
                .rejects.toThrow('Размер мишени должен быть положительным числом');
        });

        it('should throw error if image is empty', async () => {
            await expect(targetService.updateTarget(1, 'Мишень', 'Описание'))
                .rejects.toThrow('Изображение мишени не может быть пустым');
        });
    });

    describe('deleteTarget', () => {
        it('should delete target', async () => {
            const target = new TargetModel(1, 'Мишень 1', 'Описание мишени 1');
            await fakeTargetRepository.save(target);

            await targetService.deleteTarget(1);

            await expect(targetService.getTargetById(1))
                .rejects.toThrow('Мишень не найдена');
        });

        it('should throw error if target not found', async () => {
            await expect(targetService.deleteTarget(999))
                .rejects.toThrow('Мишень не найдена');
        });
    });
}); 