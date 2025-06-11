import { Repository } from "typeorm";
import { EmployeeCabinet } from "../models/EmployeeCabinet";
import { User } from "../models/User";
import { userDataSource } from "../config/data-source";

export interface CreateEmployeeCabinetDto {
    first_name: string;
    last_name: string;
    resume_text?: string;
}

export interface UpdateEmployeeCabinetDto {
    first_name?: string;
    last_name?: string;
    resume_text?: string;
}

export class EmployeeCabinetService {
    private employeeCabinetRepository: Repository<EmployeeCabinet>;
    private userRepository: Repository<User>;

    constructor() {
        this.employeeCabinetRepository = userDataSource.getRepository(EmployeeCabinet);
        this.userRepository = userDataSource.getRepository(User);
    }

    async create(createDto: CreateEmployeeCabinetDto, userId: number): Promise<EmployeeCabinet> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['employeeCabinet']
        });

        if (!user) {
            throw new Error('User not found');
        }

        if (user.employeeCabinet) {
            throw new Error('Employee cabinet already exists for this user');
        }

        const employeeCabinet = new EmployeeCabinet();
        employeeCabinet.user = user;
        employeeCabinet.first_name = createDto.first_name;
        employeeCabinet.last_name = createDto.last_name;
        employeeCabinet.resume_text = createDto.resume_text;
        employeeCabinet.updated_resume_at = new Date();

        return await this.employeeCabinetRepository.save(employeeCabinet);
    }

    async getByUserId(userId: number): Promise<EmployeeCabinet | null> {
        return await this.employeeCabinetRepository.findOne({
            where: { user: { id: userId } },
            relations: ['user']
        });
    }

    async getById(id: number): Promise<EmployeeCabinet | null> {
        return await this.employeeCabinetRepository.findOne({
            where: { id },
            relations: ['user']
        });
    }

    async updateByUserId(userId: number, updateDto: UpdateEmployeeCabinetDto): Promise<EmployeeCabinet> {
        const cabinet = await this.getByUserId(userId);
        
        if (!cabinet) {
            throw new Error('Employee cabinet not found');
        }

        if (updateDto.first_name) cabinet.first_name = updateDto.first_name;
        if (updateDto.last_name) cabinet.last_name = updateDto.last_name;
        if (updateDto.resume_text !== undefined) cabinet.resume_text = updateDto.resume_text;
        cabinet.updated_resume_at = new Date();

        return await this.employeeCabinetRepository.save(cabinet);
    }

    async deleteByUserId(userId: number): Promise<void> {
        const cabinet = await this.getByUserId(userId);
        
        if (!cabinet) {
            throw new Error('Employee cabinet not found');
        }

        await this.employeeCabinetRepository.remove(cabinet);
    }

    async getAll(): Promise<EmployeeCabinet[]> {
        return await this.employeeCabinetRepository.find({
            relations: ['user']
        });
    }
} 