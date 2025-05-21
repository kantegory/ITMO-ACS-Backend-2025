import { Service, Inject } from 'typedi';
import { User } from "../models/UserModel"
import { CreateUserDto, LoginDto, ResponseUserDto } from "../dtos/UserDtos";
import { UserMapper } from "../mappers/UserMapper";
import { Repository, FindManyOptions } from "typeorm";
import { NotFoundError } from "../errors/NotFoundError"
import { CreationError } from "../errors/CreationError"
import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError";
import { BaseService } from "./BaseService";


export interface IUserService {
    register(registerInfo: CreateUserDto): Promise<ResponseUserDto>;
    login(loginInfo: LoginDto): Promise<void>;
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
        let user: User = UserMapper.toModel(registerInfo)
        try {
            user = await this.repository.save(user)
            return this.toDto(user)
        } catch (error: any) {
            if (error.code == '23505')
                throw new UserAlreadyExistsError("This email is already taken")
            throw new CreationError(error)
        }
    }

    async login(loginInfo: LoginDto): Promise<void> {
        const user: User | null = await this.repository.findOneBy({ email: loginInfo.email })
        if (!user) 
            throw new NotFoundError("Can't find user with this email")
        // TODO: token creation
    }
}
