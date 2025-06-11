import { EmployeeCabinetService, CreateEmployeeCabinetDto, UpdateEmployeeCabinetDto } from '../services/EmployeeCabinetService';
import { HttpError, BadRequestError, NotFoundError, ConflictError, InternalServerError } from '../errors/HttpErrors';

export type EmployeeCabinetOutput = {
    id: number;
    user: {
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    };
    first_name: string;
    last_name: string;
    resume_text?: string;
    updated_resume_at: Date;
    created_at: Date;
};

export type EmployeeCabinetResponse = {
    success: boolean;
    data: EmployeeCabinetOutput;
};

export type EmployeeCabinetListResponse = {
    success: boolean;
    data: EmployeeCabinetOutput[];
};

export class EmployeeCabinetController {
    private employeeCabinetService: EmployeeCabinetService;

    constructor() {
        this.employeeCabinetService = new EmployeeCabinetService();
    }

    public async create(createDto: CreateEmployeeCabinetDto, userId: number): Promise<EmployeeCabinetResponse> {
        try {
            const cabinet = await this.employeeCabinetService.create(createDto, userId);
            
            return {
                success: true,
                data: {
                    id: cabinet.id,
                    user: {
                        id: cabinet.user.id,
                        email: cabinet.user.email,
                        createdAt: cabinet.user.createdAt,
                        updatedAt: cabinet.user.updatedAt
                    },
                    first_name: cabinet.first_name,
                    last_name: cabinet.last_name,
                    resume_text: cabinet.resume_text,
                    updated_resume_at: cabinet.updated_resume_at,
                    created_at: cabinet.created_at
                }
            };
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('already exists')) {
                    throw new ConflictError('Employee cabinet already exists for this user');
                }
                if (error.message.includes('not found')) {
                    throw new NotFoundError('User not found');
                }
                throw new BadRequestError(error.message);
            }
            throw new InternalServerError('Failed to create employee cabinet');
        }
    }

    public async getByUserId(userId: number): Promise<EmployeeCabinetResponse> {
        try {
            const cabinet = await this.employeeCabinetService.getByUserId(userId);
            
            if (!cabinet) {
                throw new NotFoundError('Employee cabinet not found');
            }

            return {
                success: true,
                data: {
                    id: cabinet.id,
                    user: {
                        id: cabinet.user.id,
                        email: cabinet.user.email,
                        createdAt: cabinet.user.createdAt,
                        updatedAt: cabinet.user.updatedAt
                    },
                    first_name: cabinet.first_name,
                    last_name: cabinet.last_name,
                    resume_text: cabinet.resume_text,
                    updated_resume_at: cabinet.updated_resume_at,
                    created_at: cabinet.created_at
                }
            };
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new InternalServerError('Failed to get employee cabinet');
        }
    }

    public async getById(id: number): Promise<EmployeeCabinetResponse> {
        try {
            const cabinet = await this.employeeCabinetService.getById(id);
            
            if (!cabinet) {
                throw new NotFoundError('Employee cabinet not found');
            }

            return {
                success: true,
                data: {
                    id: cabinet.id,
                    user: {
                        id: cabinet.user.id,
                        email: cabinet.user.email,
                        createdAt: cabinet.user.createdAt,
                        updatedAt: cabinet.user.updatedAt
                    },
                    first_name: cabinet.first_name,
                    last_name: cabinet.last_name,
                    resume_text: cabinet.resume_text,
                    updated_resume_at: cabinet.updated_resume_at,
                    created_at: cabinet.created_at
                }
            };
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new InternalServerError('Failed to get employee cabinet');
        }
    }

    public async updateByUserId(userId: number, updateDto: UpdateEmployeeCabinetDto): Promise<EmployeeCabinetResponse> {
        try {
            const cabinet = await this.employeeCabinetService.updateByUserId(userId, updateDto);
            
            return {
                success: true,
                data: {
                    id: cabinet.id,
                    user: {
                        id: cabinet.user.id,
                        email: cabinet.user.email,
                        createdAt: cabinet.user.createdAt,
                        updatedAt: cabinet.user.updatedAt
                    },
                    first_name: cabinet.first_name,
                    last_name: cabinet.last_name,
                    resume_text: cabinet.resume_text,
                    updated_resume_at: cabinet.updated_resume_at,
                    created_at: cabinet.created_at
                }
            };
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('not found')) {
                    throw new NotFoundError('Employee cabinet not found');
                }
                throw new BadRequestError(error.message);
            }
            throw new InternalServerError('Failed to update employee cabinet');
        }
    }

    public async deleteByUserId(userId: number): Promise<void> {
        try {
            await this.employeeCabinetService.deleteByUserId(userId);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('not found')) {
                    throw new NotFoundError('Employee cabinet not found');
                }
                throw new BadRequestError(error.message);
            }
            throw new InternalServerError('Failed to delete employee cabinet');
        }
    }

    public async getAll(): Promise<EmployeeCabinetListResponse> {
        try {
            const cabinets = await this.employeeCabinetService.getAll();
            
            return {
                success: true,
                data: cabinets.map(cabinet => ({
                    id: cabinet.id,
                    user: {
                        id: cabinet.user.id,
                        email: cabinet.user.email,
                        createdAt: cabinet.user.createdAt,
                        updatedAt: cabinet.user.updatedAt
                    },
                    first_name: cabinet.first_name,
                    last_name: cabinet.last_name,
                    resume_text: cabinet.resume_text,
                    updated_resume_at: cabinet.updated_resume_at,
                    created_at: cabinet.created_at
                }))
            };
        } catch (error) {
            throw new InternalServerError('Failed to get employee cabinets');
        }
    }
} 