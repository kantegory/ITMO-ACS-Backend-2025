import request from 'supertest';
import app from '../../../app';
import { DataSource } from 'typeorm';
import { bootstrap } from '../../../bootstrap';
import { UserTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/user.typeorm.repository';
import { AthleteTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/athlete.typeorm.repository';
import { CoachTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/coach.typeorm.repository';

describe('Тесты интеграции AthleteController', () => {
    let dataSource: DataSource;
    let userRepository: UserTypeOrmRepository;
    let athleteRepository: AthleteTypeOrmRepository;
    let coachRepository: CoachTypeOrmRepository;
    let authToken: string;
    let coachAuthToken: string;

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

        authToken = athleteLoginResponse.body.token;

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

        coachAuthToken = coachLoginResponse.body.token;
    });

    describe('GET /athletes/profile', () => {
        it('должен получить профиль спортсмена с валидным токеном', async () => {
            const response = await request(app)
                .get('/athletes/profile')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id');
            expect(response.body.user.username).toBe('athlete');
        });

        it('не должен получить профиль без токена', async () => {
            const response = await request(app)
                .get('/athletes/profile');

            expect(response.status).toBe(401);
        });

        it('не должен получить профиль с токеном тренера', async () => {
            const response = await request(app)
                .get('/athletes/profile')
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(403);
        });
    });

    describe('GET /athletes/coaches', () => {
        it('должен получить список тренеров с валидным токеном', async () => {
            const response = await request(app)
                .get('/athletes/coaches')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('не должен получить список тренеров без токена', async () => {
            const response = await request(app)
                .get('/athletes/coaches');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /athletes/trainings', () => {
        it('должен получить список тренировок с валидным токеном', async () => {
            const response = await request(app)
                .get('/athletes/trainings')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('не должен получить список тренировок без токена', async () => {
            const response = await request(app)
                .get('/athletes/trainings');

            expect(response.status).toBe(401);
        });
    });

    describe('POST /athletes/coaches/:coachId', () => {
        it('должен добавить тренера с валидным токеном', async () => {
            // Сначала получаем ID тренера
            const coachProfileResponse = await request(app)
                .get('/coaches/profile')
                .set('Authorization', `Bearer ${coachAuthToken}`);

            const coachId = coachProfileResponse.body.id;

            const response = await request(app)
                .post(`/athletes/coaches/${coachId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id');
        });

        it('не должен добавить тренера без токена', async () => {
            const response = await request(app)
                .post('/athletes/coaches/1');

            expect(response.status).toBe(401);
        });

        it('не должен добавить несуществующего тренера', async () => {
            const response = await request(app)
                .post('/athletes/coaches/999')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(404);
        });
    });

    describe('DELETE /athletes/coaches/:coachId', () => {
        it('должен удалить тренера с валидным токеном', async () => {
            // Сначала получаем ID тренера
            const coachProfileResponse = await request(app)
                .get('/coaches/profile')
                .set('Authorization', `Bearer ${coachAuthToken}`);

            const coachId = coachProfileResponse.body.id;

            // Добавляем тренера
            await request(app)
                .post(`/athletes/coaches/${coachId}`)
                .set('Authorization', `Bearer ${authToken}`);

            // Удаляем тренера
            const response = await request(app)
                .delete(`/athletes/coaches/${coachId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
        });

        it('не должен удалить тренера без токена', async () => {
            const response = await request(app)
                .delete('/athletes/coaches/1');

            expect(response.status).toBe(401);
        });

        it('не должен удалить несуществующего тренера', async () => {
            const response = await request(app)
                .delete('/athletes/coaches/999')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(404);
        });
    });
}); 