import { TargetDto } from '../target/TargetDto';

export interface ExerciseDto {
    id: number | null;
    name: string;
    description: string;
    shotsInSeries: number;
    target: TargetDto;
} 