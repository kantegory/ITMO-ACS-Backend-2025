import { AppDataSource } from '../data-source';
import { CurrentProgress } from '../models/CurrentProgress';

export class CurrentProgressService {
  private currentProgressRepository = AppDataSource.getRepository(CurrentProgress);

  async getMyCurrentProgress(userId: number): Promise<CurrentProgress | null> {
    return this.currentProgressRepository.findOne({
      where: { user: { user_id: userId } },
      // relations: ['user']
    });
  }

  async getAllCurrentProgress(): Promise<CurrentProgress[]> {
    return this.currentProgressRepository.find({
      relations: ['user'], // Подгружаем связанного пользователя
    });
  }

  async getCurrentProgressByUserId(userId: number): Promise<CurrentProgress | null> {
    return this.currentProgressRepository.findOne({
      where: { user: { user_id: userId } },
      relations: ['user'], // Подгружаем связанного пользователя
    });
  }

  async createCurrentProgress(currentProgressData: Partial<CurrentProgress>): Promise<CurrentProgress> {
    const currentProgress = this.currentProgressRepository.create(currentProgressData);
    return this.currentProgressRepository.save(currentProgress);
  }

  async updateCurrentProgress(userId: number, currentProgressData: Partial<CurrentProgress>): Promise<CurrentProgress | null> {
    const currentProgress = await this.currentProgressRepository.findOne({
      where: { user: { user_id: userId } },
    });
    if (currentProgress) {
      this.currentProgressRepository.merge(currentProgress, currentProgressData);
      return this.currentProgressRepository.save(currentProgress);
    }
    return null;
  }

  async deleteCurrentProgress(userId: number): Promise<boolean> {
    const result = await this.currentProgressRepository.delete({ user: { user_id: userId } });
    return !!result.affected;
  }

  async getCurrentProgressById(id: number): Promise<CurrentProgress | null> {
    return this.currentProgressRepository.findOne({
      where: { progress_id: id },
      relations: ['user'],
    });
  }
}