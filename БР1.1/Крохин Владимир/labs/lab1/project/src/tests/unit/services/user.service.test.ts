import { UserService } from '../../../application/services/UserService';
import { FakeUserRepository } from '../../../infrastructure/repositories/fakes/user.repository';
import { UserModel } from '../../../application/domain/user.model';

describe('UserService', () => {
    let userService: UserService;
    let fakeUserRepository: FakeUserRepository;

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        userService = new UserService(fakeUserRepository);
    });

    describe('создание пользователя', () => {
        it('должен успешно создать нового пользователя', async () => {
            const user = await userService.createUser('testuser', 'password123');
            expect(user).toBeDefined();
            expect(user.username).toBe('testuser');
            expect(user.id).toBeDefined();
        });

        it('должен выбрасывать ошибку при создании пользователя с существующим именем', async () => {
            await userService.createUser('testuser', 'password123');
            await expect(userService.createUser('testuser', 'password456'))
                .rejects.toThrow('Пользователь с таким именем уже существует');
        });

        it('должен выбрасывать ошибку при создании пользователя с коротким именем', async () => {
            await expect(userService.createUser('te', 'password123'))
                .rejects.toThrow('Имя пользователя должно содержать минимум 3 символа');
        });

        it('должен выбрасывать ошибку при создании пользователя с коротким паролем', async () => {
            await expect(userService.createUser('testuser', 'pass'))
                .rejects.toThrow('Пароль должен содержать минимум 6 символов');
        });
    });

    describe('получение пользователя', () => {
        let userId: number;

        beforeEach(async () => {
            const user = await userService.createUser('testuser', 'password123');
            userId = user.id!;
        });

        it('должен получать пользователя по id', async () => {
            const user = await userService.getUserById(userId);
            expect(user).toBeDefined();
            expect(user.id).toBe(userId);
            expect(user.username).toBe('testuser');
        });

        it('должен получать пользователя по имени пользователя', async () => {
            const user = await userService.getUserByUsername('testuser');
            expect(user).toBeDefined();
            expect(user.username).toBe('testuser');
        });

        it('должен выбрасывать ошибку при получении несуществующего пользователя по id', async () => {
            await expect(userService.getUserById(999))
                .rejects.toThrow('Пользователь не найден');
        });

        it('должен выбрасывать ошибку при получении несуществующего пользователя по имени', async () => {
            await expect(userService.getUserByUsername('nonexistent'))
                .rejects.toThrow('Пользователь не найден');
        });
    });

    describe('обновление пользователя', () => {
        let userId: number;

        beforeEach(async () => {
            const user = await userService.createUser('testuser', 'password123');
            userId = user.id!;
        });

        it('должен обновлять имя пользователя', async () => {
            const updatedUser = await userService.updateUser(userId, 'newusername');
            expect(updatedUser.username).toBe('newusername');
        });

        it('должен обновлять пароль пользователя', async () => {
            const updatedUser = await userService.updateUser(userId, undefined, 'newpassword123');
            expect(updatedUser).toBeDefined();
        });

        it('должен обновлять имя и пароль пользователя', async () => {
            const updatedUser = await userService.updateUser(userId, 'newusername', 'newpassword123');
            expect(updatedUser.username).toBe('newusername');
        });

        it('должен выбрасывать ошибку при обновлении несуществующего пользователя', async () => {
            await expect(userService.updateUser(999, 'newusername'))
                .rejects.toThrow('Пользователь не найден');
        });

        it('должен выбрасывать ошибку при обновлении имени на существующее', async () => {
            await userService.createUser('existinguser', 'password123');
            await expect(userService.updateUser(userId, 'existinguser'))
                .rejects.toThrow('Пользователь с таким именем уже существует');
        });
    });

    describe('удаление пользователя', () => {
        let userId: number;

        beforeEach(async () => {
            const user = await userService.createUser('testuser', 'password123');
            userId = user.id!;
        });

        it('должен успешно удалять пользователя', async () => {
            await expect(userService.deleteUser(userId)).resolves.not.toThrow();
            await expect(userService.getUserById(userId))
                .rejects.toThrow('Пользователь не найден');
        });

        it('должен выбрасывать ошибку при удалении несуществующего пользователя', async () => {
            await expect(userService.deleteUser(999))
                .rejects.toThrow('Пользователь не найден');
        });
    });
}); 