import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

/**
 * DTO для входа в систему
 */
export class LoginDto {
  @IsEmail({}, { message: 'Некорректный формат email' })
  @IsNotEmpty({ message: 'Email обязателен' })
  email: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль обязателен' })
  password: string;
}

/**
 * DTO для регистрации
 */
export class RegisterDto {
  @IsEmail({}, { message: 'Некорректный формат email' })
  @IsNotEmpty({ message: 'Email обязателен' })
  email: string;

  @IsString({ message: 'Имя пользователя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя пользователя обязательно' })
  username: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль обязателен' })
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  password: string;

  @IsString({ message: 'Имя должно быть строкой' })
  @IsOptional()
  firstName?: string;

  @IsString({ message: 'Фамилия должна быть строкой' })
  @IsOptional()
  lastName?: string;
}

/**
 * DTO для изменения пароля
 */
export class ChangePasswordDto {
  @IsString({ message: 'Текущий пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Текущий пароль обязателен' })
  currentPassword: string;

  @IsString({ message: 'Новый пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Новый пароль обязателен' })
  @MinLength(6, { message: 'Новый пароль должен содержать минимум 6 символов' })
  newPassword: string;
}

/**
 * DTO для ответа при входе
 */
export class LoginResponseDto {
  accessToken: string;
}

/**
 * DTO для ответа при регистрации
 */
export class RegisterResponseDto {
  id: number;
  username: string;
  email: string;
  accessToken: string;
}

/**
 * DTO для ответа с ошибкой
 */
export class ErrorResponseDto {
  message: string;
}

/**
 * DTO для успешного ответа
 */
export class SuccessResponseDto {
  success: boolean;
  message: string;
}
