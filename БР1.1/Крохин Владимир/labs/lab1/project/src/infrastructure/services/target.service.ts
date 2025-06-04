import { TargetService } from '../../application/services/target.service';
import { TargetRepository } from '../repositories/interfaces/target.repository';
import { TargetModel } from '../../application/domain/target.model';
import { TargetDto } from '../../dtos/target/TargetDto';

export class TargetInfrastructureService {
    constructor(
        private readonly targetService: TargetService,
        private readonly targetRepository: TargetRepository
    ) {}

    async createTarget(name: string, description: string): Promise<TargetDto> {
        const existingTarget = await this.targetRepository.findByName(name);
        if (existingTarget) {
            throw new Error('Мишень с таким названием уже существует');
        }

        const target = this.targetService.createTarget(name, description);
        const savedTarget = await this.targetRepository.save(target);
        return this.mapToDto(savedTarget);
    }

    async getTargetById(id: number): Promise<TargetDto> {
        const target = await this.targetRepository.findById(id);
        if (!target) {
            throw new Error('Мишень не найдена');
        }
        return this.mapToDto(target);
    }

    async getTargetByName(name: string): Promise<TargetDto> {
        const target = await this.targetRepository.findByName(name);
        if (!target) {
            throw new Error('Мишень не найдена');
        }
        return this.mapToDto(target);
    }

    async updateTarget(id: number, name: string, description: string): Promise<TargetDto> {
        const target = await this.targetRepository.findById(id);
        if (!target) {
            throw new Error('Мишень не найдена');
        }

        const existingTarget = await this.targetRepository.findByName(name);
        if (existingTarget && existingTarget.id !== id) {
            throw new Error('Мишень с таким названием уже существует');
        }

        this.targetService.updateTarget(target, name, description);
        const updatedTarget = await this.targetRepository.save(target);
        return this.mapToDto(updatedTarget);
    }

    async deleteTarget(id: number): Promise<void> {
        const target = await this.targetRepository.findById(id);
        if (!target) {
            throw new Error('Мишень не найдена');
        }
        await this.targetRepository.delete(id);
    }

    private mapToDto(model: TargetModel): TargetDto {
        return {
            id: model.id,
            name: model.name,
            description: model.description
        };
    }
} 