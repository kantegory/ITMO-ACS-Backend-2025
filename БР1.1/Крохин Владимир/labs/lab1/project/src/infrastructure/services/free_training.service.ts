import { FreeTrainingRepository } from '../repositories/interfaces/free-training.repository';
import { UserRepository } from '../repositories/interfaces/user.repository';
import { FreeTrainingService } from '../../application/services/free_training.service';
import { FreeTrainingModel } from '../../application/domain/free-training.model';
import { SeriesModel } from '../../application/domain/series.model';
import { NoteModel } from '../../application/domain/note.model';
import { UserModel } from '../../application/domain/user.model';

export class FreeTrainingInfrastructureService {
    constructor(
        private readonly freeTrainingRepository: FreeTrainingRepository,
        private readonly userRepository: UserRepository,
        private readonly freeTrainingService: FreeTrainingService
    ) {}

    async startTraining(userId: number): Promise<FreeTrainingModel> {
        const training = new FreeTrainingModel(new Date());
        return this.freeTrainingRepository.save(training);
    }

    async getTrainingById(id: number): Promise<FreeTrainingModel> {
        const training = await this.freeTrainingRepository.findById(id);
        if (!training) {
            throw new Error('Training not found');
        }
        return training;
    }

    async getUserTrainings(userId: number): Promise<FreeTrainingModel[]> {
        return this.freeTrainingRepository.findAllByUser(userId);
    }

    async addSeries(trainingId: number, maxShots: number): Promise<SeriesModel> {
        const training = await this.getTrainingById(trainingId);
        const series = this.freeTrainingService.addSeriesToTraining(training, maxShots);
        await this.freeTrainingRepository.save(training);
        return series;
    }

    async addNote(trainingId: number, userId: number, content: string): Promise<NoteModel> {
        const training = await this.getTrainingById(trainingId);
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const note = this.freeTrainingService.addNoteToTraining(training, user, content);
        await this.freeTrainingRepository.save(training);
        return note;
    }

    async removeNote(trainingId: number, noteId: number): Promise<void> {
        const training = await this.getTrainingById(trainingId);
        const note = training.getNoteById(noteId);
        if (!note) {
            throw new Error('Note not found');
        }
        this.freeTrainingService.removeNoteFromTraining(training, note);
        await this.freeTrainingRepository.save(training);
    }

    async completeTraining(id: number): Promise<FreeTrainingModel> {
        const training = await this.getTrainingById(id);
        this.freeTrainingService.completeTraining(training);
        return this.freeTrainingRepository.save(training);
    }
} 