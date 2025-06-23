# Center Express Backend

Express.js backend для проекта Center, переписанный с Django на Node.js/Express/TypeORM.

## Технологии

- **Node.js** - среда выполнения
- **Express.js** - веб-фреймворк
- **TypeORM** - ORM для работы с базой данных
- **SQLite** - база данных
- **TypeScript** - типизированный JavaScript
- **JWT** - аутентификация
- **bcryptjs** - хеширование паролей
- **multer** - загрузка файлов

## Установка

1. Установите зависимости:
```bash
npm install
```

2. Создайте файл `.env` на основе `env.example`:
```bash
cp env.example .env
```

3. Настройте переменные окружения в файле `.env`:
```env
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
DATABASE_PATH=./database.sqlite
NODE_ENV=development
```

## Запуск

### Режим разработки
```bash
npm run dev
```

### Продакшн
```bash
npm run build
npm start
```

## API Endpoints

### Аутентификация
- `POST /api/auth/login` - Вход в систему

### Пользователи
- `GET /api/users` - Получить всех пользователей
- `GET /api/users/agents` - Получить агентов
- `GET /api/users/clients` - Получить клиентов
- `GET /api/users/:id` - Получить пользователя по ID
- `POST /api/users` - Создать пользователя (требует аутентификации)
- `PUT /api/users/:id` - Обновить пользователя (требует аутентификации)
- `DELETE /api/users/:id` - Удалить пользователя (требует аутентификации)

### Квартиры
- `GET /api/apartments` - Получить все квартиры
- `GET /api/apartments/:id` - Получить квартиру по ID
- `POST /api/apartments` - Создать квартиру (требует аутентификации)
- `PUT /api/apartments/:id` - Обновить квартиру (требует аутентификации)
- `DELETE /api/apartments/:id` - Удалить квартиру (требует аутентификации)

### Здания
- `GET /api/buildings` - Получить все здания
- `GET /api/buildings/:id` - Получить здание по ID
- `POST /api/buildings` - Создать здание (требует аутентификации)
- `PUT /api/buildings/:id` - Обновить здание (требует аутентификации)
- `DELETE /api/buildings/:id` - Удалить здание (требует аутентификации)

### Контракты
- `GET /api/contracts` - Получить все контракты
- `GET /api/contracts/:id` - Получить контракт по ID
- `POST /api/contracts` - Создать контракт (требует аутентификации)
- `PUT /api/contracts/:id` - Обновить контракт (требует аутентификации)
- `DELETE /api/contracts/:id` - Удалить контракт (требует аутентификации)

## Аутентификация

Для защищенных маршрутов необходимо передавать JWT токен в заголовке:
```
Authorization: Bearer <your-jwt-token>
```

## Структура проекта

```
src/
├── config/
│   └── database.ts          # Конфигурация базы данных
├── controllers/
│   ├── userController.ts    # Контроллер пользователей
│   ├── apartmentController.ts # Контроллер квартир
│   ├── buildingController.ts # Контроллер зданий
│   └── contractController.ts # Контроллер контрактов
├── entities/
│   ├── User.ts             # Сущность пользователя
│   ├── Apartment.ts        # Сущность квартиры
│   ├── Building.ts         # Сущность здания
│   └── Contract.ts         # Сущность контракта
├── middleware/
│   └── auth.ts             # Middleware аутентификации
├── routes/
│   ├── auth.ts             # Маршруты аутентификации
│   ├── users.ts            # Маршруты пользователей
│   ├── apartments.ts       # Маршруты квартир
│   ├── buildings.ts        # Маршруты зданий
│   └── contracts.ts        # Маршруты контрактов
└── index.ts                # Основной файл приложения
```

## Миграции

База данных автоматически синхронизируется при запуске (synchronize: true). В продакшене рекомендуется использовать миграции.

## Загрузка файлов

Статические файлы (изображения) доступны по адресу `/uploads/`.

## Health Check

- `GET /health` - Проверка состояния сервера 