import request from 'supertest';
import app from '../../../app';
import { DataSource } from 'typeorm';
import { bootstrap } from '../../../bootstrap';
import { UserTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/user.typeorm.repository';
import { AthleteTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/athlete.typeorm.repository';
import { CoachTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/coach.typeorm.repository';

describe('Тесты интеграции UserController', () => {
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

    describe('GET /users', () => {
        it('должен получить список пользователей с валидным токеном тренера', async () => {
            const response = await request(app)
                .get('/users')
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('не должен получить список пользователей без токена', async () => {
            const response = await request(app)
                .get('/users');

            expect(response.status).toBe(401);
        });

        it('не должен получить список пользователей с токеном спортсмена', async () => {
            const response = await request(app)
                .get('/users')
                .set('Authorization', `Bearer ${athleteAuthToken}`);

            expect(response.status).toBe(403);
        });
    });

    describe('GET /users/:id', () => {
        let userId: number;

        beforeEach(async () => {
            // Получаем ID пользователя
            const response = await request(app)
                .get('/users')
                .set('Authorization', `Bearer ${coachAuthToken}`);

            userId = response.body[0].id;
        });

        it('должен получить пользователя с валидным токеном тренера', async () => {
            const response = await request(app)
                .get(`/users/${userId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', userId);
        });

        it('не должен получить пользователя без токена', async () => {
            const response = await request(app)
                .get(`/users/${userId}`);

            expect(response.status).toBe(401);
        });

        it('не должен получить пользователя с токеном спортсмена', async () => {
            const response = await request(app)
                .get(`/users/${userId}`)
                .set('Authorization', `Bearer ${athleteAuthToken}`);

            expect(response.status).toBe(403);
        });

        it('не должен получить несуществующего пользователя', async () => {
            const response = await request(app)
                .get('/users/999')
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(404);
        });
    });

    describe('PUT /users/:id', () => {
        let userId: number;

        beforeEach(async () => {
            // Получаем ID пользователя
            const response = await request(app)
                .get('/users')
                .set('Authorization', `Bearer ${coachAuthToken}`);

            userId = response.body[0].id;
        });

        it('должен обновить пользователя с валидным токеном тренера', async () => {
            const updateData = {
                firstName: 'Updated',
                lastName: 'User',
                email: 'updated@example.com'
            };

            const response = await request(app)
                .put(`/users/${userId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.firstName).toBe(updateData.firstName);
            expect(response.body.lastName).toBe(updateData.lastName);
            expect(response.body.email).toBe(updateData.email);
        });

        it('не должен обновить пользователя без токена', async () => {
            const updateData = {
                firstName: 'Updated',
                lastName: 'User',
                email: 'updated@example.com'
            };

            const response = await request(app)
                .put(`/users/${userId}`)
                .send(updateData);

            expect(response.status).toBe(401);
        });

        it('не должен обновить пользователя с токеном спортсмена', async () => {
            const updateData = {
                firstName: 'Updated',
                lastName: 'User',
                email: 'updated@example.com'
            };

            const response = await request(app)
                .put(`/users/${userId}`)
                .set('Authorization', `Bearer ${athleteAuthToken}`)
                .send(updateData);

            expect(response.status).toBe(403);
        });
    });

    describe('DELETE /users/:id', () => {
        let userId: number;

        beforeEach(async () => {
            // Получаем ID пользователя
            const response = await request(app)
                .get('/users')
                .set('Authorization', `Bearer ${coachAuthToken}`);

            userId = response.body[0].id;
        });

        it('должен удалить пользователя с валидным токеном тренера', async () => {
            const response = await request(app)
                .delete(`/users/${userId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);

            // Проверяем, что пользователь действительно удален
            const getResponse = await request(app)
                .get(`/users/${userId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(getResponse.status).toBe(404);
        });

        it('не должен удалить пользователя без токена', async () => {
            const response = await request(app)
                .delete(`/users/${userId}`);

            expect(response.status).toBe(401);
        });

        it('не должен удалить пользователя с токеном спортсмена', async () => {
            const response = await request(app)
                .delete(`/users/${userId}`)
                .set('Authorization', `Bearer ${athleteAuthToken}`);

            expect(response.status).toBe(403);
        });
    });
}); 