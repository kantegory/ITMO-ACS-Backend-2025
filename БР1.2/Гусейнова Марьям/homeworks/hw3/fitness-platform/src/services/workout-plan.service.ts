import { AppDataSource } from '../data-source';
import { WorkoutPlan } from '../models/WorkoutPlan';

export class WorkoutPlanService {
  private workoutPlanRepository = AppDataSource.getRepository(WorkoutPlan);

  // Все планы конкретного пользователя
  async getAllMyWorkoutPlans(userId: number): Promise<WorkoutPlan[]> {
    return this.workoutPlanRepository.find({
      where: { user: { user_id: userId } }, 
      // relations: ['user'] // для вложенного отображения пользователя 
    });
  }

  async getAllWorkoutPlans(): Promise<WorkoutPlan[]> {
    return this.workoutPlanRepository.find();
  }

  async getWorkoutPlanById(id: number): Promise<WorkoutPlan | null> {
    return this.workoutPlanRepository.findOneBy({ plan_id: id });
  }

  async createWorkoutPlan(workoutPlanData: Partial<WorkoutPlan>): Promise<WorkoutPlan> {
    const workoutPlan = this.workoutPlanRepository.create(workoutPlanData);
    return this.workoutPlanRepository.save(workoutPlan);
  }

  async updateWorkoutPlan(id: number, workoutPlanData: Partial<WorkoutPlan>): Promise<WorkoutPlan | null> {
    const workoutPlan = await this.workoutPlanRepository.findOneBy({ plan_id: id });
    if (workoutPlan) {
      this.workoutPlanRepository.merge(workoutPlan, workoutPlanData);
      return this.workoutPlanRepository.save(workoutPlan);
    }
    return null;
  }

  async deleteWorkoutPlan(id: number): Promise<boolean> {
    const result = await this.workoutPlanRepository.delete(id);
    return !!result.affected;
  }
}