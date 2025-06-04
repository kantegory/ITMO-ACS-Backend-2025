import { AthleteRepository } from '../repositories/interfaces/athlete.repository';
import { CoachRepository } from '../repositories/interfaces/coach.repository';
import { TrainingRepository } from '../repositories/interfaces/training.repository';
import { AthleteModel } from '../domain/athlete.model';
import { CoachModel } from '../domain/coach.model';
import { TrainingModel } from '../domain/training.model';
import { QualificationTrainingModel } from '../domain/qualification-training.model';
import { AthleteDto, AthleteStatisticsDto } from '../../dtos/athlete/AthleteDto';
import { CoachDto } from '../../dtos/coach/CoachDto';
import { TrainingDto } from '../../dtos/training/TrainingDto';
import { UserMapper } from '../repositories/typeorm/models/mappers/user.mapper';

export class AthleteService {
    constructor(
        private readonly athleteRepository: AthleteRepository,
        private readonly coachRepository: CoachRepository,
        private readonly trainingRepository: TrainingRepository
    ) {}

    async getAthleteById(id: number): Promise<AthleteDto> {
        const athlete = await this.athleteRepository.findById(id);
        if (!athlete) {
            throw new Error('Спортсмен не найден');
        }
        return this.mapToDto(athlete);
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

        athlete.addCoach(coach);
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

        athlete.removeCoach(coach);
        const updatedAthlete = await this.athleteRepository.save(athlete);
        return this.mapToDto(updatedAthlete);
    }

    async getAthleteTrainings(athleteId: number): Promise<TrainingDto[]> {
        const athlete = await this.athleteRepository.findById(athleteId);
        if (!athlete) {
            throw new Error('Спортсмен не найден');
        }

        return athlete.trainings.map(training => this.mapTrainingToDto(training));
    }

    async getAthleteCoaches(athleteId: number): Promise<CoachDto[]> {
        const athlete = await this.athleteRepository.findById(athleteId);
        if (!athlete) {
            throw new Error('Спортсмен не найден');
        }

        return athlete.coaches.map(coach => this.mapCoachToDto(coach));
    }

    async getAthleteStatistics(athleteId: number): Promise<AthleteStatisticsDto> {
        const athlete = await this.athleteRepository.findById(athleteId);
        if (!athlete) {
            throw new Error('Спортсмен не найден');
        }

        const trainings = athlete.trainings;
        if (trainings.length === 0) {
            return {
                totalTrainings: 0,
                totalCoaches: athlete.coaches.length,
                averageScore: 0,
                bestScore: 0,
                worstScore: 0
            };
        }

        const scores = trainings.flatMap(t => 
            t.getSeries().flatMap(s => s.allShots.map(shot => shot.score))
        );

        return {
            totalTrainings: trainings.length,
            totalCoaches: athlete.coaches.length,
            averageScore: scores.reduce((sum, score) => sum + score, 0) / scores.length,
            bestScore: Math.max(...scores),
            worstScore: Math.min(...scores)
        };
    }

    private mapToDto(model: AthleteModel): AthleteDto {
        return {
            id: model.user.id,
            user: {
                id: model.user.id,
                username: model.user.username,
                role: 'athlete'
            },
            coaches: model.coaches.map(coach => this.mapCoachToDto(coach)),
            trainings: model.trainings.map(training => this.mapTrainingToDto(training))
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
            athletes: model.athletes.map(athlete => ({
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