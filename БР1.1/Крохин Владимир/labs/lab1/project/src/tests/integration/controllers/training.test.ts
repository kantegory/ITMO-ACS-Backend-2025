import request from 'supertest';
import app from '../../../app';
import { DataSource } from 'typeorm';
import { bootstrap } from '../../../bootstrap';
import { UserTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/user.typeorm.repository';
import { AthleteTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/athlete.typeorm.repository';
import { CoachTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/coach.typeorm.repository';

describe('Тесты интеграции TrainingController', () => {
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

    describe('POST /trainings', () => {
        it('должен создать тренировку с валидным токеном тренера', async () => {
            const trainingData = {
                title: 'Тестовая тренировка',
                description: 'Описание тестовой тренировки',
                date: new Date().toISOString(),
                duration: 60,
                type: 'QUALIFICATION'
            };

            const response = await request(app)
                .post('/trainings')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(trainingData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe(trainingData.title);
        });

        it('не должен создать тренировку без токена', async () => {
            const trainingData = {
                title: 'Тестовая тренировка',
                description: 'Описание тестовой тренировки',
                date: new Date().toISOString(),
                duration: 60,
                type: 'QUALIFICATION'
            };

            const response = await request(app)
                .post('/trainings')
                .send(trainingData);

            expect(response.status).toBe(401);
        });

        it('не должен создать тренировку с токеном спортсмена', async () => {
            const trainingData = {
                title: 'Тестовая тренировка',
                description: 'Описание тестовой тренировки',
                date: new Date().toISOString(),
                duration: 60,
                type: 'QUALIFICATION'
            };

            const response = await request(app)
                .post('/trainings')
                .set('Authorization', `Bearer ${athleteAuthToken}`)
                .send(trainingData);

            expect(response.status).toBe(403);
        });
    });

    describe('GET /trainings/:id', () => {
        let trainingId: number;

        beforeEach(async () => {
            // Создаем тестовую тренировку
            const trainingData = {
                title: 'Тестовая тренировка',
                description: 'Описание тестовой тренировки',
                date: new Date().toISOString(),
                duration: 60,
                type: 'QUALIFICATION'
            };

            const createResponse = await request(app)
                .post('/trainings')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(trainingData);

            trainingId = createResponse.body.id;
        });

        it('должен получить тренировку с валидным токеном', async () => {
            const response = await request(app)
                .get(`/trainings/${trainingId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', trainingId);
            expect(response.body.title).toBe('Тестовая тренировка');
        });

        it('не должен получить тренировку без токена', async () => {
            const response = await request(app)
                .get(`/trainings/${trainingId}`);

            expect(response.status).toBe(401);
        });

        it('не должен получить несуществующую тренировку', async () => {
            const response = await request(app)
                .get('/trainings/999')
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(404);
        });
    });

    describe('PUT /trainings/:id', () => {
        let trainingId: number;

        beforeEach(async () => {
            // Создаем тестовую тренировку
            const trainingData = {
                title: 'Тестовая тренировка',
                description: 'Описание тестовой тренировки',
                date: new Date().toISOString(),
                duration: 60,
                type: 'QUALIFICATION'
            };

            const createResponse = await request(app)
                .post('/trainings')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(trainingData);

            trainingId = createResponse.body.id;
        });

        it('должен обновить тренировку с валидным токеном тренера', async () => {
            const updateData = {
                title: 'Обновленная тренировка',
                description: 'Обновленное описание',
                date: new Date().toISOString(),
                duration: 90,
                type: 'QUALIFICATION'
            };

            const response = await request(app)
                .put(`/trainings/${trainingId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.title).toBe(updateData.title);
            expect(response.body.description).toBe(updateData.description);
        });

        it('не должен обновить тренировку без токена', async () => {
            const updateData = {
                title: 'Обновленная тренировка',
                description: 'Обновленное описание',
                date: new Date().toISOString(),
                duration: 90,
                type: 'QUALIFICATION'
            };

            const response = await request(app)
                .put(`/trainings/${trainingId}`)
                .send(updateData);

            expect(response.status).toBe(401);
        });

        it('не должен обновить тренировку с токеном спортсмена', async () => {
            const updateData = {
                title: 'Обновленная тренировка',
                description: 'Обновленное описание',
                date: new Date().toISOString(),
                duration: 90,
                type: 'QUALIFICATION'
            };

            const response = await request(app)
                .put(`/trainings/${trainingId}`)
                .set('Authorization', `Bearer ${athleteAuthToken}`)
                .send(updateData);

            expect(response.status).toBe(403);
        });
    });

    describe('DELETE /trainings/:id', () => {
        let trainingId: number;

        beforeEach(async () => {
            // Создаем тестовую тренировку
            const trainingData = {
                title: 'Тестовая тренировка',
                description: 'Описание тестовой тренировки',
                date: new Date().toISOString(),
                duration: 60,
                type: 'QUALIFICATION'
            };

            const createResponse = await request(app)
                .post('/trainings')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(trainingData);

            trainingId = createResponse.body.id;
        });

        it('должен удалить тренировку с валидным токеном тренера', async () => {
            const response = await request(app)
                .delete(`/trainings/${trainingId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);

            // Проверяем, что тренировка действительно удалена
            const getResponse = await request(app)
                .get(`/trainings/${trainingId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(getResponse.status).toBe(404);
        });

        it('не должен удалить тренировку без токена', async () => {
            const response = await request(app)
                .delete(`/trainings/${trainingId}`);

            expect(response.status).toBe(401);
        });

        it('не должен удалить тренировку с токеном спортсмена', async () => {
            const response = await request(app)
                .delete(`/trainings/${trainingId}`)
                .set('Authorization', `Bearer ${athleteAuthToken}`);

            expect(response.status).toBe(403);
        });
    });
}); 