import request from 'supertest';
import app from '../../../app';
import { DataSource } from 'typeorm';
import { bootstrap } from '../../../bootstrap';
import { UserTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/user.typeorm.repository';
import { AthleteTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/athlete.typeorm.repository';
import { CoachTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/coach.typeorm.repository';

describe('Тесты интеграции SeriesController', () => {
    let dataSource: DataSource;
    let userRepository: UserTypeOrmRepository;
    let athleteRepository: AthleteTypeOrmRepository;
    let coachRepository: CoachTypeOrmRepository;
    let coachAuthToken: string;
    let athleteAuthToken: string;
    let trainingId: number;

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

        coachAuthToken = coachLoginResponse.body.token;

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

        // Создаем тестовую тренировку
        const trainingData = {
            title: 'Тестовая тренировка',
            description: 'Описание тестовой тренировки',
            date: new Date().toISOString(),
            duration: 60,
            type: 'QUALIFICATION'
        };

        const createTrainingResponse = await request(app)
            .post('/trainings')
            .set('Authorization', `Bearer ${coachAuthToken}`)
            .send(trainingData);

        trainingId = createTrainingResponse.body.id;
    });

    describe('POST /trainings/:trainingId/series', () => {
        it('должен создать серию с валидным токеном тренера', async () => {
            const seriesData = {
                targetId: 1,
                shots: [
                    { x: 10, y: 10, score: 10 },
                    { x: 9, y: 9, score: 9 },
                    { x: 8, y: 8, score: 8 }
                ]
            };

            const response = await request(app)
                .post(`/trainings/${trainingId}/series`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(seriesData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.shots).toHaveLength(3);
        });

        it('не должен создать серию без токена', async () => {
            const seriesData = {
                targetId: 1,
                shots: [
                    { x: 10, y: 10, score: 10 },
                    { x: 9, y: 9, score: 9 },
                    { x: 8, y: 8, score: 8 }
                ]
            };

            const response = await request(app)
                .post(`/trainings/${trainingId}/series`)
                .send(seriesData);

            expect(response.status).toBe(401);
        });

        it('не должен создать серию с токеном спортсмена', async () => {
            const seriesData = {
                targetId: 1,
                shots: [
                    { x: 10, y: 10, score: 10 },
                    { x: 9, y: 9, score: 9 },
                    { x: 8, y: 8, score: 8 }
                ]
            };

            const response = await request(app)
                .post(`/trainings/${trainingId}/series`)
                .set('Authorization', `Bearer ${athleteAuthToken}`)
                .send(seriesData);

            expect(response.status).toBe(403);
        });
    });

    describe('GET /trainings/:trainingId/series', () => {
        let seriesId: number;

        beforeEach(async () => {
            // Создаем тестовую серию
            const seriesData = {
                targetId: 1,
                shots: [
                    { x: 10, y: 10, score: 10 },
                    { x: 9, y: 9, score: 9 },
                    { x: 8, y: 8, score: 8 }
                ]
            };

            const createResponse = await request(app)
                .post(`/trainings/${trainingId}/series`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(seriesData);

            seriesId = createResponse.body.id;
        });

        it('должен получить список серий с валидным токеном', async () => {
            const response = await request(app)
                .get(`/trainings/${trainingId}/series`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('не должен получить список серий без токена', async () => {
            const response = await request(app)
                .get(`/trainings/${trainingId}/series`);

            expect(response.status).toBe(401);
        });
    });

    describe('GET /trainings/:trainingId/series/:seriesId', () => {
        let seriesId: number;

        beforeEach(async () => {
            // Создаем тестовую серию
            const seriesData = {
                targetId: 1,
                shots: [
                    { x: 10, y: 10, score: 10 },
                    { x: 9, y: 9, score: 9 },
                    { x: 8, y: 8, score: 8 }
                ]
            };

            const createResponse = await request(app)
                .post(`/trainings/${trainingId}/series`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(seriesData);

            seriesId = createResponse.body.id;
        });

        it('должен получить серию с валидным токеном', async () => {
            const response = await request(app)
                .get(`/trainings/${trainingId}/series/${seriesId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', seriesId);
            expect(response.body.shots).toHaveLength(3);
        });

        it('не должен получить серию без токена', async () => {
            const response = await request(app)
                .get(`/trainings/${trainingId}/series/${seriesId}`);

            expect(response.status).toBe(401);
        });

        it('не должен получить несуществующую серию', async () => {
            const response = await request(app)
                .get(`/trainings/${trainingId}/series/999`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(404);
        });
    });

    describe('PUT /trainings/:trainingId/series/:seriesId', () => {
        let seriesId: number;

        beforeEach(async () => {
            // Создаем тестовую серию
            const seriesData = {
                targetId: 1,
                shots: [
                    { x: 10, y: 10, score: 10 },
                    { x: 9, y: 9, score: 9 },
                    { x: 8, y: 8, score: 8 }
                ]
            };

            const createResponse = await request(app)
                .post(`/trainings/${trainingId}/series`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(seriesData);

            seriesId = createResponse.body.id;
        });

        it('должен обновить серию с валидным токеном тренера', async () => {
            const updateData = {
                targetId: 2,
                shots: [
                    { x: 10, y: 10, score: 10 },
                    { x: 10, y: 10, score: 10 },
                    { x: 10, y: 10, score: 10 }
                ]
            };

            const response = await request(app)
                .put(`/trainings/${trainingId}/series/${seriesId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.targetId).toBe(updateData.targetId);
            expect(response.body.shots).toHaveLength(3);
            expect(response.body.shots[0].score).toBe(10);
        });

        it('не должен обновить серию без токена', async () => {
            const updateData = {
                targetId: 2,
                shots: [
                    { x: 10, y: 10, score: 10 },
                    { x: 10, y: 10, score: 10 },
                    { x: 10, y: 10, score: 10 }
                ]
            };

            const response = await request(app)
                .put(`/trainings/${trainingId}/series/${seriesId}`)
                .send(updateData);

            expect(response.status).toBe(401);
        });

        it('не должен обновить серию с токеном спортсмена', async () => {
            const updateData = {
                targetId: 2,
                shots: [
                    { x: 10, y: 10, score: 10 },
                    { x: 10, y: 10, score: 10 },
                    { x: 10, y: 10, score: 10 }
                ]
            };

            const response = await request(app)
                .put(`/trainings/${trainingId}/series/${seriesId}`)
                .set('Authorization', `Bearer ${athleteAuthToken}`)
                .send(updateData);

            expect(response.status).toBe(403);
        });
    });

    describe('DELETE /trainings/:trainingId/series/:seriesId', () => {
        let seriesId: number;

        beforeEach(async () => {
            // Создаем тестовую серию
            const seriesData = {
                targetId: 1,
                shots: [
                    { x: 10, y: 10, score: 10 },
                    { x: 9, y: 9, score: 9 },
                    { x: 8, y: 8, score: 8 }
                ]
            };

            const createResponse = await request(app)
                .post(`/trainings/${trainingId}/series`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(seriesData);

            seriesId = createResponse.body.id;
        });

        it('должен удалить серию с валидным токеном тренера', async () => {
            const response = await request(app)
                .delete(`/trainings/${trainingId}/series/${seriesId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);

            // Проверяем, что серия действительно удалена
            const getResponse = await request(app)
                .get(`/trainings/${trainingId}/series/${seriesId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(getResponse.status).toBe(404);
        });

        it('не должен удалить серию без токена', async () => {
            const response = await request(app)
                .delete(`/trainings/${trainingId}/series/${seriesId}`);

            expect(response.status).toBe(401);
        });

        it('не должен удалить серию с токеном спортсмена', async () => {
            const response = await request(app)
                .delete(`/trainings/${trainingId}/series/${seriesId}`)
                .set('Authorization', `Bearer ${athleteAuthToken}`);

            expect(response.status).toBe(403);
        });
    });
}); 