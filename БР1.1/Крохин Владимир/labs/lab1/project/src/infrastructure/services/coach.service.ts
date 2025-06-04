import { CoachRepository } from '../repositories/interfaces/coach.repository';
import { CoachService } from '../../application/services/coach.service';
import { CoachModel } from '../../application/domain/coach.model';
import { AthleteRepository } from '../repositories/interfaces/athlete.repository';
import { AthleteModel } from '../../application/domain/athlete.model';
import { UserModel } from '../../application/domain/user.model';
import { CoachDto, CoachStatisticsDto } from '../../dtos/coach/CoachDto';
import { AthleteDto } from '../../dtos/athlete/AthleteDto';
import { TrainingDto } from '../../dtos/training/TrainingDto';
import { TrainingModel } from '../../application/domain/training.model';
import { QualificationTrainingModel } from '../../application/domain/qualification-training.model';
import { SeriesModel } from '../../application/domain/series.model';
import { ShotModel } from '../../application/domain/shot.model';
import { NoteModel } from '../../application/domain/note.model';

export class CoachInfrastructureService {
    constructor(
        private readonly coachRepository: CoachRepository,
        private readonly coachService: CoachService,
        private readonly athleteRepository: AthleteRepository
    ) {}

    async getCoachById(id: number): Promise<CoachDto> {
        const coach = await this.coachRepository.findById(id);
        if (!coach) {
            throw new Error('Тренер не найден');
        }
        return this.mapToDto(coach);
    }

    async getAllCoaches(): Promise<CoachModel[]> {
        return this.coachRepository.findAll();
    }

    async createCoach(user: UserModel): Promise<CoachModel> {
        const coach = this.coachService.createCoach(user);
        return this.coachRepository.save(coach);
    }

    async deleteCoach(id: number): Promise<void> {
        await this.getCoachById(id);
        await this.coachRepository.delete(id);
    }

    async addAthlete(coachId: number, athleteId: number): Promise<CoachDto> {
        const coach = await this.coachRepository.findById(coachId);
        if (!coach) {
            throw new Error('Тренер не найден');
        }

        const athlete = await this.athleteRepository.findById(athleteId);
        if (!athlete) {
            throw new Error('Спортсмен не найден');
        }

        this.coachService.addAthlete(coach, athlete);
        const updatedCoach = await this.coachRepository.save(coach);
        return this.mapToDto(updatedCoach);
    }

    async removeAthlete(coachId: number, athleteId: number): Promise<CoachDto> {
        const coach = await this.coachRepository.findById(coachId);
        if (!coach) {
            throw new Error('Тренер не найден');
        }

        const athlete = await this.athleteRepository.findById(athleteId);
        if (!athlete) {
            throw new Error('Спортсмен не найден');
        }

        this.coachService.removeAthlete(coach, athlete);
        const updatedCoach = await this.coachRepository.save(coach);
        return this.mapToDto(updatedCoach);
    }

    async getCoachAthletes(coachId: number): Promise<AthleteDto[]> {
        const coach = await this.coachRepository.findById(coachId);
        if (!coach) {
            throw new Error('Тренер не найден');
        }

        return coach.athletes.map((athlete: AthleteModel) => this.mapAthleteToDto(athlete));
    }

    async getCoachStatistics(coachId: number): Promise<CoachStatisticsDto> {
        const coach = await this.coachRepository.findById(coachId);
        if (!coach) {
            throw new Error('Тренер не найден');
        }

        return this.coachService.calculateStatistics(coach);
    }

    private mapToDto(model: CoachModel): CoachDto {
        return {
            id: model.user.id,
            user: {
                id: model.user.id,
                username: model.user.username,
                role: 'coach'
            },
            athletes: model.athletes.map((athlete: AthleteModel) => this.mapAthleteToDto(athlete))
        };
    }

    private mapAthleteToDto(model: AthleteModel): AthleteDto {
        return {
            id: model.user.id,
            user: {
                id: model.user.id,
                username: model.user.username,
                role: 'athlete'
            },
            coaches: [],
            trainings: model.trainings.map((training: TrainingModel) => this.mapTrainingToDto(training))
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
