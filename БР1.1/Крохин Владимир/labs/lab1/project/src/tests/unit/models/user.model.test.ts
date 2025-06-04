import { UserModel } from '../../../application/domain/user.model';

describe('UserModel', () => {
    let userModel: UserModel;

    describe('конструктор', () => {
        it('должен создавать пользователя с корректными данными', () => {
            userModel = new UserModel(null, 'johndoe', 'password123');
            expect(userModel.username).toBe('johndoe');
            expect(userModel.password).toBe('password123');
        });

        it('должен выбрасывать ошибку при некорректном имени пользователя (слишком короткое)', () => {
            expect(() => {
                new UserModel(null, 'jo', 'password123');
            }).toThrow('Имя пользователя должно содержать минимум 3 символа');
        });

        it('должен выбрасывать ошибку при пустом имени пользователя', () => {
            expect(() => {
                new UserModel(null, '', 'password123');
            }).toThrow('Имя пользователя должно содержать минимум 3 символа');
        });

        it('должен выбрасывать ошибку при некорректном пароле (слишком короткий)', () => {
            expect(() => {
                new UserModel(null, 'johndoe', 'pass');
            }).toThrow('Пароль должен содержать минимум 6 символов');
        });

        it('должен выбрасывать ошибку при пустом пароле', () => {
            expect(() => {
                new UserModel(null, 'johndoe', '');
            }).toThrow('Пароль должен содержать минимум 6 символов');
        });
    });

    describe('свойство username', () => {
        beforeEach(() => {
            userModel = new UserModel(null, 'johndoe', 'password123');
        });

        it('должен корректно получать имя пользователя', () => {
            expect(userModel.username).toBe('johndoe');
        });

        it('должен корректно устанавливать имя пользователя', () => {
            userModel.username = 'janedoe';
            expect(userModel.username).toBe('janedoe');
        });

        it('должен выбрасывать ошибку при установке некорректного имени пользователя', () => {
            expect(() => {
                userModel.username = 'jo';
            }).toThrow('Имя пользователя должно содержать минимум 3 символа');
        });
    });

    describe('свойство password', () => {
        beforeEach(() => {
            userModel = new UserModel(null, 'johndoe', 'password123');
        });

        it('должен корректно получать пароль', () => {
            expect(userModel.password).toBe('password123');
        });

        it('должен корректно устанавливать пароль', () => {
            userModel.password = 'newpassword123';
            expect(userModel.password).toBe('newpassword123');
        });

        it('должен выбрасывать ошибку при установке некорректного пароля', () => {
            expect(() => {
                userModel.password = 'pass';
            }).toThrow('Пароль должен содержать минимум 6 символов');
        });
    });
}); 