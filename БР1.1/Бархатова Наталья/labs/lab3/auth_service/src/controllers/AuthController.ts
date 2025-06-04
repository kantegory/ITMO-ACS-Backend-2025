import {
  JsonController,
  Post,
  Body,
  BadRequestError,
  HttpCode,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { AuthService } from '../services/AuthService';

@JsonController('/auth')
export class AuthController {
  private authService = new AuthService();

  @Post('/get-token')
  @HttpCode(200)
  @OpenAPI({
    summary: 'Получение токена для пользователя',
  })
  async getToken(
    @Body() userData: { email: string; password: string }
  ) {
    const { email, password } = userData;

    const token = this.authService.generateToken(email, password);
    return { token };
  }

  @Post('/validate')
  @HttpCode(200)
  @OpenAPI({
    summary: 'Валидация токена',
  })
  async validate(
    @Body() body: { token: string }
  ) {
    try {
      const decoded = await this.authService.validateToken(body.token);
      return decoded;
    } catch (e) {
      throw new BadRequestError('Invalid token');
    }
  }
}
