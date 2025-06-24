import {IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import {Type} from "class-transformer";

export class CreateWorkoutPlanUserLinkDto {
    @IsDate()
    @Type(() => Date)
    planedAt: Date;

    @IsInt()
    workoutPlanId: number;
}