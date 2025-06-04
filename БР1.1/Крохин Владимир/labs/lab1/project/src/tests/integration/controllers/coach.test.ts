import request from 'supertest';
import { app } from '../../../app';
import { DataSource } from 'typeorm';
import { bootstrap } from '../../../bootstrap';
import { UserTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/user.typeorm.repository';
import { AthleteTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/athlete.typeorm.repository';
import { CoachTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/coach.typeorm.repository';

describe('Тесты интеграции CoachController', () => {
    let dataSource: DataSource;
    let userRepository: UserTypeOrmRepository;
    let athleteRepository: AthleteTypeOrmRepository;
    let coachRepository: CoachTypeOrmRepository;
    let authToken: string;
    let athleteAuthToken: string;

    beforeAll(async () => {
        // Инициализация тестовой базы данных
        dataSource = new DataSource({
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            entities: ['src/infrastructure/repositories/typeorm/models/**/*.ts'],
            synchronize: true,
            logging: false
        });
        await dataSource.initialize();

        // Инициализация репозиториев
        userRepository = new UserTypeOrmRepository(dataSource);
        athleteRepository = new AthleteTypeOrmRepository(dataSource);
        coachRepository = new CoachTypeOrmRepository(dataSource);
    });

    afterAll(async () => {
        await dataSource.destroy();
    });

    beforeEach(async () => {
        // Очистка базы данных перед каждым тестом
        await dataSource.synchronize(true);

        // Создаем тестового тренера
        const coachData = {
            username: 'coach',
            password: 'password123',
            email: 'coach@example.com',
            firstName: 'Coach',
            lastName: 'Test'
        };

        await request(app)
            .post('/auth/register')
            .send(coachData);

        const coachLoginResponse = await request(app)
            .post('/auth/login')
            .send({
                username: 'coach',
                password: 'password123'
            });

        authToken = coachLoginResponse.body.token;

        // Создаем тестового спортсмена
        const athleteData = {
            username: 'athlete',
            password: 'password123',
            email: 'athlete@example.com',
            firstName: 'Athlete',
            lastName: 'Test'
        };

        await request(app)
            .post('/auth/register')
            .send(athleteData);

        const athleteLoginResponse = await request(app)
            .post('/auth/login')
            .send({
                username: 'athlete',
                password: 'password123'
            });

        athleteAuthToken = athleteLoginResponse.body.token;
    });

    describe('GET /coaches/profile', () => {
        it('должен получить профиль тренера с валидным токеном', async () => {
            const response = await request(app)
                .get('/coaches/profile')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id');
            expect(response.body.user.username).toBe('coach');
        });

        it('не должен получить профиль без токена', async () => {
            const response = await request(app)
                .get('/coaches/profile');

            expect(response.status).toBe(401);
        });

        it('не должен получить профиль с токеном спортсмена', async () => {
            const response = await request(app)
                .get('/coaches/profile')
                .set('Authorization', `Bearer ${athleteAuthToken}`);

            expect(response.status).toBe(403);
        });
    });

    describe('GET /coaches/athletes', () => {
        it('должен получить список спортсменов с валидным токеном', async () => {
            const response = await request(app)
                .get('/coaches/athletes')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('не должен получить список спортсменов без токена', async () => {
            const response = await request(app)
                .get('/coaches/athletes');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /coaches/trainings', () => {
        it('должен получить список тренировок с валидным токеном', async () => {
            const response = await request(app)
                .get('/coaches/trainings')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('не должен получить список тренировок без токена', async () => {
            const response = await request(app)
                .get('/coaches/trainings');

            expect(response.status).toBe(401);
        });
    });

    describe('POST /coaches/athletes/:athleteId', () => {
        it('должен добавить спортсмена с валидным токеном', async () => {
            // Сначала получаем ID спортсмена
            const athleteProfileResponse = await request(app)
                .get('/athletes/profile')
                .set('Authorization', `Bearer ${athleteAuthToken}`);

            const athleteId = athleteProfileResponse.body.id;

            const response = await request(app)
                .post(`/coaches/athletes/${athleteId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id');
        });

        it('не должен добавить спортсмена без токена', async () => {
            const response = await request(app)
                .post('/coaches/athletes/1');

            expect(response.status).toBe(401);
        });

        it('не должен добавить несуществующего спортсмена', async () => {
            const response = await request(app)
                .post('/coaches/athletes/999')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(404);
        });
    });

    describe('DELETE /coaches/athletes/:athleteId', () => {
        it('должен удалить спортсмена с валидным токеном', async () => {
            // Сначала получаем ID спортсмена
            const athleteProfileResponse = await request(app)
                .get('/athletes/profile')
                .set('Authorization', `Bearer ${athleteAuthToken}`);

            const athleteId = athleteProfileResponse.body.id;

            // Добавляем спортсмена
            await request(app)
                .post(`/coaches/athletes/${athleteId}`)
                .set('Authorization', `Bearer ${authToken}`);

            // Удаляем спортсмена
            const response = await request(app)
                .delete(`/coaches/athletes/${athleteId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
        });

        it('не должен удалить спортсмена без токена', async () => {
            const response = await request(app)
                .delete('/coaches/athletes/1');

            expect(response.status).toBe(401);
        });

        it('не должен удалить несуществующего спортсмена', async () => {
            const response = await request(app)
                .delete('/coaches/athletes/999')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(404);
        });
    });
}); 