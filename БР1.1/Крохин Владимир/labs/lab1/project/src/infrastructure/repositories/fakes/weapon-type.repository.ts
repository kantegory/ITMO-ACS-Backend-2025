import { WeaponTypeModel } from '../../../application/domain/weapon-type.model';
import { WeaponTypeRepository } from '../interfaces/weapon-type.repository';
import { BaseFakeRepository } from './base.repository';

export class FakeWeaponTypeRepository extends BaseFakeRepository<WeaponTypeModel> implements WeaponTypeRepository {
    constructor() {
        super();
    }

    async findById(id: number): Promise<WeaponTypeModel | null> {
        return this.items.find(item => item.id === id) || null;
    }

    async findAll(): Promise<WeaponTypeModel[]> {
        return this.items;
    }

    async save(weaponType: WeaponTypeModel): Promise<WeaponTypeModel> {
        const existingIndex = this.items.findIndex(item => item.id === weaponType.id);
        if (existingIndex >= 0) {
            this.items[existingIndex] = weaponType;
        } else {
            this.items.push(weaponType);
        }
        return weaponType;
    }

    async delete(id: number): Promise<void> {
        const index = this.items.findIndex(item => item.id === id);
        if (index >= 0) {
            this.items.splice(index, 1);
        }
    }
} 