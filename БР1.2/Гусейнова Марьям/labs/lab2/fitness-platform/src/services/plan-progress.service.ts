import { AppDataSource } from '../data-source';
import { PlanProgress } from '../models/PlanProgress';

export class PlanProgressService {
  private planProgressRepository = AppDataSource.getRepository(PlanProgress);

  async getAllMyPlanProgresses(userId: number): Promise<PlanProgress[]> {
    return this.planProgressRepository.find({
      where: { user: { user_id: userId } },
      relations: ['workoutPlan']
    });
  }

  // Все прогрессы пользователя по конкретному плану
  async getMyPlanProgressesByPlan(userId: number, planId: number): Promise<PlanProgress[]> {
    return this.planProgressRepository.find({
      where: {
        user: { user_id: userId },
        workoutPlan: { plan_id: planId }
      },
      // relations: ['workoutPlan']
    });
  }

  async getAllPlanProgress(): Promise<PlanProgress[]> {
    return this.planProgressRepository.find({
      relations: ['user', 'workoutPlan'], // Подгружаем связанные сущности
    });
  }

  async getPlanProgressById(id: number): Promise<PlanProgress | null> {
    return this.planProgressRepository.findOne({
      where: { plan_progress_id: id },
      relations: ['user', 'workoutPlan'], // Подгружаем связанные сущности
    });
  }

  async createPlanProgress(planProgressData: Partial<PlanProgress>): Promise<PlanProgress> {
    const planProgress = this.planProgressRepository.create(planProgressData);
    return this.planProgressRepository.save(planProgress);
  }

  async updatePlanProgress(id: number, planProgressData: Partial<PlanProgress>): Promise<PlanProgress | null> {
    const planProgress = await this.planProgressRepository.findOneBy({ plan_progress_id: id });
    if (planProgress) {
      this.planProgressRepository.merge(planProgress, planProgressData);
      return this.planProgressRepository.save(planProgress);
    }
    return null;
  }

  async deletePlanProgress(id: number): Promise<boolean> {
    const result = await this.planProgressRepository.delete(id);
    return !!result.affected;
  }
}