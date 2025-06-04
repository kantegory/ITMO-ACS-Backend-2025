import request from 'supertest';
import app from '../../../app';
import { DataSource } from 'typeorm';
import { bootstrap } from '../../../bootstrap';
import { UserTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/user.typeorm.repository';
import { AthleteTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/athlete.typeorm.repository';
import { CoachTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/coach.typeorm.repository';

describe('Тесты интеграции ShotController', () => {
    let dataSource: DataSource;
    let userRepository: UserTypeOrmRepository;
    let athleteRepository: AthleteTypeOrmRepository;
    let coachRepository: CoachTypeOrmRepository;
    let coachAuthToken: string;
    let athleteAuthToken: string;
    let seriesId: number;

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

        const trainingId = createTrainingResponse.body.id;

        // Создаем тестовую серию
        const seriesData = {
            targetId: 1,
            shots: []
        };

        const createSeriesResponse = await request(app)
            .post(`/trainings/${trainingId}/series`)
            .set('Authorization', `Bearer ${coachAuthToken}`)
            .send(seriesData);

        seriesId = createSeriesResponse.body.id;
    });

    describe('POST /series/:seriesId/shots', () => {
        it('должен создать выстрел с валидным токеном тренера', async () => {
            const shotData = {
                x: 10,
                y: 10,
                score: 10
            };

            const response = await request(app)
                .post(`/series/${seriesId}/shots`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(shotData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.x).toBe(shotData.x);
            expect(response.body.y).toBe(shotData.y);
            expect(response.body.score).toBe(shotData.score);
        });

        it('не должен создать выстрел без токена', async () => {
            const shotData = {
                x: 10,
                y: 10,
                score: 10
            };

            const response = await request(app)
                .post(`/series/${seriesId}/shots`)
                .send(shotData);

            expect(response.status).toBe(401);
        });

        it('не должен создать выстрел с токеном спортсмена', async () => {
            const shotData = {
                x: 10,
                y: 10,
                score: 10
            };

            const response = await request(app)
                .post(`/series/${seriesId}/shots`)
                .set('Authorization', `Bearer ${athleteAuthToken}`)
                .send(shotData);

            expect(response.status).toBe(403);
        });
    });

    describe('GET /series/:seriesId/shots', () => {
        beforeEach(async () => {
            // Создаем тестовый выстрел
            const shotData = {
                x: 10,
                y: 10,
                score: 10
            };

            await request(app)
                .post(`/series/${seriesId}/shots`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(shotData);
        });

        it('должен получить список выстрелов с валидным токеном', async () => {
            const response = await request(app)
                .get(`/series/${seriesId}/shots`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('не должен получить список выстрелов без токена', async () => {
            const response = await request(app)
                .get(`/series/${seriesId}/shots`);

            expect(response.status).toBe(401);
        });
    });

    describe('GET /series/:seriesId/shots/:shotId', () => {
        let shotId: number;

        beforeEach(async () => {
            // Создаем тестовый выстрел
            const shotData = {
                x: 10,
                y: 10,
                score: 10
            };

            const createResponse = await request(app)
                .post(`/series/${seriesId}/shots`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(shotData);

            shotId = createResponse.body.id;
        });

        it('должен получить выстрел с валидным токеном', async () => {
            const response = await request(app)
                .get(`/series/${seriesId}/shots/${shotId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', shotId);
            expect(response.body.x).toBe(10);
            expect(response.body.y).toBe(10);
            expect(response.body.score).toBe(10);
        });

        it('не должен получить выстрел без токена', async () => {
            const response = await request(app)
                .get(`/series/${seriesId}/shots/${shotId}`);

            expect(response.status).toBe(401);
        });

        it('не должен получить несуществующий выстрел', async () => {
            const response = await request(app)
                .get(`/series/${seriesId}/shots/999`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(404);
        });
    });

    describe('PUT /series/:seriesId/shots/:shotId', () => {
        let shotId: number;

        beforeEach(async () => {
            // Создаем тестовый выстрел
            const shotData = {
                x: 10,
                y: 10,
                score: 10
            };

            const createResponse = await request(app)
                .post(`/series/${seriesId}/shots`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(shotData);

            shotId = createResponse.body.id;
        });

        it('должен обновить выстрел с валидным токеном тренера', async () => {
            const updateData = {
                x: 9,
                y: 9,
                score: 9
            };

            const response = await request(app)
                .put(`/series/${seriesId}/shots/${shotId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.x).toBe(updateData.x);
            expect(response.body.y).toBe(updateData.y);
            expect(response.body.score).toBe(updateData.score);
        });

        it('не должен обновить выстрел без токена', async () => {
            const updateData = {
                x: 9,
                y: 9,
                score: 9
            };

            const response = await request(app)
                .put(`/series/${seriesId}/shots/${shotId}`)
                .send(updateData);

            expect(response.status).toBe(401);
        });

        it('не должен обновить выстрел с токеном спортсмена', async () => {
            const updateData = {
                x: 9,
                y: 9,
                score: 9
            };

            const response = await request(app)
                .put(`/series/${seriesId}/shots/${shotId}`)
                .set('Authorization', `Bearer ${athleteAuthToken}`)
                .send(updateData);

            expect(response.status).toBe(403);
        });
    });

    describe('DELETE /series/:seriesId/shots/:shotId', () => {
        let shotId: number;

        beforeEach(async () => {
            // Создаем тестовый выстрел
            const shotData = {
                x: 10,
                y: 10,
                score: 10
            };

            const createResponse = await request(app)
                .post(`/series/${seriesId}/shots`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(shotData);

            shotId = createResponse.body.id;
        });

        it('должен удалить выстрел с валидным токеном тренера', async () => {
            const response = await request(app)
                .delete(`/series/${seriesId}/shots/${shotId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);

            // Проверяем, что выстрел действительно удален
            const getResponse = await request(app)
                .get(`/series/${seriesId}/shots/${shotId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(getResponse.status).toBe(404);
        });

        it('не должен удалить выстрел без токена', async () => {
            const response = await request(app)
                .delete(`/series/${seriesId}/shots/${shotId}`);

            expect(response.status).toBe(401);
        });

        it('не должен удалить выстрел с токеном спортсмена', async () => {
            const response = await request(app)
                .delete(`/series/${seriesId}/shots/${shotId}`)
                .set('Authorization', `Bearer ${athleteAuthToken}`);

            expect(response.status).toBe(403);
        });
    });
}); 