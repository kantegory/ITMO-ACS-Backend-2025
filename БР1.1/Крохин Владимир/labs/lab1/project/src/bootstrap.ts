import { DataSource } from 'typeorm';
import { UserService } from './application/services/UserService';
import { FreeTrainingService } from './application/services/FreeTrainingService';
import { QualificationTrainingService } from './application/services/QualificationTrainingService';
import { SeriesService } from './application/services/SeriesService';
import { ShotService } from './application/services/ShotService';
import { NoteService } from './application/services/NoteService';
import { ExerciseService } from './application/services/ExerciseService';
import { TargetService } from './application/services/TargetService';
import { WeaponTypeService } from './application/services/WeaponTypeService';
import { AuthService } from './application/services/AuthService';
import { AthleteService } from './application/services/AthleteService';
import { CoachService } from './application/services/CoachService';
import { UserTypeOrmRepository } from './infrastructure/repositories/typeorm/user.typeorm.repository';
import { FreeTrainingTypeOrmRepository } from './infrastructure/repositories/typeorm/free-training.typeorm.repository';
import { QualificationTrainingTypeOrmRepository } from './infrastructure/repositories/typeorm/qualification-training.typeorm.repository';
import { SeriesTypeOrmRepository } from './infrastructure/repositories/typeorm/series.typeorm.repository';
import { ShotTypeOrmRepository } from './infrastructure/repositories/typeorm/shot.typeorm.repository';
import { NoteTypeOrmRepository } from './infrastructure/repositories/typeorm/note.typeorm.repository';
import { ExerciseTypeOrmRepository } from './infrastructure/repositories/typeorm/exercise.typeorm.repository';
import { TargetTypeOrmRepository } from './infrastructure/repositories/typeorm/target.typeorm.repository';
import { WeaponTypeTypeOrmRepository } from './infrastructure/repositories/typeorm/weapon-type.typeorm.repository';
import { AthleteTypeOrmRepository } from './infrastructure/repositories/typeorm/athlete.typeorm.repository';
import { CoachTypeOrmRepository } from './infrastructure/repositories/typeorm/coach.typeorm.repository';
import { ShotEntity } from './infrastructure/repositories/typeorm/models/shot.entity';
import { NoteEntity } from './infrastructure/repositories/typeorm/models/note.entity';
import { ExerciseEntity } from './infrastructure/repositories/typeorm/models/exercise.entity';
import { TargetEntity } from './infrastructure/repositories/typeorm/models/target.entity';
import { WeaponTypeEntity } from './infrastructure/repositories/typeorm/models/weapon-type.entity';

// Интерфейсы для хешмапов
export interface Repositories {
    userRepository: UserTypeOrmRepository;
    freeTrainingRepository: FreeTrainingTypeOrmRepository;
    qualificationTrainingRepository: QualificationTrainingTypeOrmRepository;
    seriesRepository: SeriesTypeOrmRepository;
    shotRepository: ShotTypeOrmRepository;
    noteRepository: NoteTypeOrmRepository;
    exerciseRepository: ExerciseTypeOrmRepository;
    targetRepository: TargetTypeOrmRepository;
    weaponTypeRepository: WeaponTypeTypeOrmRepository;
    athleteRepository: AthleteTypeOrmRepository;
    coachRepository: CoachTypeOrmRepository;
}

export interface Services {
    userService: UserService;
    freeTrainingService: FreeTrainingService;
    qualificationTrainingService: QualificationTrainingService;
    seriesService: SeriesService;
    shotService: ShotService;
    noteService: NoteService;
    exerciseService: ExerciseService;
    targetService: TargetService;
    weaponTypeService: WeaponTypeService;
    authService: AuthService;
    athleteService: AthleteService;
    coachService: CoachService;
}

// Функция для создания репозиториев (для продакшена)
export const createRepositories = (dataSource: DataSource): Repositories => {
    return {
        userRepository: new UserTypeOrmRepository(dataSource),
        freeTrainingRepository: new FreeTrainingTypeOrmRepository(dataSource),
        qualificationTrainingRepository: new QualificationTrainingTypeOrmRepository(dataSource),
        seriesRepository: new SeriesTypeOrmRepository(dataSource),
        shotRepository: new ShotTypeOrmRepository(dataSource.getRepository(ShotEntity)),
        noteRepository: new NoteTypeOrmRepository(dataSource.getRepository(NoteEntity)),
        exerciseRepository: new ExerciseTypeOrmRepository(dataSource.getRepository(ExerciseEntity)),
        targetRepository: new TargetTypeOrmRepository(dataSource.getRepository(TargetEntity)),
        weaponTypeRepository: new WeaponTypeTypeOrmRepository(dataSource.getRepository(WeaponTypeEntity)),
        athleteRepository: new AthleteTypeOrmRepository(dataSource),
        coachRepository: new CoachTypeOrmRepository(dataSource)
    };
};

// Функция для создания сервисов (для продакшена)
export const createServices = (repositories: Repositories): Services => {
    const {
        userRepository,
        freeTrainingRepository,
        qualificationTrainingRepository,
        seriesRepository,
        shotRepository,
        noteRepository,
        exerciseRepository,
        targetRepository,
        weaponTypeRepository,
        athleteRepository,
        coachRepository
    } = repositories;

    const userService = new UserService(userRepository);
    const freeTrainingService = new FreeTrainingService(
        freeTrainingRepository,
        weaponTypeRepository,
        targetRepository
    );
    const qualificationTrainingService = new QualificationTrainingService(
        qualificationTrainingRepository,
        exerciseRepository
    );
    const seriesService = new SeriesService(seriesRepository);
    const shotService = new ShotService(shotRepository);
    const noteService = new NoteService(noteRepository);
    const exerciseService = new ExerciseService(exerciseRepository, targetRepository);
    const targetService = new TargetService(targetRepository);
    const weaponTypeService = new WeaponTypeService(weaponTypeRepository);
    const athleteService = new AthleteService(athleteRepository, coachRepository, freeTrainingRepository);
    const coachService = new CoachService(coachRepository, athleteRepository, freeTrainingRepository);
    const authService = new AuthService(userService, athleteService, coachService);

    return {
        userService,
        freeTrainingService,
        qualificationTrainingService,
        seriesService,
        shotService,
        noteService,
        exerciseService,
        targetService,
        weaponTypeService,
        authService,
        athleteService,
        coachService
    };
};

// Основная функция bootstrap теперь принимает готовые репозитории и сервисы
export const bootstrap = (repositories: Repositories, services: Services): { repositories: Repositories; services: Services } => {
    return { repositories, services };
}; 