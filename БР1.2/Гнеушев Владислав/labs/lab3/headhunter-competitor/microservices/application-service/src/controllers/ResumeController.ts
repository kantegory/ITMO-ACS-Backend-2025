import { ResumeService } from '../services/ResumeService';
import { CreateResumeDto, UpdateResumeDto, GetResumesQueryDto } from '../routes/ResumeDtos';
import { HttpError, BadRequestError, NotFoundError, ConflictError, InternalServerError } from '../errors/HttpErrors';
import { UserService } from '../services/UserService';

export type ResumeResponse = {
    success: boolean;
    data?: any;
    message?: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
};

export class ResumeController {
    private resumeService: ResumeService;
    private userService: UserService;

    constructor() {
        this.resumeService = new ResumeService();
        this.userService = new UserService();
    }

    public async createResume(createResumeDto: CreateResumeDto, userId: number): Promise<ResumeResponse> {
        try {
            const employee = await this.userService.getEmployeeByUserId(userId);
            
            const resumeData = {
                employeeId: employee.id,
                text: createResumeDto.text,
                title: createResumeDto.title,
                experienceYears: createResumeDto.experienceYears,
                expectedSalary: createResumeDto.expectedSalary,
                skillIds: createResumeDto.skillIds
            };
            
            const resume = await this.resumeService.createResume(resumeData);
            
            return {
                success: true,
                data: resume
            };
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            if (error instanceof Error) {
                if (error.message.includes('not found')) {
                    throw new BadRequestError(error.message);
                }
                throw new BadRequestError(error.message);
            }
            throw new InternalServerError('Failed to create resume');
        }
    }

    public async getResumes(queryParams: GetResumesQueryDto): Promise<ResumeResponse> {
        try {
            const page = queryParams.page || 1;
            const limit = queryParams.limit || 10;
            const employeeId = queryParams.employeeId;

            let result;
            if (employeeId) {
                const resumes = await this.resumeService.getResumesByEmployeeId(employeeId);
                result = { resumes, total: resumes.length };
            } else {
                result = await this.resumeService.getAllResumes(page, limit);
            }
            
            return {
                success: true,
                data: result.resumes,
                pagination: {
                    page,
                    limit,
                    total: result.total,
                    pages: Math.ceil(result.total / limit)
                }
            };
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new InternalServerError('Failed to get resumes');
        }
    }

    public async getResumeById(id: number): Promise<ResumeResponse> {
        try {
            const resume = await this.resumeService.getResumeById(id);
            
            if (!resume) {
                throw new NotFoundError('Resume not found');
            }

            return {
                success: true,
                data: resume
            };
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new InternalServerError('Failed to get resume');
        }
    }

    public async updateResume(id: number, updateResumeDto: UpdateResumeDto): Promise<ResumeResponse> {
        try {
            const resume = await this.resumeService.updateResume(id, updateResumeDto);
            
            return {
                success: true,
                data: resume
            };
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('not found')) {
                    throw new NotFoundError(error.message);
                }
                throw new BadRequestError(error.message);
            }
            throw new InternalServerError('Failed to update resume');
        }
    }

    public async deleteResume(id: number): Promise<ResumeResponse> {
        try {
            await this.resumeService.deleteResume(id);
            
            return {
                success: true,
                message: 'Resume deleted successfully'
            };
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('not found')) {
                    throw new NotFoundError(error.message);
                }
                throw new BadRequestError(error.message);
            }
            throw new InternalServerError('Failed to delete resume');
        }
    }

    public async getResumesByUserId(userId: number): Promise<ResumeResponse> {
        try {
            const employee = await this.userService.getEmployeeByUserId(userId);
            
            const resumes = await this.resumeService.getResumesByEmployeeId(employee.id);
            
            return {
                success: true,
                data: resumes
            };
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            if (error instanceof Error) {
                if (error.message.includes('not found')) {
                    throw new NotFoundError('No resumes found for this user');
                }
                throw new BadRequestError(error.message);
            }
            throw new InternalServerError('Failed to get user resumes');
        }
    }
} 