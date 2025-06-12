import { getRepository } from 'typeorm';
import { Log } from '../models/Log';

export class LogService {
    private logRepo = getRepository(Log);

    /**
     * @param userId ID пользователя
     * @param action Тип действия (CREATE_HOSTEL, DELETE_RESIDENT)
     * @param details Детали
     */
    async log(userId: number, action: string, details?: string): Promise<void> {
        const logEntry = this.logRepo.create({
            user_id: userId,
            action,
            details,
            timestamp: new Date(),
        });

        await this.logRepo.save(logEntry);
    }

    /**
     * Получить логи по фильтрам
     * @param filters { userId?, action?, dateFrom?, dateTo? }
     */
    async getLogs(filters: {
        userId?: number;
        action?: string;
        dateFrom?: Date;
        dateTo?: Date;
    }): Promise<Log[]> {
        return this.logRepo.find({
            where: {
                user_id: filters.userId,
                action: filters.action,
                timestamp: filters.dateFrom && filters.dateTo
                    ? Between(filters.dateFrom, filters.dateTo)
                    : undefined,
            },
            order: { timestamp: 'DESC' },
        });
    }
}