import request from 'supertest';
import { app } from '../../../app';
import { DataSource } from 'typeorm';
import { bootstrap } from '../../../bootstrap';
import { UserTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/user.typeorm.repository';
import { AthleteTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/athlete.typeorm.repository';
import { CoachTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/coach.typeorm.repository';

describe('Тесты интеграции WeaponTypeController', () => {
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

    describe('POST /weapon-types', () => {
        it('должен создать тип оружия с валидным токеном тренера', async () => {
            const weaponTypeData = {
                name: 'Pistol',
                description: 'Standard pistol'
            };

            const response = await request(app)
                .post('/weapon-types')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(weaponTypeData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(weaponTypeData.name);
            expect(response.body.description).toBe(weaponTypeData.description);
        });

        it('не должен создать тип оружия без токена', async () => {
            const weaponTypeData = {
                name: 'Pistol',
                description: 'Standard pistol'
            };

            const response = await request(app)
                .post('/weapon-types')
                .send(weaponTypeData);

            expect(response.status).toBe(401);
        });

        it('не должен создать тип оружия с токеном спортсмена', async () => {
            const weaponTypeData = {
                name: 'Pistol',
                description: 'Standard pistol'
            };

            const response = await request(app)
                .post('/weapon-types')
                .set('Authorization', `Bearer ${athleteAuthToken}`)
                .send(weaponTypeData);

            expect(response.status).toBe(403);
        });
    });

    describe('GET /weapon-types', () => {
        it('должен получить список типов оружия с валидным токеном', async () => {
            const response = await request(app)
                .get('/weapon-types')
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('не должен получить список типов оружия без токена', async () => {
            const response = await request(app)
                .get('/weapon-types');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /weapon-types/:id', () => {
        let weaponTypeId: number;

        beforeEach(async () => {
            // Создаем тестовый тип оружия
            const weaponTypeData = {
                name: 'Pistol',
                description: 'Standard pistol'
            };

            const createResponse = await request(app)
                .post('/weapon-types')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(weaponTypeData);

            weaponTypeId = createResponse.body.id;
        });

        it('должен получить тип оружия с валидным токеном', async () => {
            const response = await request(app)
                .get(`/weapon-types/${weaponTypeId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', weaponTypeId);
        });

        it('не должен получить тип оружия без токена', async () => {
            const response = await request(app)
                .get(`/weapon-types/${weaponTypeId}`);

            expect(response.status).toBe(401);
        });

        it('не должен получить несуществующий тип оружия', async () => {
            const response = await request(app)
                .get('/weapon-types/999')
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(404);
        });
    });

    describe('PUT /weapon-types/:id', () => {
        let weaponTypeId: number;

        beforeEach(async () => {
            // Создаем тестовый тип оружия
            const weaponTypeData = {
                name: 'Pistol',
                description: 'Standard pistol'
            };

            const createResponse = await request(app)
                .post('/weapon-types')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(weaponTypeData);

            weaponTypeId = createResponse.body.id;
        });

        it('должен обновить тип оружия с валидным токеном тренера', async () => {
            const updateData = {
                name: 'Updated Pistol',
                description: 'Updated standard pistol'
            };

            const response = await request(app)
                .put(`/weapon-types/${weaponTypeId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.name).toBe(updateData.name);
            expect(response.body.description).toBe(updateData.description);
        });

        it('не должен обновить тип оружия без токена', async () => {
            const updateData = {
                name: 'Updated Pistol',
                description: 'Updated standard pistol'
            };

            const response = await request(app)
                .put(`/weapon-types/${weaponTypeId}`)
                .send(updateData);

            expect(response.status).toBe(401);
        });

        it('не должен обновить тип оружия с токеном спортсмена', async () => {
            const updateData = {
                name: 'Updated Pistol',
                description: 'Updated standard pistol'
            };

            const response = await request(app)
                .put(`/weapon-types/${weaponTypeId}`)
                .set('Authorization', `Bearer ${athleteAuthToken}`)
                .send(updateData);

            expect(response.status).toBe(403);
        });
    });

    describe('DELETE /weapon-types/:id', () => {
        let weaponTypeId: number;

        beforeEach(async () => {
            // Создаем тестовый тип оружия
            const weaponTypeData = {
                name: 'Pistol',
                description: 'Standard pistol'
            };

            const createResponse = await request(app)
                .post('/weapon-types')
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(weaponTypeData);

            weaponTypeId = createResponse.body.id;
        });

        it('должен удалить тип оружия с валидным токеном тренера', async () => {
            const response = await request(app)
                .delete(`/weapon-types/${weaponTypeId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);

            // Проверяем, что тип оружия действительно удален
            const getResponse = await request(app)
                .get(`/weapon-types/${weaponTypeId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(getResponse.status).toBe(404);
        });

        it('не должен удалить тип оружия без токена', async () => {
            const response = await request(app)
                .delete(`/weapon-types/${weaponTypeId}`);

            expect(response.status).toBe(401);
        });

        it('не должен удалить тип оружия с токеном спортсмена', async () => {
            const response = await request(app)
                .delete(`/weapon-types/${weaponTypeId}`)
                .set('Authorization', `Bearer ${athleteAuthToken}`);

            expect(response.status).toBe(403);
        });
    });
}); 