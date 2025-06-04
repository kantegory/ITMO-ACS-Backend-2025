import request from 'supertest';
import app from '../../../app';
import { DataSource } from 'typeorm';
import { bootstrap } from '../../../bootstrap';
import { UserTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/user.typeorm.repository';
import { AthleteTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/athlete.typeorm.repository';
import { CoachTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/coach.typeorm.repository';

describe('Тесты интеграции TargetController', () => {
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

    describe('POST /targets', () => {
        it('должен создать мишень с валидным токеном тренера', async () => {
            const targetData = {
                name: 'Тестовая мишень',
                description: 'Описание тестовой мишени',
                type: 'STANDARD',
                difficulty: 'MEDIUM'
            };

            const response = await request(app)
                .post('/targets')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(targetData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(targetData.name);
            expect(response.body.type).toBe(targetData.type);
        });

        it('не должен создать мишень без токена', async () => {
            const targetData = {
                name: 'Тестовая мишень',
                description: 'Описание тестовой мишени',
                type: 'STANDARD',
                difficulty: 'MEDIUM'
            };

            const response = await request(app)
                .post('/targets')
                .send(targetData);

            expect(response.status).toBe(401);
        });

        it('не должен создать мишень с токеном спортсмена', async () => {
            const targetData = {
                name: 'Тестовая мишень',
                description: 'Описание тестовой мишени',
                type: 'STANDARD',
                difficulty: 'MEDIUM'
            };

            const response = await request(app)
                .post('/targets')
                .set('Authorization', `Bearer ${athleteAuthToken}`)
                .send(targetData);

            expect(response.status).toBe(403);
        });
    });

    describe('GET /targets', () => {
        beforeEach(async () => {
            // Создаем тестовую мишень
            const targetData = {
                name: 'Тестовая мишень',
                description: 'Описание тестовой мишени',
                type: 'STANDARD',
                difficulty: 'MEDIUM'
            };

            await request(app)
                .post('/targets')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(targetData);
        });

        it('должен получить список мишеней с валидным токеном', async () => {
            const response = await request(app)
                .get('/targets')
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('не должен получить список мишеней без токена', async () => {
            const response = await request(app)
                .get('/targets');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /targets/:id', () => {
        let targetId: number;

        beforeEach(async () => {
            // Создаем тестовую мишень
            const targetData = {
                name: 'Тестовая мишень',
                description: 'Описание тестовой мишени',
                type: 'STANDARD',
                difficulty: 'MEDIUM'
            };

            const createResponse = await request(app)
                .post('/targets')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(targetData);

            targetId = createResponse.body.id;
        });

        it('должен получить мишень с валидным токеном', async () => {
            const response = await request(app)
                .get(`/targets/${targetId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', targetId);
            expect(response.body.name).toBe('Тестовая мишень');
            expect(response.body.type).toBe('STANDARD');
        });

        it('не должен получить мишень без токена', async () => {
            const response = await request(app)
                .get(`/targets/${targetId}`);

            expect(response.status).toBe(401);
        });

        it('не должен получить несуществующую мишень', async () => {
            const response = await request(app)
                .get('/targets/999')
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(404);
        });
    });

    describe('PUT /targets/:id', () => {
        let targetId: number;

        beforeEach(async () => {
            // Создаем тестовую мишень
            const targetData = {
                name: 'Тестовая мишень',
                description: 'Описание тестовой мишени',
                type: 'STANDARD',
                difficulty: 'MEDIUM'
            };

            const createResponse = await request(app)
                .post('/targets')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(targetData);

            targetId = createResponse.body.id;
        });

        it('должен обновить мишень с валидным токеном тренера', async () => {
            const updateData = {
                name: 'Обновленная мишень',
                description: 'Обновленное описание',
                type: 'CUSTOM',
                difficulty: 'HARD'
            };

            const response = await request(app)
                .put(`/targets/${targetId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.name).toBe(updateData.name);
            expect(response.body.type).toBe(updateData.type);
            expect(response.body.difficulty).toBe(updateData.difficulty);
        });

        it('не должен обновить мишень без токена', async () => {
            const updateData = {
                name: 'Обновленная мишень',
                description: 'Обновленное описание',
                type: 'CUSTOM',
                difficulty: 'HARD'
            };

            const response = await request(app)
                .put(`/targets/${targetId}`)
                .send(updateData);

            expect(response.status).toBe(401);
        });

        it('не должен обновить мишень с токеном спортсмена', async () => {
            const updateData = {
                name: 'Обновленная мишень',
                description: 'Обновленное описание',
                type: 'CUSTOM',
                difficulty: 'HARD'
            };

            const response = await request(app)
                .put(`/targets/${targetId}`)
                .set('Authorization', `Bearer ${athleteAuthToken}`)
                .send(updateData);

            expect(response.status).toBe(403);
        });
    });

    describe('DELETE /targets/:id', () => {
        let targetId: number;

        beforeEach(async () => {
            // Создаем тестовую мишень
            const targetData = {
                name: 'Тестовая мишень',
                description: 'Описание тестовой мишени',
                type: 'STANDARD',
                difficulty: 'MEDIUM'
            };

            const createResponse = await request(app)
                .post('/targets')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(targetData);

            targetId = createResponse.body.id;
        });

        it('должен удалить мишень с валидным токеном тренера', async () => {
            const response = await request(app)
                .delete(`/targets/${targetId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);

            // Проверяем, что мишень действительно удалена
            const getResponse = await request(app)
                .get(`/targets/${targetId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(getResponse.status).toBe(404);
        });

        it('не должен удалить мишень без токена', async () => {
            const response = await request(app)
                .delete(`/targets/${targetId}`);

            expect(response.status).toBe(401);
        });

        it('не должен удалить мишень с токеном спортсмена', async () => {
            const response = await request(app)
                .delete(`/targets/${targetId}`)
                .set('Authorization', `Bearer ${athleteAuthToken}`);

            expect(response.status).toBe(403);
        });
    });
}); 