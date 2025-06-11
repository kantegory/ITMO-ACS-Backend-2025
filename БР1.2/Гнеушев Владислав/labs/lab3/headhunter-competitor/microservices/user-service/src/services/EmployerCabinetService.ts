import { Repository } from "typeorm";
import { EmployerCabinet } from "../models/EmployerCabinet";
import { User } from "../models/User";
import { userDataSource } from "../config/data-source";

export class EmployerCabinetService {
    private employerCabinetRepository: Repository<EmployerCabinet>;
    private userRepository: Repository<User>;

    constructor() {
        this.employerCabinetRepository = userDataSource.getRepository(EmployerCabinet);
        this.userRepository = userDataSource.getRepository(User);
    }

    async create(userId: number): Promise<EmployerCabinet> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['employerCabinet']
        });

        if (!user) {
            throw new Error('User not found');
        }

        if (user.employerCabinet) {
            throw new Error('Employer cabinet already exists for this user');
        }

        const employerCabinet = new EmployerCabinet();
        employerCabinet.user = user;

        return await this.employerCabinetRepository.save(employerCabinet);
    }

    async getByUserId(userId: number): Promise<EmployerCabinet | null> {
        return await this.employerCabinetRepository.findOne({
            where: { user: { id: userId } },
            relations: ['user']
        });
    }

    async getById(id: number): Promise<EmployerCabinet | null> {
        return await this.employerCabinetRepository.findOne({
            where: { id },
            relations: ['user']
        });
    }

    async deleteByUserId(userId: number): Promise<void> {
        const cabinet = await this.getByUserId(userId);
        
        if (!cabinet) {
            throw new Error('Employer cabinet not found');
        }

        await this.employerCabinetRepository.remove(cabinet);
    }

    async getAll(): Promise<EmployerCabinet[]> {
        return await this.employerCabinetRepository.find({
            relations: ['user']
        });
    }
} 