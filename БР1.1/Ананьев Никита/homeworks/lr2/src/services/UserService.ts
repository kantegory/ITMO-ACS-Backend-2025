import { Service, Inject } from 'typedi';
import { User } from "../models/UserModel"
import { CreateUserDto, LoginDto, ResponseUserDto } from "../dtos/UserDtos";
import { TokenDto } from '../dtos/TokenDto';
import { UserMapper } from "../mappers/UserMapper";
import { Repository, FindManyOptions } from "typeorm";
import { NotFoundError } from "../errors/NotFoundError"
import { CreationError } from "../errors/CreationError"
import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError";
import { WrongPasswordError } from '../errors/WrongPasswordError';
import { BaseService } from "./BaseService";
import { AuthService } from '../auth';


export interface IUserService {
    register(registerInfo: CreateUserDto): Promise<ResponseUserDto>;
    login(loginInfo: LoginDto): Promise<TokenDto>;
    findAll(options?: FindManyOptions<User>): Promise<ResponseUserDto[]>
    findById(id: number, relations: string[]): Promise<ResponseUserDto | null>
}


@Service('IUserService')
export class UserService extends BaseService<User, ResponseUserDto> implements IUserService {
    constructor(
        @Inject('user.repository')
        protected readonly repository: Repository<User>
    ) {
        super(repository);
    }

    protected toDto(model: User): ResponseUserDto {
        return UserMapper.toDto(model);
    }

    async register(registerInfo: CreateUserDto): Promise<ResponseUserDto> {
        let user: User = UserMapper.toModel(registerInfo);
        user.password = await AuthService.hashPassword(user.password);
        try {
            user = await this.repository.save(user);
            return this.toDto(user)
        } catch (error: any) {
            if (error.code == '23505')
                throw new UserAlreadyExistsError("This email is already taken")
            throw new CreationError(error)
        }
    }

    async login(loginInfo: LoginDto): Promise<TokenDto> {
        const user: User | null = await this.repository.findOneBy({ email: loginInfo.email });
        if (!user) 
            throw new NotFoundError("Can't find user with this email")
        let passwordsEqual = await AuthService.comparePasswords(loginInfo.password, user.password);
        if (!passwordsEqual)
            throw new WrongPasswordError("Wrong passwod")
        const token: string = AuthService.generateJWT(user.id);
        return new TokenDto(token);
    }
}
