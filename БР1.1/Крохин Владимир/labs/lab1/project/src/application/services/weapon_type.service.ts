import { WeaponTypeModel } from '../domain/weapon-type.model';

export class WeaponTypeService {
    updateWeaponType(
        weaponType: WeaponTypeModel,
        name: string,
        description: string
    ): void {
        weaponType.name = name;
        weaponType.description = description;
    }
} 