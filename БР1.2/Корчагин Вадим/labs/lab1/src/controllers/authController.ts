import { Post, Body, JsonController, BadRequestError } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { User } from "../entities/User";
import { checkPassword } from "../utils/checkPassword";
import * as jwt from "jsonwebtoken";
import { LoginRequestDto } from "../dto/auth/login-request.dto";
import { LoginResponseDto } from "../dto/auth/login-response.dto";
import { AppDataSource } from "../data-source";

@JsonController("/auth")
export class AuthController {
  @Post("/login")
  @OpenAPI({ summary: "User login" })
  @ResponseSchema(LoginResponseDto)
  async login(@Body({ required: true, type: LoginRequestDto }) body: LoginRequestDto) {
    const userRepository = AppDataSource.getRepository(User);
    const { email, password } = body;

    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    const user = await userRepository.findOne({
      where: { email },
      relations: ["role"],
    });

    if (!user) {
      throw new BadRequestError("User not found");
    }

    const validPassword = checkPassword(user.password_hash, password);

    if (!validPassword) {
      throw new BadRequestError("Invalid password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return { token };
  }
}
