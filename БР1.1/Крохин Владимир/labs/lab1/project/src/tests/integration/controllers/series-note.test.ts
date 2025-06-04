import request from 'supertest';
import { app } from '../../../app';
import { DataSource } from 'typeorm';
import { bootstrap } from '../../../bootstrap';
import { UserTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/user.typeorm.repository';
import { AthleteTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/athlete.typeorm.repository';
import { CoachTypeOrmRepository } from '../../../infrastructure/repositories/typeorm/coach.typeorm.repository';

describe('Тесты интеграции SeriesNoteController', () => {
    let dataSource: DataSource;
    let userRepository: UserTypeOrmRepository;
    let athleteRepository: AthleteTypeOrmRepository;
    let coachRepository: CoachTypeOrmRepository;
    let coachAuthToken: string;
    let athleteAuthToken: string;
    let trainingId: number;
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
            date: new Date().toISOString(),
            description: 'Test training',
            athleteId: 1
        };

        const trainingResponse = await request(app)
            .post('/trainings')
            .set('Authorization', `Bearer ${coachAuthToken}`)
            .send(trainingData);

        trainingId = trainingResponse.body.id;

        // Создаем тестовую серию
        const seriesData = {
            exerciseId: 1,
            targetId: 1,
            shotsCount: 10
        };

        const seriesResponse = await request(app)
            .post(`/trainings/${trainingId}/series`)
            .set('Authorization', `Bearer ${coachAuthToken}`)
            .send(seriesData);

        seriesId = seriesResponse.body.id;
    });

    describe('POST /trainings/:trainingId/series/:seriesId/notes', () => {
        it('должен создать заметку к серии с валидным токеном тренера', async () => {
            const noteData = {
                content: 'Test series note',
                type: 'COMMENT'
            };

            const response = await request(app)
                .post(`/trainings/${trainingId}/series/${seriesId}/notes`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(noteData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.content).toBe(noteData.content);
            expect(response.body.type).toBe(noteData.type);
        });

        it('не должен создать заметку к серии без токена', async () => {
            const noteData = {
                content: 'Test series note',
                type: 'COMMENT'
            };

            const response = await request(app)
                .post(`/trainings/${trainingId}/series/${seriesId}/notes`)
                .send(noteData);

            expect(response.status).toBe(401);
        });

        it('не должен создать заметку к серии с токеном спортсмена', async () => {
            const noteData = {
                content: 'Test series note',
                type: 'COMMENT'
            };

            const response = await request(app)
                .post(`/trainings/${trainingId}/series/${seriesId}/notes`)
                .set('Authorization', `Bearer ${athleteAuthToken}`)
                .send(noteData);

            expect(response.status).toBe(403);
        });
    });

    describe('GET /trainings/:trainingId/series/:seriesId/notes', () => {
        it('должен получить список заметок к серии с валидным токеном', async () => {
            const response = await request(app)
                .get(`/trainings/${trainingId}/series/${seriesId}/notes`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('не должен получить список заметок к серии без токена', async () => {
            const response = await request(app)
                .get(`/trainings/${trainingId}/series/${seriesId}/notes`);

            expect(response.status).toBe(401);
        });
    });

    describe('GET /trainings/:trainingId/series/:seriesId/notes/:noteId', () => {
        let noteId: number;

        beforeEach(async () => {
            // Создаем тестовую заметку
            const noteData = {
                content: 'Test series note',
                type: 'COMMENT'
            };

            const createResponse = await request(app)
                .post(`/trainings/${trainingId}/series/${seriesId}/notes`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(noteData);

            noteId = createResponse.body.id;
        });

        it('должен получить заметку к серии с валидным токеном', async () => {
            const response = await request(app)
                .get(`/trainings/${trainingId}/series/${seriesId}/notes/${noteId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', noteId);
        });

        it('не должен получить заметку к серии без токена', async () => {
            const response = await request(app)
                .get(`/trainings/${trainingId}/series/${seriesId}/notes/${noteId}`);

            expect(response.status).toBe(401);
        });

        it('не должен получить несуществующую заметку к серии', async () => {
            const response = await request(app)
                .get(`/trainings/${trainingId}/series/${seriesId}/notes/999`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(404);
        });
    });

    describe('PUT /trainings/:trainingId/series/:seriesId/notes/:noteId', () => {
        let noteId: number;

        beforeEach(async () => {
            // Создаем тестовую заметку
            const noteData = {
                content: 'Test series note',
                type: 'COMMENT'
            };

            const createResponse = await request(app)
                .post(`/trainings/${trainingId}/series/${seriesId}/notes`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(noteData);

            noteId = createResponse.body.id;
        });

        it('должен обновить заметку к серии с валидным токеном тренера', async () => {
            const updateData = {
                content: 'Updated series note',
                type: 'COMMENT'
            };

            const response = await request(app)
                .put(`/trainings/${trainingId}/series/${seriesId}/notes/${noteId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.content).toBe(updateData.content);
        });

        it('не должен обновить заметку к серии без токена', async () => {
            const updateData = {
                content: 'Updated series note',
                type: 'COMMENT'
            };

            const response = await request(app)
                .put(`/trainings/${trainingId}/series/${seriesId}/notes/${noteId}`)
                .send(updateData);

            expect(response.status).toBe(401);
        });

        it('не должен обновить заметку к серии с токеном спортсмена', async () => {
            const updateData = {
                content: 'Updated series note',
                type: 'COMMENT'
            };

            const response = await request(app)
                .put(`/trainings/${trainingId}/series/${seriesId}/notes/${noteId}`)
                .set('Authorization', `Bearer ${athleteAuthToken}`)
                .send(updateData);

            expect(response.status).toBe(403);
        });
    });

    describe('DELETE /trainings/:trainingId/series/:seriesId/notes/:noteId', () => {
        let noteId: number;

        beforeEach(async () => {
            // Создаем тестовую заметку
            const noteData = {
                content: 'Test series note',
                type: 'COMMENT'
            };

            const createResponse = await request(app)
                .post(`/trainings/${trainingId}/series/${seriesId}/notes`)
                .set('Authorization', `Bearer ${coachAuthToken}`)
                .send(noteData);

            noteId = createResponse.body.id;
        });

        it('должен удалить заметку к серии с валидным токеном тренера', async () => {
            const response = await request(app)
                .delete(`/trainings/${trainingId}/series/${seriesId}/notes/${noteId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(response.status).toBe(200);

            // Проверяем, что заметка действительно удалена
            const getResponse = await request(app)
                .get(`/trainings/${trainingId}/series/${seriesId}/notes/${noteId}`)
                .set('Authorization', `Bearer ${coachAuthToken}`);

            expect(getResponse.status).toBe(404);
        });

        it('не должен удалить заметку к серии без токена', async () => {
            const response = await request(app)
                .delete(`/trainings/${trainingId}/series/${seriesId}/notes/${noteId}`);

            expect(response.status).toBe(401);
        });

        it('не должен удалить заметку к серии с токеном спортсмена', async () => {
            const response = await request(app)
                .delete(`/trainings/${trainingId}/series/${seriesId}/notes/${noteId}`)
                .set('Authorization', `Bearer ${athleteAuthToken}`);

            expect(response.status).toBe(403);
        });
    });
}); 