import { ApplicationStatus } from "@prisma/client";
export declare class CreateVacancysDto {
    title: string;
    description?: string;
    requirements?: string;
    salary_from?: number;
    salary_to?: number;
    experience?: string;
    company_id: number;
    industry_id?: number;
    status?: ApplicationStatus;
}
export type TUpdateVacancysDto = Partial<CreateVacancysDto>;
