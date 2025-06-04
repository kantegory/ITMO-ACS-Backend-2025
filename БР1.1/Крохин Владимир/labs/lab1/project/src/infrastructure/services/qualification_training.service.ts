import { QualificationTrainingRepository } from '../repositories/interfaces/qualification-training.repository';
import { UserRepository } from '../repositories/interfaces/user.repository';
import { ExerciseRepository } from '../repositories/interfaces/exercise.repository';
import { QualificationTrainingService } from '../../application/services/qualification_training.service';
import { QualificationTrainingModel } from '../../application/domain/qualification-training.model';
import { SeriesModel } from '../../application/domain/series.model';
import { NoteModel } from '../../application/domain/note.model';
import { UserModel } from '../../application/domain/user.model';
import { ExerciseModel } from '../../application/domain/exercise.model';

export class QualificationTrainingInfrastructureService {
    constructor(
        private readonly qualificationTrainingRepository: QualificationTrainingRepository,
        private readonly userRepository: UserRepository,
        private readonly exerciseRepository: ExerciseRepository,
        private readonly qualificationTrainingService: QualificationTrainingService
    ) {}

    async startTraining(userId: number, exerciseId: number): Promise<QualificationTrainingModel> {
        const user = await this.userRepository.findById(userId);
        if (!user) throw new Error('User not found');
        const exercise = await this.exerciseRepository.findById(exerciseId);
        if (!exercise) throw new Error('Exercise not found');
        const training = new QualificationTrainingModel(user, exercise, new Date());
        return this.qualificationTrainingRepository.save(training);
    }

    async getTrainingById(id: number): Promise<QualificationTrainingModel> {
        const training = await this.qualificationTrainingRepository.findById(id);
        if (!training) throw new Error('Training not found');
        return training;
    }

    async getUserTrainings(userId: number): Promise<QualificationTrainingModel[]> {
        return this.qualificationTrainingRepository.findAllByUser(userId);
    }

    async addSeries(trainingId: number, maxShots: number): Promise<SeriesModel> {
        const training = await this.getTrainingById(trainingId);
        const series = this.qualificationTrainingService.addSeriesToTraining(training, maxShots);
        await this.qualificationTrainingRepository.save(training);
        return series;
    }

    async addNote(trainingId: number, userId: number, content: string): Promise<NoteModel> {
        const training = await this.getTrainingById(trainingId);
        const user = await this.userRepository.findById(userId);
        if (!user) throw new Error('User not found');
        const note = this.qualificationTrainingService.addNoteToTraining(training, user, content);
        await this.qualificationTrainingRepository.save(training);
        return note;
    }

    async removeNote(trainingId: number, noteId: number): Promise<void> {
        const training = await this.getTrainingById(trainingId);
        const note = training.getNoteById(noteId);
        if (!note) throw new Error('Note not found');
        this.qualificationTrainingService.removeNoteFromTraining(training, note);
        await this.qualificationTrainingRepository.save(training);
    }

    async completeTraining(id: number): Promise<QualificationTrainingModel> {
        const training = await this.getTrainingById(id);
        this.qualificationTrainingService.completeTraining(training);
        return this.qualificationTrainingRepository.save(training);
    }
} 