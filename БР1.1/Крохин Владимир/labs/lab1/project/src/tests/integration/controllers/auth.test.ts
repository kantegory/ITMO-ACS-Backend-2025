import request from 'supertest';
import app from '../../../app';
import { DataSource } from 'typeorm';
import { bootstrap } from '../../../bootstrap';
import { UserModel } from '../../../application/domain/user.model';
import { UserTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/user.typeorm.repository';
import { AthleteTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/athlete.typeorm.repository';
import { CoachTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/coach.typeorm.repository';

describe('Тесты интеграции AuthController', () => {
    let dataSource: DataSource;
    let userRepository: UserTypeOrmRepository;
    let athleteRepository: AthleteTypeOrmRepository;
    let coachRepository: CoachTypeOrmRepository;

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
    });

    describe('POST /auth/register', () => {
        it('должен зарегистрировать нового пользователя', async () => {
            const userData = {
                username: 'testuser',
                password: 'password123',
                email: 'test@example.com',
                firstName: 'Test',
                lastName: 'User'
            };

            const response = await request(app)
                .post('/auth/register')
                .send(userData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.username).toBe(userData.username);
            expect(response.body.email).toBe(userData.email);
            expect(response.body).not.toHaveProperty('password');
        });

        it('не должен регистрировать пользователя с существующим именем', async () => {
            const userData = {
                username: 'testuser',
                password: 'password123',
                email: 'test@example.com',
                firstName: 'Test',
                lastName: 'User'
            };

            // Сначала регистрируем пользователя
            await request(app)
                .post('/auth/register')
                .send(userData);

            // Пытаемся зарегистрировать пользователя с тем же username
            const response = await request(app)
                .post('/auth/register')
                .send(userData);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
        });
    });

    describe('POST /auth/login', () => {
        beforeEach(async () => {
            // Создаем тестового пользователя
            const userData = {
                username: 'testuser',
                password: 'password123',
                email: 'test@example.com',
                firstName: 'Test',
                lastName: 'User'
            };

            await request(app)
                .post('/auth/register')
                .send(userData);
        });

        it('должен войти с правильными учетными данными', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    username: 'testuser',
                    password: 'password123'
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('user');
            expect(response.body.user.username).toBe('testuser');
        });

        it('не должен войти с неправильным паролем', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    username: 'testuser',
                    password: 'wrongpassword'
                });

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message');
        });
    });

    describe('GET /auth/profile', () => {
        let authToken: string;

        beforeEach(async () => {
            // Создаем тестового пользователя и получаем токен
            const userData = {
                username: 'testuser',
                password: 'password123',
                email: 'test@example.com',
                firstName: 'Test',
                lastName: 'User'
            };

            await request(app)
                .post('/auth/register')
                .send(userData);

            const loginResponse = await request(app)
                .post('/auth/login')
                .send({
                    username: 'testuser',
                    password: 'password123'
                });

            authToken = loginResponse.body.token;
        });

        it('должен получить профиль пользователя с валидным токеном', async () => {
            const response = await request(app)
                .get('/auth/profile')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id');
            expect(response.body.username).toBe('testuser');
            expect(response.body.email).toBe('test@example.com');
        });

        it('не должен получить профиль без токена', async () => {
            const response = await request(app)
                .get('/auth/profile');

            expect(response.status).toBe(401);
        });

        it('не должен получить профиль с невалидным токеном', async () => {
            const response = await request(app)
                .get('/auth/profile')
                .set('Authorization', 'Bearer invalidtoken');

            expect(response.status).toBe(401);
        });
    });

    describe('PUT /auth/email', () => {
        let authToken: string;

        beforeEach(async () => {
            // Создаем тестового пользователя и получаем токен
            const userData = {
                username: 'testuser',
                password: 'password123',
                email: 'test@example.com',
                firstName: 'Test',
                lastName: 'User'
            };

            await request(app)
                .post('/auth/register')
                .send(userData);

            const loginResponse = await request(app)
                .post('/auth/login')
                .send({
                    username: 'testuser',
                    password: 'password123'
                });

            authToken = loginResponse.body.token;
        });

        it('должен обновить email с валидным токеном', async () => {
            const response = await request(app)
                .put('/auth/email')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    email: 'newemail@example.com'
                });

            expect(response.status).toBe(200);
            expect(response.body.email).toBe('newemail@example.com');
        });

        it('не должен обновить email с невалидным форматом', async () => {
            const response = await request(app)
                .put('/auth/email')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    email: 'invalidemail'
                });

            expect(response.status).toBe(400);
        });
    });

    describe('PUT /auth/name', () => {
        let authToken: string;

        beforeEach(async () => {
            // Создаем тестового пользователя и получаем токен
            const userData = {
                username: 'testuser',
                password: 'password123',
                email: 'test@example.com',
                firstName: 'Test',
                lastName: 'User'
            };

            await request(app)
                .post('/auth/register')
                .send(userData);

            const loginResponse = await request(app)
                .post('/auth/login')
                .send({
                    username: 'testuser',
                    password: 'password123'
                });

            authToken = loginResponse.body.token;
        });

        it('должен обновить имя с валидным токеном', async () => {
            const response = await request(app)
                .put('/auth/name')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    firstName: 'NewFirst',
                    lastName: 'NewLast'
                });

            expect(response.status).toBe(200);
            expect(response.body.firstName).toBe('NewFirst');
            expect(response.body.lastName).toBe('NewLast');
        });

        it('не должен обновить имя с пустыми полями', async () => {
            const response = await request(app)
                .put('/auth/name')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    firstName: '',
                    lastName: ''
                });

            expect(response.status).toBe(400);
        });
    });
}); 