import { WeaponTypeService } from '../../../application/services/WeaponTypeService';
import { FakeWeaponTypeRepository } from '../../../infrastructure/repositories/fakes/weapon-type.repository';
import { WeaponTypeModel } from '../../../application/domain/weapon-type.model';

describe('WeaponTypeService', () => {
    let weaponTypeService: WeaponTypeService;
    let fakeWeaponTypeRepository: FakeWeaponTypeRepository;

    beforeEach(() => {
        fakeWeaponTypeRepository = new FakeWeaponTypeRepository();
        weaponTypeService = new WeaponTypeService(fakeWeaponTypeRepository);
    });

    describe('getWeaponTypeById', () => {
        it('should return weapon type by id', async () => {
            const weaponType = new WeaponTypeModel(1, 'Пистолет', 'Пневматический пистолет');
            await fakeWeaponTypeRepository.save(weaponType);

            const foundWeaponType = await weaponTypeService.getWeaponTypeById(1);

            expect(foundWeaponType).toBeInstanceOf(WeaponTypeModel);
            expect(foundWeaponType.id).toBe(1);
            expect(foundWeaponType.name).toBe('Пистолет');
            expect(foundWeaponType.description).toBe('Пневматический пистолет');
        });

        it('should throw error if weapon type not found', async () => {
            await expect(weaponTypeService.getWeaponTypeById(999))
                .rejects.toThrow('Тип оружия не найден');
        });
    });

    describe('getAllWeaponTypes', () => {
        it('should return all weapon types', async () => {
            const weaponType1 = new WeaponTypeModel(1, 'Пистолет', 'Пневматический пистолет');
            const weaponType2 = new WeaponTypeModel(2, 'Винтовка', 'Пневматическая винтовка');
            await fakeWeaponTypeRepository.save(weaponType1);
            await fakeWeaponTypeRepository.save(weaponType2);

            const weaponTypes = await weaponTypeService.getAllWeaponTypes();

            expect(weaponTypes).toHaveLength(2);
            expect(weaponTypes[0]).toBeInstanceOf(WeaponTypeModel);
            expect(weaponTypes[1]).toBeInstanceOf(WeaponTypeModel);
            expect(weaponTypes[0].name).toBe('Пистолет');
            expect(weaponTypes[1].name).toBe('Винтовка');
        });
    });

    describe('createWeaponType', () => {
        it('should create new weapon type', async () => {
            const name = 'Пистолет';
            const description = 'Пневматический пистолет';

            const weaponType = await weaponTypeService.createWeaponType(name, description);

            expect(weaponType).toBeInstanceOf(WeaponTypeModel);
            expect(weaponType.name).toBe(name);
            expect(weaponType.description).toBe(description);
        });
    });

    describe('updateWeaponType', () => {
        it('should update existing weapon type', async () => {
            const weaponType = new WeaponTypeModel(1, 'Пистолет', 'Пневматический пистолет');
            await fakeWeaponTypeRepository.save(weaponType);

            const updatedName = 'Пистолет обновленный';
            const updatedDescription = 'Новое описание';

            const updatedWeaponType = await weaponTypeService.updateWeaponType(1, updatedName, updatedDescription);

            expect(updatedWeaponType).toBeInstanceOf(WeaponTypeModel);
            expect(updatedWeaponType.id).toBe(1);
            expect(updatedWeaponType.name).toBe(updatedName);
            expect(updatedWeaponType.description).toBe(updatedDescription);
        });

        it('should throw error if weapon type not found', async () => {
            await expect(weaponTypeService.updateWeaponType(999, 'Новое имя', 'Новое описание'))
                .rejects.toThrow('Тип оружия не найден');
        });
    });

    describe('deleteWeaponType', () => {
        it('should delete weapon type', async () => {
            const weaponType = new WeaponTypeModel(1, 'Пистолет', 'Пневматический пистолет');
            await fakeWeaponTypeRepository.save(weaponType);

            await weaponTypeService.deleteWeaponType(1);

            await expect(weaponTypeService.getWeaponTypeById(1))
                .rejects.toThrow('Тип оружия не найден');
        });

        it('should throw error if weapon type not found', async () => {
            await expect(weaponTypeService.deleteWeaponType(999))
                .rejects.toThrow('Тип оружия не найден');
        });
    });
}); 