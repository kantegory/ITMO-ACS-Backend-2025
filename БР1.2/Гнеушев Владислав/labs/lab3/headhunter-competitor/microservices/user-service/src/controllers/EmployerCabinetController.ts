import { EmployerCabinetService } from '../services/EmployerCabinetService';
import { HttpError, BadRequestError, NotFoundError, ConflictError, InternalServerError } from '../errors/HttpErrors';

export type EmployerCabinetOutput = {
    id: number;
    user: {
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    };
    created_at: Date;
};

export type EmployerCabinetResponse = {
    success: boolean;
    data: EmployerCabinetOutput;
};

export type EmployerCabinetListResponse = {
    success: boolean;
    data: EmployerCabinetOutput[];
};

export class EmployerCabinetController {
    private employerCabinetService: EmployerCabinetService;

    constructor() {
        this.employerCabinetService = new EmployerCabinetService();
    }

    public async create(userId: number): Promise<EmployerCabinetResponse> {
        try {
            const cabinet = await this.employerCabinetService.create(userId);
            
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
                    created_at: cabinet.created_at
                }
            };
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('already exists')) {
                    throw new ConflictError('Employer cabinet already exists for this user');
                }
                if (error.message.includes('not found')) {
                    throw new NotFoundError('User not found');
                }
                throw new BadRequestError(error.message);
            }
            throw new InternalServerError('Failed to create employer cabinet');
        }
    }

    public async getByUserId(userId: number): Promise<EmployerCabinetResponse> {
        try {
            const cabinet = await this.employerCabinetService.getByUserId(userId);
            
            if (!cabinet) {
                throw new NotFoundError('Employer cabinet not found');
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
                    created_at: cabinet.created_at
                }
            };
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new InternalServerError('Failed to get employer cabinet');
        }
    }

    public async getById(id: number): Promise<EmployerCabinetResponse> {
        try {
            const cabinet = await this.employerCabinetService.getById(id);
            
            if (!cabinet) {
                throw new NotFoundError('Employer cabinet not found');
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
                    created_at: cabinet.created_at
                }
            };
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new InternalServerError('Failed to get employer cabinet');
        }
    }

    public async deleteByUserId(userId: number): Promise<void> {
        try {
            await this.employerCabinetService.deleteByUserId(userId);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('not found')) {
                    throw new NotFoundError('Employer cabinet not found');
                }
                throw new BadRequestError(error.message);
            }
            throw new InternalServerError('Failed to delete employer cabinet');
        }
    }

    public async getAll(): Promise<EmployerCabinetListResponse> {
        try {
            const cabinets = await this.employerCabinetService.getAll();
            
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
                    created_at: cabinet.created_at
                }))
            };
        } catch (error) {
            throw new InternalServerError('Failed to get employer cabinets');
        }
    }
} 