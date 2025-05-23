import { AppDataSource } from '../data-source';
import { WorkoutInPlan } from '../models/WorkoutInPlan';

export class WorkoutInPlanService {
  private workoutInPlanRepository = AppDataSource.getRepository(WorkoutInPlan);

  async getAllWorkoutInPlans(): Promise<WorkoutInPlan[]> {
    return this.workoutInPlanRepository.find({
      relations: ['plan', 'workout'],
    });
  }

  async getWorkoutInPlanById(id: number): Promise<WorkoutInPlan | null> {
    return this.workoutInPlanRepository.findOne({
      where: { workout_in_plan_id: id },
      relations: ['plan', 'workout'],
    });
  }

  async createWorkoutInPlan(workoutInPlanData: Partial<WorkoutInPlan>): Promise<WorkoutInPlan> {
    const workoutInPlan = this.workoutInPlanRepository.create(workoutInPlanData);
    return this.workoutInPlanRepository.save(workoutInPlan);
  }

  async updateWorkoutInPlan(id: number, workoutInPlanData: Partial<WorkoutInPlan>): Promise<WorkoutInPlan | null> {
    const workoutInPlan = await this.workoutInPlanRepository.findOneBy({ workout_in_plan_id: id });
    if (workoutInPlan) {
      this.workoutInPlanRepository.merge(workoutInPlan, workoutInPlanData);
      return this.workoutInPlanRepository.save(workoutInPlan);
    }
    return null;
  }

  async deleteWorkoutInPlan(id: number): Promise<boolean> {
    const result = await this.workoutInPlanRepository.delete(id);
    return !!result.affected;
  }
}