import request from 'supertest';
import { app } from '../../../app';
import { DataSource } from 'typeorm';
import { bootstrap } from '../../../bootstrap';
import { UserTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/user.typeorm.repository';
import { AthleteTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/athlete.typeorm.repository';
import { CoachTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/coach.typeorm.repository';

describe('Тесты интеграции QualificationTrainingController', () => {
    let dataSource: DataSource;
    let userRepository: UserTypeOrmRepository;
    let athleteRepository: AthleteTypeOrmRepository;
    let coachRepository: CoachTypeOrmRepository;
    let coachAuthToken: string;
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
    });

    describe('POST /qualification-trainings', () => {
        it('должен создать квалификационную тренировку с валидным токеном тренера', async () => {
            const trainingData = {
                date: new Date().toISOString(),
                description: 'Test qualification training',
                athleteId: 1,
                qualificationType: 'MS',
                result: 95.5
            };

            const response = await request(app)
                .post('/qualification-trainings')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(trainingData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.description).toBe(trainingData.description);
            expect(response.body.qualificationType).toBe(trainingData.qualificationType);
            expect(response.body.result).toBe(trainingData.result);
        });

        it('не должен создать квалификационную тренировку без токена', async () => {
            const trainingData = {
                date: new Date().toISOString(),
                description: 'Test qualification training',
                athleteId: 1,
                qualificationType: 'MS',
                result: 95.5
            };

            const response = await request(app)
                .post('/qualification-trainings')
                .send(trainingData);

            expect(response.status).toBe(401);
        });

        it('не должен создать квалификационную тренировку с токеном спортсмена', async () => {
            const trainingData = {
                date: new Date().toISOString(),
                description: 'Test qualification training',
                athleteId: 1,
                qualificationType: 'MS',
                result: 95.5
            };

            const response = await request(app)
                .post('/qualification-trainings')
                .set('Authorization', `Bearer ${athleteAuthToken}`)
                .send(trainingData);

            expect(response.status).toBe(403);
        });
    });

    describe('GET /qualification-trainings', () => {
        it('должен получить список квалификационных тренировок с валидным токеном', async () => {
            const response = await request(app)
                .get('/qualification-trainings')
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('не должен получить список квалификационных тренировок без токена', async () => {
            const response = await request(app)
                .get('/qualification-trainings');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /qualification-trainings/:id', () => {
        let trainingId: number;

        beforeEach(async () => {
            // Создаем тестовую тренировку
            const trainingData = {
                date: new Date().toISOString(),
                description: 'Test qualification training',
                athleteId: 1,
                qualificationType: 'MS',
                result: 95.5
            };

            const createResponse = await request(app)
                .post('/qualification-trainings')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(trainingData);

            trainingId = createResponse.body.id;
        });

        it('должен получить квалификационную тренировку с валидным токеном', async () => {
            const response = await request(app)
                .get(`/qualification-trainings/${trainingId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', trainingId);
        });

        it('не должен получить квалификационную тренировку без токена', async () => {
            const response = await request(app)
                .get(`/qualification-trainings/${trainingId}`);

            expect(response.status).toBe(401);
        });

        it('не должен получить несуществующую квалификационную тренировку', async () => {
            const response = await request(app)
                .get('/qualification-trainings/999')
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(404);
        });
    });

    describe('PUT /qualification-trainings/:id', () => {
        let trainingId: number;

        beforeEach(async () => {
            // Создаем тестовую тренировку
            const trainingData = {
                date: new Date().toISOString(),
                description: 'Test qualification training',
                athleteId: 1,
                qualificationType: 'MS',
                result: 95.5
            };

            const createResponse = await request(app)
                .post('/qualification-trainings')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(trainingData);

            trainingId = createResponse.body.id;
        });

        it('должен обновить квалификационную тренировку с валидным токеном тренера', async () => {
            const updateData = {
                description: 'Updated qualification training',
                result: 96.0
            };

            const response = await request(app)
                .put(`/qualification-trainings/${trainingId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.description).toBe(updateData.description);
            expect(response.body.result).toBe(updateData.result);
        });

        it('не должен обновить квалификационную тренировку без токена', async () => {
            const updateData = {
                description: 'Updated qualification training',
                result: 96.0
            };

            const response = await request(app)
                .put(`/qualification-trainings/${trainingId}`)
                .send(updateData);

            expect(response.status).toBe(401);
        });

        it('не должен обновить квалификационную тренировку с токеном спортсмена', async () => {
            const updateData = {
                description: 'Updated qualification training',
                result: 96.0
            };

            const response = await request(app)
                .put(`/qualification-trainings/${trainingId}`)
                .set('Authorization', `Bearer ${athleteAuthToken}`)
                .send(updateData);

            expect(response.status).toBe(403);
        });
    });

    describe('DELETE /qualification-trainings/:id', () => {
        let trainingId: number;

        beforeEach(async () => {
            // Создаем тестовую тренировку
            const trainingData = {
                date: new Date().toISOString(),
                description: 'Test qualification training',
                athleteId: 1,
                qualificationType: 'MS',
                result: 95.5
            };

            const createResponse = await request(app)
                .post('/qualification-trainings')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(trainingData);

            trainingId = createResponse.body.id;
        });

        it('должен удалить квалификационную тренировку с валидным токеном тренера', async () => {
            const response = await request(app)
                .delete(`/qualification-trainings/${trainingId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);

            // Проверяем, что тренировка действительно удалена
            const getResponse = await request(app)
                .get(`/qualification-trainings/${trainingId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(getResponse.status).toBe(404);
        });

        it('не должен удалить квалификационную тренировку без токена', async () => {
            const response = await request(app)
                .delete(`/qualification-trainings/${trainingId}`);

            expect(response.status).toBe(401);
        });

        it('не должен удалить квалификационную тренировку с токеном спортсмена', async () => {
            const response = await request(app)
                .delete(`/qualification-trainings/${trainingId}`)
                .set('Authorization', `Bearer ${athleteAuthToken}`);

            expect(response.status).toBe(403);
        });
    });
}); 