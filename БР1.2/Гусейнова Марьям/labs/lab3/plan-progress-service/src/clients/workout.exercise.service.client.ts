import axios from 'axios';
import appConfig from '../config';
import { CustomError } from '../utils/custom-error.util';

export class WorkoutExerciseServiceClient {
    private workoutExerciseServiceUrl: string;

    constructor() {
        this.workoutExerciseServiceUrl = appConfig.workoutExerciseServiceUrl;
    }

    async doesExerciseExist(exerciseId: number): Promise<boolean> {
        try {
            const response = await axios.get<{ exists: boolean }>(
                `${this.workoutExerciseServiceUrl}/exercises/internal/exists/${exerciseId}`
            );
            return response.status === 200 && response.data.exists === true;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                return false;
            }
            console.error(`Error checking exercise existence for ID ${exerciseId}:`, error.message);
            throw new CustomError(`Failed to communicate with Workout-Exercise Service (Exercise): ${error.message}`, error.response?.status || 500);
        }
    }
    
    async doesWorkoutExist(workoutId: number): Promise<boolean> {
        try {
            const response = await axios.get<{ exists: boolean }>(
                `${this.workoutExerciseServiceUrl}/workouts/internal/exists/${workoutId}`
            );
            return response.status === 200 && response.data.exists === true;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                return false;
            }
            console.error(`Error checking workout existence for ID ${workoutId}:`, error.message);
            throw new CustomError(`Failed to communicate with Workout-Exercise Service (Workout): ${error.message}`, error.response?.status || 500);
        }
    }
}