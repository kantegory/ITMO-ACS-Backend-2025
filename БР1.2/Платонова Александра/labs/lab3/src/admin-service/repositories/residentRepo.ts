import { EntityRepository, Repository, Like, Between } from 'typeorm';
import { Resident } from '../models/resident';
import { validateResidentData } from '../validators/ResidentValidator';

@EntityRepository(Resident)
export class ResidentRepository extends Repository<Resident> {
    /**
     * Создать нового жильца
     * @param residentData Данные жильца (без id)
     */
    async createResident(residentData: Partial<Resident>): Promise<Resident> {
        const { error } = validateResidentData(residentData);
        if (error) throw new Error(error.details[0].message);

        const resident = this.create(residentData);
        return this.save(resident);
    }

    /**
     * Найти жильцов с фильтрами
     * @param filters Параметры фильтрации
     */
    async findWithFilters(filters: {
        full_name?: string;
        phone?: string;
        email?: string;
        date_from?: Date;
        date_to?: Date;
    }): Promise<Resident[]> {
        return this.find({
            where: {
                full_name: filters.full_name ? Like(`%${filters.full_name}%`) : undefined,
                phone: filters.phone ? Like(`%${filters.phone}%`) : undefined,
                email: filters.email ? Like(`%${filters.email}%`) : undefined,
                created_at: filters.date_from && filters.date_to
                    ? Between(filters.date_from, filters.date_to)
                    : undefined,
            },
            relations: ['checkIns'],
        });
    }

    /**
     * Найти жильца по ID
     * @param id ID жильца
     */
    async findById(id: number): Promise<Resident | undefined> {
        return this.findOne({
            where: { id },
            relations: ['checkIns'],
        });
    }

    /**
     * Обновить данные жильца
     * @param id ID жильца
     * @param updateData Новые данные
     */
    async updateResident(
        id: number,
        updateData: Partial<Resident>
    ): Promise<Resident | undefined> {
        const { error } = validateResidentData(updateData, true);
        if (error) throw new Error(error.details[0].message);

        await this.update(id, updateData);
        return this.findOne({ where: { id } });
    }

    /**
     * Удалить жильца
     * @param id ID жильца
     */
    async deleteResident(id: number): Promise<void> {
        await this.delete(id);
    }

    /**
     * Поиск по email (для проверки уникальности)
     * @param email Email жильца
     */
    async findByEmail(email: string): Promise<Resident | undefined> {
        return this.findOne({ where: { email } });
    }
}