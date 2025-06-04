import { CoachRepository } from '../repositories/interfaces/coach.repository';
import { AthleteRepository } from '../repositories/interfaces/athlete.repository';
import { TrainingRepository } from '../repositories/interfaces/training.repository';
import { CoachModel } from '../domain/coach.model';
import { AthleteModel } from '../domain/athlete.model';
import { TrainingModel } from '../domain/training.model';
import { QualificationTrainingModel } from '../domain/qualification-training.model';
import { CoachDto, CoachStatisticsDto } from '../../dtos/coach/CoachDto';
import { AthleteDto } from '../../dtos/athlete/AthleteDto';
import { TrainingDto } from '../../dtos/training/TrainingDto';

export class CoachService {
    constructor(
        private readonly coachRepository: CoachRepository,
        private readonly athleteRepository: AthleteRepository,
        private readonly trainingRepository: TrainingRepository
    ) {}

    async getCoachById(id: number): Promise<CoachDto> {
        const coach = await this.coachRepository.findById(id);
        if (!coach) {
            throw new Error('Тренер не найден');
        }
        return this.mapToDto(coach);
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

        coach.addAthlete(athlete);
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

        coach.removeAthlete(athlete);
        const updatedCoach = await this.coachRepository.save(coach);
        return this.mapToDto(updatedCoach);
    }

    async getCoachAthletes(coachId: number): Promise<AthleteDto[]> {
        const coach = await this.coachRepository.findById(coachId);
        if (!coach) {
            throw new Error('Тренер не найден');
        }

        return coach.athletes.map(athlete => this.mapAthleteToDto(athlete));
    }

    async getCoachStatistics(coachId: number): Promise<CoachStatisticsDto> {
        const coach = await this.coachRepository.findById(coachId);
        if (!coach) {
            throw new Error('Тренер не найден');
        }

        const athletes = coach.athletes;
        if (athletes.length === 0) {
            return {
                totalAthletes: 0,
                totalTrainings: 0,
                averageAthleteScore: 0,
                bestAthleteScore: 0,
                worstAthleteScore: 0
            };
        }

        const allScores = athletes.flatMap(athlete => 
            athlete.trainings.flatMap(training => 
                training.getSeries().flatMap(series => 
                    series.allShots.map(shot => shot.score)
                )
            )
        );

        const allTrainings = athletes.flatMap(athlete => athlete.trainings);

        return {
            totalAthletes: athletes.length,
            totalTrainings: allTrainings.length,
            averageAthleteScore: allScores.reduce((sum, score) => sum + score, 0) / allScores.length,
            bestAthleteScore: Math.max(...allScores),
            worstAthleteScore: Math.min(...allScores)
        };
    }

    private mapToDto(model: CoachModel): CoachDto {
        return {
            id: model.user.id,
            user: {
                id: model.user.id,
                username: model.user.username,
                role: 'coach'
            },
            athletes: model.athletes.map(athlete => this.mapAthleteToDto(athlete))
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
            trainings: model.trainings.map(training => this.mapTrainingToDto(training))
        };
    }

    private mapTrainingToDto(model: TrainingModel): TrainingDto {
        return {
            id: model.id,
            startTimeStamp: model.startTimeStamp,
            endTimeStamp: model.endTimeStamp,
            series: model.getSeries().map(s => ({
                id: s.id,
                beginTimeOffset: s.beginTimeOffset,
                endTimeOffset: s.endTimeOffset,
                maxShots: s.maxShots,
                shots: s.allShots.map(shot => ({
                    id: shot.id,
                    x: shot.x,
                    y: shot.y,
                    score: shot.score,
                    timeOffset: shot.timeOffset
                })),
                notes: s.allNotes.map(note => ({
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
            notes: model.getNotes().map(note => ({
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