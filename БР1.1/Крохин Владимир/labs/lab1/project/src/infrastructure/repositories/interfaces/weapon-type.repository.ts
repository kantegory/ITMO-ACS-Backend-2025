import { WeaponTypeModel } from '../../../application/domain/weapon-type.model';

export interface WeaponTypeRepository {
    findById(id: number): Promise<WeaponTypeModel | null>;
    findAll(): Promise<WeaponTypeModel[]>;
    save(weaponType: WeaponTypeModel): Promise<WeaponTypeModel>;
    delete(id: number): Promise<void>;
} 