import { AuthService } from '../../../application/services/auth.service';
import { UserService } from '../../../application/services/UserService';
import { AthleteService } from '../../../application/services/AthleteService';
import { CoachService } from '../../../application/services/CoachService';
import { FakeUserRepository } from '../../../infrastructure/repositories/fakes/user.repository';
import { FakeAthleteRepository } from '../../../infrastructure/repositories/fakes/athlete.repository';
import { FakeCoachRepository } from '../../../infrastructure/repositories/fakes/coach.repository';
import { FakeTrainingRepository } from '../../../infrastructure/repositories/fakes/training.repository';
import { UserModel } from '../../../application/domain/user.model';
import { AthleteModel } from '../../../application/domain/athlete.model';
import { CoachModel } from '../../../application/domain/coach.model';
import SETTINGS from '../../../config/settings';
import jwt from 'jsonwebtoken';

describe('AuthService', () => {
    let authService: AuthService;
    let userService: UserService;
    let athleteService: AthleteService;
    let coachService: CoachService;
    let fakeUserRepository: FakeUserRepository;
    let fakeAthleteRepository: FakeAthleteRepository;
    let fakeCoachRepository: FakeCoachRepository;
    let fakeTrainingRepository: FakeTrainingRepository;
    let user: UserModel;
    let athlete: AthleteModel;
    let coach: CoachModel;

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeAthleteRepository = new FakeAthleteRepository();
        fakeCoachRepository = new FakeCoachRepository();
        fakeTrainingRepository = new FakeTrainingRepository();

        userService = new UserService(fakeUserRepository);
        athleteService = new AthleteService(fakeAthleteRepository, fakeCoachRepository, fakeTrainingRepository);
        coachService = new CoachService(fakeCoachRepository, fakeAthleteRepository, fakeTrainingRepository);
        authService = new AuthService(userService, athleteService, coachService);
        user = new UserModel(1, 'testuser', 'password');
        athlete = new AthleteModel(1, user);
        coach = new CoachModel(1, user);
    });

    describe('регистрация', () => {
        it('должен успешно зарегистрировать нового пользователя', async () => {
            const user = await authService.register('testuser', 'password123', 'test@example.com', 'Test', 'User');
            expect(user).toBeDefined();
            expect(user.username).toBe('testuser');
            expect(user.id).toBeDefined();
            expect(user.role).toBeDefined();
        });

        it('должен выбрасывать ошибку при регистрации с существующим именем пользователя', async () => {
            await authService.register('testuser', 'password123', 'test@example.com', 'Test', 'User');
            await expect(authService.register('testuser', 'password123', 'test2@example.com', 'Test2', 'User2'))
                .rejects.toThrow();
        });
    });

    describe('авторизация', () => {
        beforeEach(async () => {
            await authService.register('testuser', 'password123', 'test@example.com', 'Test', 'User');
        });

        it('должен успешно авторизовать пользователя', async () => {
            const result = await authService.login('testuser', 'password123');
            expect(result.user).toBeDefined();
            expect(result.token).toBeDefined();
            expect(result.user.username).toBe('testuser');
        });

        it('должен выбрасывать ошибку при неверном пароле', async () => {
            await expect(authService.login('testuser', 'wrongpassword'))
                .rejects.toThrow();
        });

        it('должен выбрасывать ошибку при несуществующем пользователе', async () => {
            await expect(authService.login('nonexistent', 'password123'))
                .rejects.toThrow();
        });
    });

    describe('профиль пользователя', () => {
        let userId: number;

        beforeEach(async () => {
            const user = await authService.register('testuser', 'password123', 'test@example.com', 'Test', 'User');
            userId = user.id!;
        });

        it('должен получать профиль пользователя', async () => {
            const profile = await authService.getProfile(userId);
            expect(profile).toBeDefined();
            expect(profile.id).toBe(userId);
            expect(profile.username).toBe('testuser');
        });

        it('должен обновлять email пользователя', async () => {
            await expect(authService.updateEmail(userId, 'new@example.com')).resolves.toBeDefined();
        });

        it('должен обновлять имя пользователя', async () => {
            await expect(authService.updateName(userId, 'New', 'Name')).resolves.toBeDefined();
        });
    });

    describe('тип пользователя', () => {
        let userId: number;

        beforeEach(async () => {
            const user = await authService.register('testuser', 'password123', 'test@example.com', 'Test', 'User');
            userId = user.id!;
        });

        it('должен определять тип пользователя как спортсмен', async () => {
            const athlete = new AthleteModel(new UserModel(userId, 'testuser', 'password123'));
            await fakeAthleteRepository.save(athlete);

            const userType = await authService.getUserType(userId);
            expect(userType).toBe('athlete');
        });

        it('должен определять тип пользователя как тренер', async () => {
            const coach = new CoachModel(userId, new UserModel(userId, 'testuser', 'password123'));
            await fakeCoachRepository.save(coach);

            const userType = await authService.getUserType(userId);
            expect(userType).toBe('coach');
        });

        it('должен возвращать null для пользователя без роли', async () => {
            const userType = await authService.getUserType(userId);
            expect(userType).toBeNull();
        });
    });

    describe('верификация токена', () => {
        it('должен успешно верифицировать валидный токен', async () => {
            const user = await authService.register('testuser', 'password123', 'test@example.com', 'Test', 'User');
            const { token } = await authService.login('testuser', 'password123');
            
            const decoded = await authService.verifyToken(token);
            expect(decoded.id).toBe(user.id);
        });

        it('должен выбрасывать ошибку при неверном токене', async () => {
            await expect(authService.verifyToken('invalid-token'))
                .rejects.toThrow('Неверный или истекший токен');
        });

        it('должен выбрасывать ошибку при истекшем токене', async () => {
            const expiredToken = jwt.sign(
                { user: { id: 1 } },
                SETTINGS.JWT_SECRET_KEY,
                { expiresIn: '0s' }
            );

            await new Promise(resolve => setTimeout(resolve, 1000));
            await expect(authService.verifyToken(expiredToken))
                .rejects.toThrow('Неверный или истекший токен');
        });
    });

    describe('generateToken', () => {
        it('should generate a token for a valid user', () => {
            const token = authService.generateToken(user);
            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
        });
    });

    describe('verifyToken', () => {
        it('should return user data when token is valid', () => {
            const token = authService.generateToken(user);
            const userData = authService.verifyToken(token);
            expect(userData).toBeDefined();
            expect(userData.id).toBe(user.id);
        });

        it('should throw error when token is invalid', () => {
            expect(() => {
                authService.verifyToken('invalidtoken');
            }).toThrow('Invalid or expired token');
        });
    });

    describe('verifyUserType', () => {
        it('should verify athlete type correctly', () => {
            expect(authService.verifyUserType(user, UserRole.ATHLETE)).toBe(true);
            expect(authService.verifyUserType(user, UserRole.COACH)).toBe(false);
        });

        it('should verify coach type correctly', () => {
            const coachUser = new UserModel(2, 'coach', 'password', UserRole.COACH);
            expect(authService.verifyUserType(coachUser, UserRole.COACH)).toBe(true);
            expect(authService.verifyUserType(coachUser, UserRole.ATHLETE)).toBe(false);
        });
    });

    describe('validateCredentials', () => {
        it('should return true when username and password match', () => {
            const isValid = authService.validateCredentials(user, 'testuser', 'password123');
            expect(isValid).toBe(true);
        });

        it('should return false when username does not match', () => {
            const isValid = authService.validateCredentials(user, 'wronguser', 'password123');
            expect(isValid).toBe(false);
        });

        it('should return false when password does not match', () => {
            const isValid = authService.validateCredentials(user, 'testuser', 'wrongpassword');
            expect(isValid).toBe(false);
        });

        it('should return false when both username and password do not match', () => {
            const isValid = authService.validateCredentials(user, 'wronguser', 'wrongpassword');
            expect(isValid).toBe(false);
        });
    });

    describe('validateToken', () => {
        it('should return user data when token is valid', () => {
            const token = authService.generateToken(user);
            const userData = authService.validateToken(token);
            expect(userData).toBeDefined();
            expect(userData.id).toBe(user.id);
            expect(userData.username).toBe(user.username);
            expect(userData.role).toBe(user.role);
        });

        it('should return null when token is invalid', () => {
            const userData = authService.validateToken('invalidtoken');
            expect(userData).toBeNull();
        });
    });
});