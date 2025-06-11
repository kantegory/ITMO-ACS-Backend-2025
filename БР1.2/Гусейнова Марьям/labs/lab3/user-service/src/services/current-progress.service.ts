import { AppDataSource } from '../data-source';
import { CurrentProgress } from '../models/CurrentProgress';
import { User } from '../models/User';
import { CustomError } from '../utils/custom-error.util';

export class CurrentProgressService {
  private currentProgressRepository = AppDataSource.getRepository(CurrentProgress);
  private userRepository = AppDataSource.getRepository(User);

  async getMyCurrentProgress(userId: number): Promise<CurrentProgress> {
    const currentProgress = await this.currentProgressRepository.findOne({
      where: { user: { user_id: userId } },
    });
    if (!currentProgress) {
        throw new CustomError('Current progress not found for you', 404);
    }
    return currentProgress;
  }

  async getAllCurrentProgress(): Promise<CurrentProgress[]> {
    return this.currentProgressRepository.find({
      relations: ['user'],
    });
  }

  async getCurrentProgressByUserId(userId: number): Promise<CurrentProgress> {
    const currentProgress = await this.currentProgressRepository.findOne({
      where: { user: { user_id: userId } },
      relations: ['user'],
    });
    if (!currentProgress) {
        throw new CustomError('Current progress not found for this user', 404);
    }
    return currentProgress;
  }

  async getCurrentProgressById(id: number): Promise<CurrentProgress> {
    const currentProgress = await this.currentProgressRepository.findOne({
      where: { progress_id: id },
      relations: ['user'],
    });
    if (!currentProgress) {
      throw new CustomError('Current progress not found', 404);
    }
    return currentProgress;
  }

  async createCurrentProgress(currentProgressData: Partial<CurrentProgress>): Promise<CurrentProgress> {
    // Валидация на обязательное наличие user_id
    if (!currentProgressData.user_id) {
        throw new CustomError('User ID is required to create current progress', 400);
    }

    // Проверка, существует ли пользователь с таким user_id
    const userExists = await this.userRepository.findOneBy({ user_id: currentProgressData.user_id });
    if (!userExists) {
        throw new CustomError(`User with ID ${currentProgressData.user_id} does not exist`, 400);
    }

    // Проверка, есть ли уже прогресс для этого пользователя (один к одному отношение)
    const existingProgress = await this.currentProgressRepository.findOneBy({ user_id: currentProgressData.user_id });
    if (existingProgress) {
        throw new CustomError(`Current progress already exists for user ID ${currentProgressData.user_id}. Use update instead.`, 409);
    }

    const currentProgress = this.currentProgressRepository.create(currentProgressData);
    return this.currentProgressRepository.save(currentProgress);
  }

  async updateCurrentProgress(userId: number, currentProgressData: Partial<CurrentProgress>): Promise<CurrentProgress> {
    const currentProgress = await this.currentProgressRepository.findOne({
      where: { user: { user_id: userId } },
    });
    if (!currentProgress) {
      throw new CustomError('Current progress not found for this user to update', 404);
    }

    // При обновлении, если передан user_id, убедиться, что он совпадает
    if (currentProgressData.user_id && currentProgressData.user_id !== userId) {
        throw new CustomError('Cannot change user ID for an existing current progress record', 400);
    }

    this.currentProgressRepository.merge(currentProgress, currentProgressData);
    return this.currentProgressRepository.save(currentProgress);
  }

  async deleteCurrentProgress(userId: number): Promise<boolean> {
    const currentProgressToDelete = await this.currentProgressRepository.findOne({
      where: { user: { user_id: userId } },
    });
    if (!currentProgressToDelete) {
      throw new CustomError('Current progress not found for this user to delete', 404);
    }

    const result = await this.currentProgressRepository.delete({ user: { user_id: userId } });
    return !!result.affected;
  }
}