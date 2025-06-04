import { AthleteService } from '../../application/services/athlete.service';
import { AthleteRepository } from '../repositories/interfaces/athlete.repository';
import { CoachRepository } from '../repositories/interfaces/coach.repository';
import { AthleteModel } from '../../application/domain/athlete.model';
import { CoachModel } from '../../application/domain/coach.model';
import { UserModel } from '../../application/domain/user.model';
import { AthleteDto, AthleteStatisticsDto } from '../../dtos/athlete/AthleteDto';
import { CoachDto } from '../../dtos/coach/CoachDto';
import { TrainingDto } from '../../dtos/training/TrainingDto';
import { TrainingModel } from '../../application/domain/training.model';
import { QualificationTrainingModel } from '../../application/domain/qualification-training.model';
import { SeriesModel } from '../../application/domain/series.model';
import { ShotModel } from '../../application/domain/shot.model';
import { NoteModel } from '../../application/domain/note.model';

export class AthleteInfrastructureService {
    constructor(
        private readonly athleteService: AthleteService,
        private readonly athleteRepository: AthleteRepository,
        private readonly coachRepository: CoachRepository
    ) {}

    async getAthleteById(id: number): Promise<AthleteDto> {
        const athlete = await this.athleteRepository.findById(id);
        if (!athlete) {
            throw new Error('Спортсмен не найден');
        }
        return this.mapToDto(athlete);
    }

    async getAllAthletes(): Promise<AthleteModel[]> {
        return this.athleteRepository.findAll();
    }

    async createAthlete(user: UserModel): Promise<AthleteModel> {
        const athlete = this.athleteService.createAthlete(user);
        return this.athleteRepository.save(athlete);
    }

    async deleteAthlete(id: number): Promise<void> {
        await this.getAthleteById(id);
        await this.athleteRepository.delete(id);
    }

    async assignCoach(athleteId: number, coachId: number): Promise<AthleteDto> {
        const athlete = await this.athleteRepository.findById(athleteId);
        if (!athlete) {
            throw new Error('Спортсмен не найден');
        }

        const coach = await this.coachRepository.findById(coachId);
        if (!coach) {
            throw new Error('Тренер не найден');
        }

        this.athleteService.addCoach(athlete, coach);
        const updatedAthlete = await this.athleteRepository.save(athlete);
        return this.mapToDto(updatedAthlete);
    }

    async removeCoach(athleteId: number, coachId: number): Promise<AthleteDto> {
        const athlete = await this.athleteRepository.findById(athleteId);
        if (!athlete) {
            throw new Error('Спортсмен не найден');
        }

        const coach = await this.coachRepository.findById(coachId);
        if (!coach) {
            throw new Error('Тренер не найден');
        }

        this.athleteService.removeCoach(athlete, coach);
        const updatedAthlete = await this.athleteRepository.save(athlete);
        return this.mapToDto(updatedAthlete);
    }

    async getAthleteTrainings(athleteId: number): Promise<TrainingDto[]> {
        const athlete = await this.athleteRepository.findById(athleteId);
        if (!athlete) {
            throw new Error('Спортсмен не найден');
        }

        return athlete.trainings.map((training: TrainingModel) => this.mapTrainingToDto(training));
    }

    async getAthleteCoaches(athleteId: number): Promise<CoachDto[]> {
        const athlete = await this.athleteRepository.findById(athleteId);
        if (!athlete) {
            throw new Error('Спортсмен не найден');
        }

        return athlete.coaches.map((coach: CoachModel) => this.mapCoachToDto(coach));
    }

    async getAthleteStatistics(athleteId: number): Promise<AthleteStatisticsDto> {
        const athlete = await this.athleteRepository.findById(athleteId);
        if (!athlete) {
            throw new Error('Спортсмен не найден');
        }

        return this.athleteService.calculateStatistics(athlete);
    }

    private mapToDto(model: AthleteModel): AthleteDto {
        return {
            id: model.user.id,
            user: {
                id: model.user.id,
                username: model.user.username,
                role: 'athlete'
            },
            coaches: model.coaches.map((coach: CoachModel) => this.mapCoachToDto(coach)),
            trainings: model.trainings.map((training: TrainingModel) => this.mapTrainingToDto(training))
        };
    }

    private mapCoachToDto(model: CoachModel): CoachDto {
        return {
            id: model.user.id,
            user: {
                id: model.user.id,
                username: model.user.username,
                role: 'coach'
            },
            athletes: model.athletes.map((athlete: AthleteModel) => ({
                id: athlete.user.id,
                user: {
                    id: athlete.user.id,
                    username: athlete.user.username,
                    role: 'athlete'
                },
                coaches: [],
                trainings: []
            }))
        };
    }

    private mapTrainingToDto(model: TrainingModel): TrainingDto {
        return {
            id: model.id,
            startTimeStamp: model.startTimeStamp,
            endTimeStamp: model.endTimeStamp,
            series: model.getSeries().map((s: SeriesModel) => ({
                id: s.id,
                beginTimeOffset: s.beginTimeOffset,
                endTimeOffset: s.endTimeOffset,
                maxShots: s.maxShots,
                shots: s.allShots.map((shot: ShotModel) => ({
                    id: shot.id,
                    x: shot.x,
                    y: shot.y,
                    score: shot.score,
                    timeOffset: shot.timeOffset
                })),
                notes: s.allNotes.map((note: NoteModel) => ({
                    id: note.id,
                    userId: note.user.id,
                    createdAt: note.createdAt,
                    editedAt: note.editedAt,
                    content: note.content
                })),
                seriesTotalScore: s.seriesTotalScore,
                shotCount: s.shotCount,
                averageScore: s.averageScore,
                averagePoint: s.averagePoint
            })),
            notes: model.getNotes().map((note: NoteModel) => ({
                id: note.id,
                userId: note.user.id,
                createdAt: note.createdAt,
                editedAt: note.editedAt,
                content: note.content
            })),
            type: model instanceof QualificationTrainingModel ? 'qualification' : 'free'
        };
    }
} 