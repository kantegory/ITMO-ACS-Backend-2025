import { RoleModel } from '../../../application/domain/role.model';
import { UserModel } from '../../../application/domain/user.model';

// Создаем тестовый класс, наследующийся от RoleModel
class TestRoleModel extends RoleModel {
    constructor(user: UserModel) {
        super(user);
    }
}

describe('RoleModel', () => {
    let roleModel: TestRoleModel;
    let userModel: UserModel;

    beforeEach(() => {
        userModel = new UserModel(
            null,
            'johndoe',
            'password123'
        );
        roleModel = new TestRoleModel(userModel);
    });

    describe('свойство user', () => {
        it('должен иметь доступ к модели пользователя', () => {
            expect(roleModel.user).toBe(userModel);
        });

        it('должен иметь доступ к свойствам пользователя', () => {
            expect(roleModel.user.username).toBe('johndoe');
            expect(roleModel.user.password).toBe('password123');
        });
    });
}); 