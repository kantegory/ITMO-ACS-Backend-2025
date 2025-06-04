import { WeaponTypeRepository } from '../repositories/interfaces/weapon-type.repository';
import { WeaponTypeService } from '../../application/services/weapon_type.service';
import { WeaponTypeModel } from '../../application/domain/weapon-type.model';

export class WeaponTypeInfrastructureService {
    constructor(
        private readonly weaponTypeRepository: WeaponTypeRepository,
        private readonly weaponTypeService: WeaponTypeService
    ) {}

    async getWeaponTypeById(id: number): Promise<WeaponTypeModel> {
        const weaponType = await this.weaponTypeRepository.findById(id);
        if (!weaponType) throw new Error('Weapon type not found');
        return weaponType;
    }

    async getAllWeaponTypes(): Promise<WeaponTypeModel[]> {
        return this.weaponTypeRepository.findAll();
    }

    async createWeaponType(name: string, description: string): Promise<WeaponTypeModel> {
        const weaponType = new WeaponTypeModel(name, description);
        return this.weaponTypeRepository.save(weaponType);
    }

    async updateWeaponType(id: number, name: string, description: string): Promise<WeaponTypeModel> {
        const weaponType = await this.getWeaponTypeById(id);
        this.weaponTypeService.updateWeaponType(weaponType, name, description);
        return this.weaponTypeRepository.save(weaponType);
    }

    async deleteWeaponType(id: number): Promise<void> {
        await this.getWeaponTypeById(id);
        await this.weaponTypeRepository.delete(id);
    }
} 