import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    console.log(authHeader);
    // Проверка наличия заголовка авторизации
    if (!authHeader) {
      return false;
    }

    // Разделение заголовка на "Basic" и base64-encoded credentials
    const [authType, base64Credentials] = authHeader.split(' ');

    // Если тип не "Basic", то не авторизуем
    if (authType !== 'Basic' || !base64Credentials) {
      return false;
    }

    // Декодирование credentials из base64
    const decodedCredentials = Buffer.from(
      base64Credentials,
      'base64',
    ).toString('utf-8');
    const [username, password] = decodedCredentials.split(':');
    console.log(username, password);

    const adminLogin = this.configService.get<string>('SWAGGER_ADMIN_LOGIN');
    const adminPassword = this.configService.get<string>(
      'SWAGGER_ADMIN_PASSWORD',
    );
    console.log(adminLogin, adminPassword);

    // Проверка username и password
    if (username === adminLogin && password === adminPassword) {
      request.admin = true;
      return true;
    }

    return false;
  }
}
