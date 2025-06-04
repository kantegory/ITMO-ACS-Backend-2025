import { TargetRepository } from '../repositories/interfaces/target.repository';
import { TargetModel } from '../domain/target.model';
import { TargetDto } from '../../dtos/target/TargetDto';

export class TargetService {
    constructor(private readonly targetRepository: TargetRepository) {}

    async createTarget(name: string, description: string, size: number): Promise<TargetDto> {
        const existingTarget = await this.targetRepository.findByName(name);
        if (existingTarget) {
            throw new Error('Мишень с таким названием уже существует');
        }

        const target = new TargetModel(null, name, description, size);
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

    async updateTarget(id: number, name: string, description: string, size: number): Promise<TargetDto> {
        const target = await this.targetRepository.findById(id);
        if (!target) {
            throw new Error('Мишень не найдена');
        }

        const existingTarget = await this.targetRepository.findByName(name);
        if (existingTarget && existingTarget.id !== id) {
            throw new Error('Мишень с таким названием уже существует');
        }

        target.name = name;
        target.description = description;
        target.size = size;

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
            description: model.description,
            size: model.size
        };
    }
} 