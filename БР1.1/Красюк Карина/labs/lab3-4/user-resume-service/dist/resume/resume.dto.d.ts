export declare class CreateResumesDto {
    title: string;
    experience_summary?: string;
    salary_expectations?: number;
    skills?: string;
    user_id: number;
}
export type TUpdateResumesDto = Partial<CreateResumesDto>;
