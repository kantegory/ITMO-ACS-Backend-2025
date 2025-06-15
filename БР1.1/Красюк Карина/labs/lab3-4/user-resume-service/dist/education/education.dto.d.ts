export declare class CreateEducationsDto {
    institution: string;
    degree: string;
    field_of_study?: string;
    start_date: string;
    end_date?: string;
    resume_id: number;
}
export type TUpdateEducationsDto = Partial<CreateEducationsDto>;
