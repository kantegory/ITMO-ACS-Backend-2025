import request from 'supertest';
import app from '../../../app';
import { DataSource } from 'typeorm';
import { bootstrap } from '../../../bootstrap';
import { UserTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/user.typeorm.repository';
import { AthleteTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/athlete.typeorm.repository';
import { CoachTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/coach.typeorm.repository';

describe('Тесты интеграции ExerciseController', () => {
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

    describe('POST /exercises', () => {
        it('должен создать упражнение с валидным токеном тренера', async () => {
            const exerciseData = {
                name: 'Тестовое упражнение',
                description: 'Описание тестового упражнения',
                difficulty: 'MEDIUM',
                type: 'STANDARD'
            };

            const response = await request(app)
                .post('/exercises')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(exerciseData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(exerciseData.name);
            expect(response.body.type).toBe(exerciseData.type);
        });

        it('не должен создать упражнение без токена', async () => {
            const exerciseData = {
                name: 'Тестовое упражнение',
                description: 'Описание тестового упражнения',
                difficulty: 'MEDIUM',
                type: 'STANDARD'
            };

            const response = await request(app)
                .post('/exercises')
                .send(exerciseData);

            expect(response.status).toBe(401);
        });

        it('не должен создать упражнение с токеном спортсмена', async () => {
            const exerciseData = {
                name: 'Тестовое упражнение',
                description: 'Описание тестового упражнения',
                difficulty: 'MEDIUM',
                type: 'STANDARD'
            };

            const response = await request(app)
                .post('/exercises')
                .set('Authorization', `Bearer ${athleteAuthToken}`)
                .send(exerciseData);

            expect(response.status).toBe(403);
        });
    });

    describe('GET /exercises', () => {
        beforeEach(async () => {
            // Создаем тестовое упражнение
            const exerciseData = {
                name: 'Тестовое упражнение',
                description: 'Описание тестового упражнения',
                difficulty: 'MEDIUM',
                type: 'STANDARD'
            };

            await request(app)
                .post('/exercises')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(exerciseData);
        });

        it('должен получить список упражнений с валидным токеном', async () => {
            const response = await request(app)
                .get('/exercises')
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('не должен получить список упражнений без токена', async () => {
            const response = await request(app)
                .get('/exercises');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /exercises/:id', () => {
        let exerciseId: number;

        beforeEach(async () => {
            // Создаем тестовое упражнение
            const exerciseData = {
                name: 'Тестовое упражнение',
                description: 'Описание тестового упражнения',
                difficulty: 'MEDIUM',
                type: 'STANDARD'
            };

            const createResponse = await request(app)
                .post('/exercises')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(exerciseData);

            exerciseId = createResponse.body.id;
        });

        it('должен получить упражнение с валидным токеном', async () => {
            const response = await request(app)
                .get(`/exercises/${exerciseId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', exerciseId);
            expect(response.body.name).toBe('Тестовое упражнение');
        });

        it('не должен получить упражнение без токена', async () => {
            const response = await request(app)
                .get(`/exercises/${exerciseId}`);

            expect(response.status).toBe(401);
        });

        it('не должен получить несуществующее упражнение', async () => {
            const response = await request(app)
                .get('/exercises/999')
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(404);
        });
    });

    describe('PUT /exercises/:id', () => {
        let exerciseId: number;

        beforeEach(async () => {
            // Создаем тестовое упражнение
            const exerciseData = {
                name: 'Тестовое упражнение',
                description: 'Описание тестового упражнения',
                difficulty: 'MEDIUM',
                type: 'STANDARD'
            };

            const createResponse = await request(app)
                .post('/exercises')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(exerciseData);

            exerciseId = createResponse.body.id;
        });

        it('должен обновить упражнение с валидным токеном тренера', async () => {
            const updateData = {
                name: 'Обновленное упражнение',
                description: 'Обновленное описание',
                difficulty: 'HARD',
                type: 'CUSTOM'
            };

            const response = await request(app)
                .put(`/exercises/${exerciseId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.name).toBe(updateData.name);
            expect(response.body.difficulty).toBe(updateData.difficulty);
            expect(response.body.type).toBe(updateData.type);
        });

        it('не должен обновить упражнение без токена', async () => {
            const updateData = {
                name: 'Обновленное упражнение',
                description: 'Обновленное описание',
                difficulty: 'HARD',
                type: 'CUSTOM'
            };

            const response = await request(app)
                .put(`/exercises/${exerciseId}`)
                .send(updateData);

            expect(response.status).toBe(401);
        });

        it('не должен обновить упражнение с токеном спортсмена', async () => {
            const updateData = {
                name: 'Обновленное упражнение',
                description: 'Обновленное описание',
                difficulty: 'HARD',
                type: 'CUSTOM'
            };

            const response = await request(app)
                .put(`/exercises/${exerciseId}`)
                .set('Authorization', `Bearer ${athleteAuthToken}`)
                .send(updateData);

            expect(response.status).toBe(403);
        });
    });

    describe('DELETE /exercises/:id', () => {
        let exerciseId: number;

        beforeEach(async () => {
            // Создаем тестовое упражнение
            const exerciseData = {
                name: 'Тестовое упражнение',
                description: 'Описание тестового упражнения',
                difficulty: 'MEDIUM',
                type: 'STANDARD'
            };

            const createResponse = await request(app)
                .post('/exercises')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(exerciseData);

            exerciseId = createResponse.body.id;
        });

        it('должен удалить упражнение с валидным токеном тренера', async () => {
            const response = await request(app)
                .delete(`/exercises/${exerciseId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);

            // Проверяем, что упражнение действительно удалено
            const getResponse = await request(app)
                .get(`/exercises/${exerciseId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(getResponse.status).toBe(404);
        });

        it('не должен удалить упражнение без токена', async () => {
            const response = await request(app)
                .delete(`/exercises/${exerciseId}`);

            expect(response.status).toBe(401);
        });

        it('не должен удалить упражнение с токеном спортсмена', async () => {
            const response = await request(app)
                .delete(`/exercises/${exerciseId}`)
                .set('Authorization', `Bearer ${athleteAuthToken}`);

            expect(response.status).toBe(403);
        });
    });
}); 