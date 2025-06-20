import { ForbiddenError, UnauthorizedError } from "routing-controllers";
import { User } from "../entities/user.entity";
import { BaseService } from "./base.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";

const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const comparePassword = async (hash: string, password: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}

export class UserService extends BaseService<User> {
  constructor() { super(User); }

  validateCurrentUser(userId: number, requestedUserId: number) {
    if (userId !== requestedUserId) {
        throw new ForbiddenError();
    }
  }

  async create(data: Partial<User>): Promise<User> {
    const entity = this.repository.create(
        { ...data, password: await hashPassword(data.password) },
    );
    return this.repository.save(entity);
  }

  async update(id: number, data: Partial<User>): Promise<User | null> {
    if (data.password) {
        data.password = await hashPassword(data.password);
    }
    await this.repository.update(id, data);
    return this.findOne(id);
  }

  async login(username: string, password: string) {
    const user = await this.repository
        .createQueryBuilder("user")
        .addSelect("user.password")
        .where("user.username = :username", { username })
        .getOne();
    if (!user) throw new UnauthorizedError();

    const passwordMatch = await comparePassword(user.password, password);
    if (!passwordMatch) throw new UnauthorizedError();
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
    );
    return { token };
  }

  validate(token: string) {
      const secret = process.env.JWT_SECRET;
      try {
        const payload = jwt.verify(token, secret);
        return { user_id: payload.id };
      }
      catch {
        throw new UnauthorizedError();
      }
  }
}
