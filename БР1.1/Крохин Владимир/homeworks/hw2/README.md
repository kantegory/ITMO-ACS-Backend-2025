# Документация API

## 1. Пользователи (Users)


### 1.1. Создание нового пользователя (POST /users)

```bash
curl -i -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ivanov",
    "email": "ivanov@example.com",
    "password": "password123",
    "firstName": "Ivan",
    "secondName": "Ivanovich",
    "avatar": "iVBORw0KGgoAAAANSUhEUgAAAAUA"  # (пример base64-строки)
  }'
```

Ожидаемый ответ:
```
HTTP/1.1 201 Created
```

В теле JSON-объект созданного пользователя, например:

```json
{
  "id": 1,
  "username": "ivanov",
  "email": "ivanov@example.com",
  "passwordHash": "<хеш-строка>",
  "firstName": "Ivan",
  "secondName": "Ivanovich",
  "avatar": "[53], ...",
  "coachProfiles": [],
  "athleteProfiles": [],
  "notes": []
}
```

### 1.2. Создание с уже существующим email (ошибка 409)

```bash
curl -i -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "petrov",
    "email": "ivanov@example.com",
    "password": "anotherpass",
    "firstName": "Petr",
    "secondName": "Petrovich"
  }'
```

Ожидаемый ответ:

```
HTTP/1.1 409 Conflict

{ "error": "Email уже занят." }
```

### 1.3. Попытка создать без обязательных полей (ошибка 400)
```bash
curl -i -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "sidorov"
    # отсутствует email, password, firstName или secondName
  }'
```

Ожидаемый ответ:

```
HTTP/1.1 400 Bad Request

{ "error": "Не все обязательные поля заполнены." }
```

### 1.4. Получение списка всех пользователей (GET /users)

```bash
curl -i http://localhost:3000/users
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK
```

JSON-массив всех пользователей, например:

```json
[
  {
    "id": 1,
    "username": "ivanov",
    "email": "ivanov@example.com",
    "firstName": "Ivan",
    "secondName": "Ivanovich",
    "avatar": "<Buffer ...>",
    "coachProfiles": [],
    "athleteProfiles": [],
    "notes": []
  }
]
```


### 1.5. Получение пользователя по ID (GET /users/:id)

```bash
curl -i http://localhost:3000/users/1
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK
```

JSON-объект пользователя.

### 1.6. Получение по несуществующему ID (GET /users/:id)  404

```bash
curl -i http://localhost:3000/users/999
```

Ожидаемый ответ:

```
HTTP/1.1 404 Not Found

{ "error": "Пользователь не найден." }
```

### 1.7. Получение пользователя по email (GET /users/email/:email)


```bash
curl -i http://localhost:3000/users/email/ivanov@example.com
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK
```

JSON-объект пользователя.

### 1.8. GET по несуществующему email (ошибка 404)

```
bash
curl -i http://localhost:3000/users/email/nobody@example.com
```

Ожидаемый ответ:

```
HTTP/1.1 404 Not Found

{ "error": "Пользователь не найден." }
```

### 1.9. Обновление пользователя (PUT /users/:id)


```bash
curl -i -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Ivan-Updated",
    "secondName": "Ivanovich-Updated",
    "email": "ivanov_updated@example.com",
    "password": "newpassword123"
  }'
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK
```

JSON обновлённого пользователя (в том числе новый email и firstName).

### 1.10. Попытка обновить несуществующего пользователя (PUT /users/:id)  404


```bash
curl -i -X PUT http://localhost:3000/users/999 \
  -H "Content-Type: application/json" \
  -d '{ "firstName": "NoOne" }'
```

Ожидаемый ответ:

```
HTTP/1.1 404 Not Found

{ "error": "Пользователь не найден." }
```

### 1.11. Попытка обновить email на уже существующий (ошибка 409)

```bash
curl -i -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{ "email": "petrov@example.com" }'
```

Ожидаемый ответ:

```
HTTP/1.1 409 Conflict

{ "error": "Email уже занят." }
```

### 1.12. Удаление пользователя (DELETE /users/:id)


```bash
curl -i -X DELETE http://localhost:3000/users/1
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK

{ "message": "Пользователь успешно удалён." }
```

### 1.13. Удаление несуществующего пользователя  404


```bash
curl -i -X DELETE http://localhost:3000/users/999
```

Ожидаемый ответ:

```
HTTP/1.1 404 Not Found

{ "error": "Пользователь не найден." }
```

## 2. Тренеры (Coaches)

**Внимание**: перед созданием Coach должен существовать User с указанным userId.

### 2.1. Создание тренера (POST /coaches)

```bash
curl -i -X POST http://localhost:3000/coaches \
  -H "Content-Type: application/json" \
  -d '{ "userId": 2 }'
```

Ожидаемый ответ:

```
HTTP/1.1 201 Created
```

JSON-объект:

```json
{
  "id": 1,
  "user": {
    "id": 2,
    "username": "...",
    "email": "...",
    ...
  },
  "athletes": []
}
```

### 2.2. Создание тренера с несуществующим userId  404

```bash
curl -i -X POST http://localhost:3000/coaches \
  -H "Content-Type: application/json" \
  -d '{ "userId": 999 }'
```

Ожидаемый ответ:

```
HTTP/1.1 404 Not Found

{ "error": "Пользователь не найден." }
```

### 2.3. Создание дубликата (POST /coaches)  409

```bash
curl -i -X POST http://localhost:3000/coaches \
  -H "Content-Type: application/json" \
  -d '{ "userId": 2 }'
```

Ожидаемый ответ:

```
HTTP/1.1 409 Conflict

{ "error": "Coach для этого пользователя уже существует." }
```

### 2.4. Получение списка тренеров (GET /coaches)

```bash
curl -i http://localhost:3000/coaches
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK
```

JSON-массив, например:

```json
[
  {
    "id": 1,
    "user": { /* userId=2 */ },
    "athletes": []
  }
  ...
]
```

### 2.5. Получение тренера по ID (GET /coaches/:id)

```bash
curl -i http://localhost:3000/coaches/1
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK
```

JSON объекта тренера.

### 2.6. GET несуществующего тренера (GET /coaches/:id)  404

```bash
curl -i http://localhost:3000/coaches/999
```

Ожидаемый ответ:

```
HTTP/1.1 404 Not Found

{ "error": "Тренер не найден." }
```

### 2.7. Обновление тренера (PUT /coaches/:id)

```bash
curl -i -X PUT http://localhost:3000/coaches/1 \
  -H "Content-Type: application/json" \
  -d '{ "userId": 3 }'
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK
```

JSON с обновлённым user.id = 3.

### 2.8. UPDATE несуществующего тренера  404


```bash
curl -i -X PUT http://localhost:3000/coaches/999 \
  -H "Content-Type: application/json" \
  -d '{ "userId": 2 }'
```

Ожидаемый ответ:

```
HTTP/1.1 404 Not Found

{ "error": "Тренер не найден." }
```

### 2.9. Удаление тренера (DELETE /coaches/:id)

```bash
curl -i -X DELETE http://localhost:3000/coaches/1
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK

{ "message": "Тренер успешно удалён." }
```

### 2.10. Удаление несуществующего тренера  404

```bash
curl -i -X DELETE http://localhost:3000/coaches/999
```

Ожидаемый ответ:

```
HTTP/1.1 404 Not Found

{ "error": "Тренер не найден." }
```

## 3. Спортсмены (Athletes)
Примечание: при создании Athlete нужен существующий User и необязательно — массив coachIds (чтобы сразу связать со списком тренеров).


### 3.1. Создание спортсмена (POST /athletes)

```bash
curl -i -X POST http://localhost:3000/athletes \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 4,
    "coachIds": [2, 3]  # предполагаем, что тренеры с ID=2,3 уже существуют
  }'
```

Ожидаемый ответ:

```
HTTP/1.1 201 Created
```

JSON:

```json
{
  "id": 1,
  "user": { /* userId=4 */ },
  "coaches": [
    { "id": 2, "user": { ... }, "athletes": [...] },
    { "id": 3, "user": { ... }, "athletes": [...] }
  ],
  "trainings": []
}
```

### 3.2. Создание с несуществующим userId  404

```bash
curl -i -X POST http://localhost:3000/athletes \
  -H "Content-Type: application/json" \
  -d '{ "userId": 999 }'
```

Ожидаемый ответ:

```
HTTP/1.1 404 Not Found

{ "error": "Пользователь не найден." }
```

### 3.3. Создание дубликата (POST /athletes)  409

```bash
curl -i -X POST http://localhost:3000/athletes \
  -H "Content-Type: application/json" \
  -d '{ "userId": 4 }'
```

Ожидаемый ответ:

```
HTTP/1.1 409 Conflict

{ "error": "Athlete для этого пользователя уже существует." }
```

### 3.4. Получение списка спортсменов (GET /athletes)

```bash
curl -i http://localhost:3000/athletes
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK
```

JSON-массив спортсменов с их связями (user, coaches, trainings).

### 3.5. Получение спортсмена по ID (GET /athletes/:id)

```bash
curl -i http://localhost:3000/athletes/1
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK
```

JSON-объект спортсмена.

### 3.6. GET несуществующего спортсмена  404

```bash
curl -i http://localhost:3000/athletes/999
```

Ожидаемый ответ:

```
HTTP/1.1 404 Not Found

{ "error": "Спортсмен не найден." }
```

### 3.7. Обновление спортсмена (PUT /athletes/:id)

```bash
curl -i -X PUT http://localhost:3000/athletes/1 \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 5,
    "coachIds": [1, 4]
  }'
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK
```

JSON-объект спортсмена с обновлённым user.id = 5 и новым списком coaches.

### 3.8. PUT несуществующего спортсмена  404

```bash
curl -i -X PUT http://localhost:3000/athletes/999 \
  -H "Content-Type: application/json" \
  -d '{ "userId": 2 }'
```

Ожидаемый ответ:

```
HTTP/1.1 404 Not Found

{ "error": "Спортсмен не найден." }
```

### 3.9. Удаление спортсмена (DELETE /athletes/:id)

```bash
curl -i -X DELETE http://localhost:3000/athletes/1
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK

{ "message": "Спортсмен успешно удалён." }
```

### 3.10. DELETE несуществующего спортсмена  404

```bash
curl -i -X DELETE http://localhost:3000/athletes/999
```

Ожидаемый ответ:

```
HTTP/1.1 404 Not Found

{ "error": "Спортсмен не найден." }
```

## 4. Типы Оружия (WeaponType)
### 4.1. Создание (POST /weapon-types)


```bash
curl -i -X POST http://localhost:3000/weapon-types \
  -H "Content-Type: application/json" \
  -d '{ "name": "Pistol" }'
```

Ожидаемый ответ:

```
HTTP/1.1 201 Created
```

JSON:

```json
{
  "id": 1,
  "name": "Pistol"
}
```

### 4.2. Создание без имени  400

```bash
curl -i -X POST http://localhost:3000/weapon-types \
  -H "Content-Type: application/json" \
  -d '{}'
```

Ожидаемый ответ:

```
HTTP/1.1 400 Bad Request

{ "error": "Название обязательно." }
```

### 4.3. GET всех (GET /weapon-types)

```bash
curl -i http://localhost:3000/weapon-types
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK

[{ "id": 1, "name": "Pistol" }, ...]
```

### 4.4. GET по ID (GET /weapon-types/:id)

```bash
curl -i http://localhost:3000/weapon-types/1
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK

{ "id": 1, "name": "Pistol" }
```

### 4.5. GET несуществующего  404

```bash
curl -i http://localhost:3000/weapon-types/999
```

Ожидаемый ответ:

```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```

### 4.6. Обновление (PUT /weapon-types/:id)

```bash
curl -i -X PUT http://localhost:3000/weapon-types/1 \
  -H "Content-Type: application/json" \
  -d '{ "name": "Rifle" }'
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK

{ "id": 1, "name": "Rifle" }
```

4.7. PUT несуществующего  404

```bash
curl -i -X PUT http://localhost:3000/weapon-types/999 \
  -H "Content-Type: application/json" \
  -d '{ "name": "Shotgun" }'
```

Ожидаемый ответ:

```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```

### 4.8. Удаление (DELETE /weapon-types/:id)

```bash
curl -i -X DELETE http://localhost:3000/weapon-types/1
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK

{ "message": "Удалено." }
```

### 4.9. DELETE несуществующего  404

```bash
curl -i -X DELETE http://localhost:3000/weapon-types/999
```

Ожидаемый ответ:

```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```

## 5. Мишени (Targets)
### 5.1. Создание (POST /targets)

```bash
curl -i -X POST http://localhost:3000/targets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Standard Target",
    "description": "Описание мишени",
    "imageBase64": "iVBORw0KGgoAAAANSUhEUgAA ..."
  }'
```

Ожидаемый ответ:

```
HTTP/1.1 201 Created
```

JSON:

```json
{
  "id": 1,
  "name": "Standard Target",
  "description": "Описание мишени",
  "image": "<Buffer ...>"
}
```

### 5.2. Создание без полей (ошибка 400)

```bash
curl -i -X POST http://localhost:3000/targets \
  -H "Content-Type: application/json" \
  -d '{ "name": "", "description": "" }'
```

Ожидаемый ответ:

```
HTTP/1.1 400 Bad Request

{ "error": "name и description обязательны." }
```

### 5.3. GET всех (GET /targets)

```bash
curl -i http://localhost:3000/targets
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK

[ { "id": 1, "name": "Standard Target", "description": "Описание мишени", "image": "<Buffer ...>" }, ... ]
```

### 5.4. GET по ID (GET /targets/:id)

```bash
curl -i http://localhost:3000/targets/1
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK

{ "id": 1, "name": "Standard Target", "description": "Описание мишени", "image": "<Buffer ...>" }
```

### 5.5. GET несуществующего  404
```bash
curl -i http://localhost:3000/targets/999
```

Ожидаемый ответ:

```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```

### 5.6. Обновление (PUT /targets/:id)

```bash
curl -i -X PUT http://localhost:3000/targets/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Target",
    "description": "Новое описание",
    "imageBase64": "iVBORw0KGgoAAAANSUhEUgAA..."
  }'
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK
```

JSON с обновлёнными полями.

### 5.7. PUT несуществующего  404
```bash
curl -i -X PUT http://localhost:3000/targets/999 \
  -H "Content-Type: application/json" \
  -d '{ "name": "NoTarget", "description": "..." }'
```

Ожидаемый ответ:

```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```

###5.8. Удаление (DELETE /targets/:id)

```bash
curl -i -X DELETE http://localhost:3000/targets/1
```

Ожидаемый ответ:

```
HTTP/1.1 200 OK

{ "message": "Удалено." }
```

### 5.9. DELETE несуществующего  404

```bash
curl -i -X DELETE http://localhost:3000/targets/999
```
Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```

## 6. Упражнения (Exercises)
### 6.1. Создание (POST /exercises)
```bash
curl -i -X POST http://localhost:3000/exercises \
  -H "Content-Type: application/json" \
  -d '{
    "weaponTypeId": 1,
    "targetId": 1,
    "shots": 60,
    "shotsInSeries": 10,
    "duration": 30,
    "description": "Упражнение на точность"
  }'
```

Ожидаемый ответ:

```
HTTP/1.1 201 Created
```

JSON:

```json
{
  "id": 1,
  "weaponType": { "id": 1, "name": "Pistol" },
  "target": { "id": 1, ... },
  "shots": 60,
  "shotsInSeries": 10,
  "duration": 30,
  "description": "Упражнение на точность"
}
```

### 6.2. Создание с несуществующими FK  404
```bash
curl -i -X POST http://localhost:3000/exercises \
  -H "Content-Type: application/json" \
  -d '{
    "weaponTypeId": 999,
    "targetId": 1,
    "shots": 30,
    "shotsInSeries": 5,
    "duration": 15,
    "description": "Ошибка"
  }'
```

Ожидаемый ответ:

```
HTTP/1.1 404 Not Found

{ "error": "WeaponType не найден." }
```
(или аналогично, если targetId тоже неверен)

### 6.3. GET всех (GET /exercises)
```bash
curl -i http://localhost:3000/exercises
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON-массив всех упражнений с их weaponType и target.

### 6.4. GET по ID (GET /exercises/:id)
``` bash
curl -i http://localhost:3000/exercises/1
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON-объект упражнения.

### 6.5. GET несуществующего  404
```bash
curl -i http://localhost:3000/exercises/999
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```

### 6.6. Обновление (PUT /exercises/:id)
```bash
curl -i -X PUT http://localhost:3000/exercises/1 \
  -H "Content-Type: application/json" \
  -d '{
    "weaponTypeId": 2,
    "shots": 80,
    "description": "Обновлено"
  }'
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON-обновлённого упражнения.

### 6.7. PUT несуществующего  404
```bash
curl -i -X PUT http://localhost:3000/exercises/999 \
  -H "Content-Type: application/json" \
  -d '{ "shots": 100 }'
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```
### 6.8. Удаление (DELETE /exercises/:id)
```bash
curl -i -X DELETE http://localhost:3000/exercises/1
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK

{ "message": "Удалено." }
```

### 6.9. DELETE несуществующего  404

```bash
curl -i -X DELETE http://localhost:3000/exercises/999
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```
## 7. Тренировки (Trainings)
Важно: перед созданием Training должен существовать Athlete с athleteId.

### 7.1. Создание (POST /trainings)
```bash
curl -i -X POST http://localhost:3000/trainings \
  -H "Content-Type: application/json" \
  -d '{
    "athleteId": 1,
    "startTs": "2025-05-01T10:00:00.000Z",
    "endTs": "2025-05-01T11:00:00.000Z",
    "totalScore": 85
  }'
```

Ожидаемый ответ:
```
HTTP/1.1 201 Created
```
JSON:

```json
{
  "id": 1,
  "athlete": { "id": 1, ... },
  "startTs": "2025-05-01T10:00:00.000Z",
  "endTs": "2025-05-01T11:00:00.000Z",
  "totalScore": 85,
  "freeTrainingProfile": null,
  "qualificationTrainingProfile": null,
  "series": [],
  "trainingNotes": []
}
```

### 7.2. Создание с несуществующим athleteId  404
```bash
curl -i -X POST http://localhost:3000/trainings \
  -H "Content-Type: application/json" \
  -d '{
    "athleteId": 999,
    "startTs": "2025-06-01T10:00:00.000Z"
  }'
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Спортсмен не найден." }
```

### 7.3. Получение всех (GET /trainings)
```bash
curl -i http://localhost:3000/trainings
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON-массив всех тренировок со связями.

### 7.4. GET по ID (GET /trainings/:id)
``` bash
curl -i http://localhost:3000/trainings/1
```
Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON-объект тренировки.

### 7.5. GET несуществующей  404
```bash
curl -i http://localhost:3000/trainings/999
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```

### 7.6. Обновление (PUT /trainings/:id)
```bash
curl -i -X PUT http://localhost:3000/trainings/1 \
  -H "Content-Type: application/json" \
  -d '{
    "athleteId": 2,
    "startTs": "2025-05-01T11:00:00.000Z",
    "endTs": "2025-05-01T12:00:00.000Z",
    "totalScore": 90
  }'
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON с обновлённой тренировкой.

### 7.7. PUT несуществующей  404
```bash
curl -i -X PUT http://localhost:3000/trainings/999 \
  -H "Content-Type: application/json" \
  -d '{ "totalScore": 50 }'
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```
### 7.8. Удаление (DELETE /trainings/:id)
```bash
curl -i -X DELETE http://localhost:3000/trainings/1
```
Ожидаемый ответ:
```
HTTP/1.1 200 OK

{ "message": "Удалено." }
```
### 7.9. DELETE несуществующей  404
```bash
curl -i -X DELETE http://localhost:3000/trainings/999
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```
## 8. FreeTraining
**Замечание**: перед созданием FreeTraining в БД должна быть запись Training с id = trainingId, и также должны существовать WeaponType и Target.

### 8.1. Создание (POST /free-trainings)
```bash
curl -i -X POST http://localhost:3000/free-trainings \
  -H "Content-Type: application/json" \
  -d '{
    "trainingId": 1,
    "weaponTypeId": 1,
    "targetId": 1
  }'
```

Ожидаемый ответ:
```
HTTP/1.1 201 Created
```
JSON:

```json
{
  "id": 1,
  "training": { "id": 1, ... },
  "weaponType": { "id": 1, ... },
  "target": { "id": 1, ... }
}
```

### 8.2. Создание дубликата (POST /free-trainings)  409
```bash
# Если для trainingId=1 уже есть FreeTraining
curl -i -X POST http://localhost:3000/free-trainings \
  -H "Content-Type: application/json" \
  -d '{ "trainingId": 1, "weaponTypeId": 1, "targetId": 1 }'
```

Ожидаемый ответ:
```
HTTP/1.1 409 Conflict

{ "error": "FreeTraining для этого Training уже существует." }
```
### 8.3. Создание с несуществующими FK  404
```bash
curl -i -X POST http://localhost:3000/free-trainings \
  -H "Content-Type: application/json" \
  -d '{ "trainingId": 999, "weaponTypeId": 1, "targetId": 1 }'
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Training не найден." }
```
(или, если ошибки в WeaponType/Target)

### 8.4. GET всех (GET /free-trainings)
```bash
curl -i http://localhost:3000/free-trainings
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON-массив с freeTraining (включая связи: training, weaponType, target).

### 8.5. GET по ID (GET /free-trainings/:id)
```bash
curl -i http://localhost:3000/free-trainings/1
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON одного FreeTraining.

### 8.6. GET несуществующего  404
```bash
curl -i http://localhost:3000/free-trainings/999
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```
### 8.7. Обновление (PUT /free-trainings/:id)
```bash
curl -i -X PUT http://localhost:3000/free-trainings/1 \
  -H "Content-Type: application/json" \
  -d '{ "weaponTypeId": 2, "targetId": 2 }'
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON c обновлённым weaponType и target.

### 8.8. PUT несуществующего  404
```bash
curl -i -X PUT http://localhost:3000/free-trainings/999 \
  -H "Content-Type: application/json" \
  -d '{ "weaponTypeId": 3 }'
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```

### 8.9. Удаление (DELETE /free-trainings/:id)
```bash
curl -i -X DELETE http://localhost:3000/free-trainings/1
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK

{ "message": "Удалено." }
```

### 8.10. DELETE несуществующего  404
```bash
curl -i -X DELETE http://localhost:3000/free-trainings/999
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```
## 9. QualificationTraining
**Важное условие**: Training и Exercise с указанными ID должны существовать заранее.

### 9.1. Создание (POST /qualification-trainings)
```bash
curl -i -X POST http://localhost:3000/qualification-trainings \
  -H "Content-Type: application/json" \
  -d '{
    "trainingId": 2,
    "exerciseId": 1
  }'
```

Ожидаемый ответ:
```
HTTP/1.1 201 Created
```
JSON:
```json
{
  "id": 1,
  "training": { "id": 2, ... },
  "exercise": { "id": 1, ... }
}
```
### 9.2. Дубликат  409
```bash
# Если для trainingId=2 уже есть QualificationTraining
curl -i -X POST http://localhost:3000/qualification-trainings \
  -H "Content-Type: application/json" \
  -d '{ "trainingId": 2, "exerciseId": 1 }'
```

Ожидаемый ответ:
```
HTTP/1.1 409 Conflict

{ "error": "QualificationTraining для этого Training уже существует." }
```
### 9.3. Некорректные FK  404
```bash
curl -i -X POST http://localhost:3000/qualification-trainings \
  -H "Content-Type: application/json" \
  -d '{ "trainingId": 999, "exerciseId": 1 }'
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Training не найден." }
```
И аналогично для неверного exerciseId.

### 9.4. GET всех (GET /qualification-trainings)
``` bash
curl -i http://localhost:3000/qualification-trainings
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON-массив всех QualificationTraining с «training» и «exercise».

### 9.5. GET по ID (GET /qualification-trainings/:id)
```bash
curl -i http://localhost:3000/qualification-trainings/1
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON одного QualificationTraining.

### 9.6. GET несуществующего  404
```bash
curl -i http://localhost:3000/qualification-trainings/999
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```
### 9.7. Обновление (PUT /qualification-trainings/:id)
```bash
curl -i -X PUT http://localhost:3000/qualification-trainings/1 \
  -H "Content-Type: application/json" \
  -d '{ "exerciseId": 2 }'
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```

JSON с обновлённым exercise.

### 9.8. PUT несуществующего  404
```bash
curl -i -X PUT http://localhost:3000/qualification-trainings/999 \
  -H "Content-Type: application/json" \
  -d '{ "exerciseId": 2 }'
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```
### 9.9. Удаление (DELETE /qualification-trainings/:id)
```bash
curl -i -X DELETE http://localhost:3000/qualification-trainings/1
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK

{ "message": "Удалено." }
```

### 9.10. DELETE несуществующего  404
```bash
curl -i -X DELETE http://localhost:3000/qualification-trainings/999
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```
## 10. Серии (Series)
Перед созданием Series нужен Training с id = trainingId.

### 10.1. Создание (POST /series)
```bash
curl -i -X POST http://localhost:3000/series \
  -H "Content-Type: application/json" \
  -d '{
    "trainingId": 1,
    "beginTimeOffset": 0,
    "endTimeOffset": 600  # например, серия длиной 10 минут
  }'
```

Ожидаемый ответ:
```
HTTP/1.1 201 Created
```

JSON:

```json
{
  "id": 1,
  "training": { "id": 1, ... },
  "beginTimeOffset": 0,
  "endTimeOffset": 600,
  "shots": [],
  "seriesNotes": []
}
```
### 10.2. Создание без обязательных полей  400
```bash
curl -i -X POST http://localhost:3000/series \
  -H "Content-Type: application/json" \
  -d '{ "trainingId": 1 }'
```

Ожидаемый ответ:
```
HTTP/1.1 400 Bad Request

{ "error": "Неверный набор полей." }
```
### 10.3. Создание с несуществующим trainingId  404
```bash
curl -i -X POST http://localhost:3000/series \
  -H "Content-Type: application/json" \
  -d '{ "trainingId": 999, "beginTimeOffset": 0 }'
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Training не найден." }
```
### 10.4. GET всех (GET /series)
```bash
curl -i http://localhost:3000/series
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON-массив всех серий с training, shots, seriesNotes.

### 10.5. GET по ID (GET /series/:id)
```bash
curl -i http://localhost:3000/series/1
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON-объект серии.

### 10.6. GET несуществующего  404
```bash
curl -i http://localhost:3000/series/999
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```
### 10.7. Обновление (PUT /series/:id)
```bash
curl -i -X PUT http://localhost:3000/series/1 \
  -H "Content-Type: application/json" \
  -d '{ "beginTimeOffset": 30, "endTimeOffset": 630 }'
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON с обновлёнными beginTimeOffset и endTimeOffset.

### 10.8. PUT несуществующего  404
```bash
curl -i -X PUT http://localhost:3000/series/999 \
  -H "Content-Type: application/json" \
  -d '{ "beginTimeOffset": 10 }'
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```
### 10.9. Удаление (DELETE /series/:id)
```bash
curl -i -X DELETE http://localhost:3000/series/1
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK

{ "message": "Удалено." }
```
### 10.10. DELETE несуществующего  404
```bash
curl -i -X DELETE http://localhost:3000/series/999
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```

## 11. Выстрелы (Shots)
**Условие**: перед созданием Shot должна существовать Series с id = seriesId.

### 11.1. Создание (POST /shots)
```bash
curl -i -X POST http://localhost:3000/shots \
  -H "Content-Type: application/json" \
  -d '{
    "seriesId": 1,
    "order": 1,
    "x": "0.1234",
    "y": "-0.4321",
    "score": "9.5",
    "timeOffset": 5
  }'
```

Ожидаемый ответ:
```
HTTP/1.1 201 Created
```
JSON:

```json
{
  "id": 1,
  "series": { "id": 1, ... },
  "order": 1,
  "x": "0.1234",
  "y": "-0.4321",
  "score": "9.5",
  "timeOffset": 5
}
```

### 11.2. Создание с несуществующим seriesId  404
```bash
curl -i -X POST http://localhost:3000/shots \
  -H "Content-Type: application/json" \
  -d '{
    "seriesId": 999,
    "order": 1,
    "x": "0.1",
    "y": "0.1",
    "score": "10.0",
    "timeOffset": 5
  }'
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Series не найден." }
```

### 11.3. Создание с некорректными полями  400
```bash
curl -i -X POST http://localhost:3000/shots \
  -H "Content-Type: application/json" \
  -d '{ "seriesId": 1, "order": 1, "x": "2.0", "y": "0.0", "score": "15.0", "timeOffset": 0 }'
```

Здесь „x=2.0“ и „score=15.0“ выйдут за допустимые диапазоны, но на уровне TypeORM мы принимаем строку.
Если предполагается валидация на уровне контроллера/сервиса, то:

Ожидаемый ответ:
```
HTTP/1.1 400 Bad Request

{ "error": "Неверный набор полей." }
```

### 11.4. GET всех (GET /shots)
```bash
curl -i http://localhost:3000/shots
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON-массив выстрелов с их связью series.

### 11.5. GET по ID (GET /shots/:id)
```bash
curl -i http://localhost:3000/shots/1
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON выстрела.

### 11.6. GET несуществующего  404
```bash
curl -i http://localhost:3000/shots/999
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```

### 11.7. Обновление (PUT /shots/:id)
```bash
curl -i -X PUT http://localhost:3000/shots/1 \
  -H "Content-Type: application/json" \
  -d '{
    "order": 2,
    "x": "0.0001",
    "y": "0.0001",
    "score": "10.0",
    "timeOffset": 10
  }'
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON c обновлённым выстрелом.

### 11.8. PUT несуществующего  404
```bash
curl -i -X PUT http://localhost:3000/shots/999 \
  -H "Content-Type: application/json" \
  -d '{ "score": "9.0" }'
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```
### 11.9. Удаление (DELETE /shots/:id)
```bash
curl -i -X DELETE http://localhost:3000/shots/1
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK

{ "message": "Удалено." }
```

### 11.10. DELETE несуществующего  404
```bash
curl -i -X DELETE http://localhost:3000/shots/999
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```
## 12. Заметки (Notes)
При создании Note нужен существующий User с id = userId.

### 12.1. Создание (POST /notes)
``` bash
curl -i -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 2,
    "content": "Это тестовая заметка длиной более десяти символов."
  }'
```

Ожидаемый ответ:
```
HTTP/1.1 201 Created
```
JSON:

```json
{
  "id": 1,
  "user": { "id": 2, ... },
  "createdAt": "2025-05-10T12:00:00.000Z",
  "editedAt": "2025-05-10T12:00:00.000Z",
  "content": "Это тестовая заметка длиной более десяти символов.",
  "trainingNotes": [],
  "seriesNotes": []
}
```

### 12.2. Создание с коротким контентом (< 10 символов)  400
```bash
curl -i -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{ "userId": 2, "content": "Short" }'
```

Ожидаемый ответ:
```
HTTP/1.1 400 Bad Request

{ "error": "Неверный набор полей." }
```
(контроллер проверяет длину content < 10)

### 12.3. Создание с несуществующим userId  404
```bash
curl -i -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 999,
    "content": "Это заметка нормальной длины"
  }'
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Пользователь не найден." }
```

### 12.4. GET всех (GET /notes)
```bash
curl -i http://localhost:3000/notes
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK

JSON-массив заметок с user, trainingNotes, seriesNotes.
```

### 12.5. GET по ID (GET /notes/:id)
```bash
curl -i http://localhost:3000/notes/1
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON заметки.

### 12.6. GET несуществующего  404
```bash
curl -i http://localhost:3000/notes/999
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```

### 12.7. Обновление (PUT /notes/:id)
```bash
curl -i -X PUT http://localhost:3000/notes/1 \
  -H "Content-Type: application/json" \
  -d '{ "content": "Обновлённая заметка, тоже длиннее десяти символов." }'
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON с новым content и обновлённым editedAt.

### 12.8. Обновление коротким контентом  400
```bash
curl -i -X PUT http://localhost:3000/notes/1 \
  -H "Content-Type: application/json" \
  -d '{ "content": "TooShort" }'
```

Ожидаемый ответ:
```
HTTP/1.1 400 Bad Request

{ "error": "content должен быть не короче 10 символов." }
```

### 12.9. PUT несуществующего  404
```bash
curl -i -X PUT http://localhost:3000/notes/999 \
  -H "Content-Type: application/json" \
  -d '{ "content": "Какой-то текст" }'
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```
### 12.10. Удаление (DELETE /notes/:id)
```bash
curl -i -X DELETE http://localhost:3000/notes/1
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK

{ "message": "Удалено." }
```
### 12.11. DELETE несуществующего  404
```bash
curl -i -X DELETE http://localhost:3000/notes/999
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```
## 13. TrainingNotes (промежуточная таблица)
Перед созданием TrainingNote должны существовать Note (noteId) и Training (trainingId).

### 13.1. Создание (POST /training-notes)
```bash
curl -i -X POST http://localhost:3000/training-notes \
  -H "Content-Type: application/json" \
  -d '{
    "noteId": 1,
    "trainingId": 1
  }'
```

Ожидаемый ответ:
```
HTTP/1.1 201 Created
```
JSON:

```json
{
  "id": 1,
  "note": { "id": 1, ... },
  "training": { "id": 1, ... }
}
```

### 13.2. Дубликат  409
```bash
# Если уже есть запись noteId=1, trainingId=1
curl -i -X POST http://localhost:3000/training-notes \
  -H "Content-Type: application/json" \
  -d '{ "noteId": 1, "trainingId": 1 }'
```

Ожидаемый ответ:
```
HTTP/1.1 409 Conflict

{ "error": "Такой связанный TrainingNote уже существует." }
```
### 13.3. Некорректные FK  404
```bash
curl -i -X POST http://localhost:3000/training-notes \
  -H "Content-Type: application/json" \
  -d '{ "noteId": 999, "trainingId": 1 }'
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Note не найден." }
```

Аналогично, если trainingId некорректен.

### 13.4. GET всех (GET /training-notes)
```bash
curl -i http://localhost:3000/training-notes
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON-массив: `[ { "id":1, "note":{...}, "training":{...} }, ... ]`

### 13.5. GET по ID (GET /training-notes/:id)
```bash
curl -i http://localhost:3000/training-notes/1
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK
```

JSON-объект TrainingNote.


### 13.6. GET несуществующего  404
```bash
curl -i http://localhost:3000/training-notes/999
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```
### 13.7. Удаление (DELETE /training-notes/:id)
```bash
curl -i -X DELETE http://localhost:3000/training-notes/1
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK

{ "message": "Удалено." }
```
### 13.8. DELETE несуществующего  404
```bash
curl -i -X DELETE http://localhost:3000/training-notes/999
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```
## 14. SeriesNotes (промежуточная таблица)
Перед созданием SeriesNote должны существовать Note (noteId) и Series (seriesId).

### 14.1. Создание (POST /series-notes)
```bash
curl -i -X POST http://localhost:3000/series-notes \
  -H "Content-Type: application/json" \
  -d '{
    "noteId": 2,
    "seriesId": 1
  }'
```

Ожидаемый ответ:
```
HTTP/1.1 201 Created
```
JSON:

```json
{
  "id": 1,
  "note": { "id": 2, ... },
  "series": { "id": 1, ... }
}
```

### 14.2. Дубликат  409
```bash
# Если уже есть noteId=2, seriesId=1
curl -i -X POST http://localhost:3000/series-notes \
  -H "Content-Type: application/json" \
  -d '{ "noteId": 2, "seriesId": 1 }'
```

Ожидаемый ответ:
```
HTTP/1.1 409 Conflict

{ "error": "Такой связанный SeriesNote уже существует." }
```
### 14.3. Некорректные FK  404
```bash
curl -i -X POST http://localhost:3000/series-notes \
  -H "Content-Type: application/json" \
  -d '{ "noteId": 999, "seriesId": 1 }'
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Note не найден." }
```
Аналогично, если seriesId некорректен.

### 14.4. GET всех (GET /series-notes)
```bash
curl -i http://localhost:3000/series-notes
```
Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON-массив: `[ { "id":1, "note":{...}, "series":{...} }, ... ]`

###14.5. GET по ID (GET /series-notes/:id)
```bash
curl -i http://localhost:3000/series-notes/1
```
Ожидаемый ответ:
```
HTTP/1.1 200 OK
```
JSON-объект SeriesNote.

### 14.6. GET несуществующего  404
```bash
curl -i http://localhost:3000/series-notes/999
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```
### 14.7. Удаление (DELETE /series-notes/:id)
```bash
curl -i -X DELETE http://localhost:3000/series-notes/1
```

Ожидаемый ответ:
```
HTTP/1.1 200 OK

{ "message": "Удалено." }
```

### 14.8. DELETE несуществующего  404
```bash
curl -i -X DELETE http://localhost:3000/series-notes/999
```

Ожидаемый ответ:
```
HTTP/1.1 404 Not Found

{ "error": "Не найдено." }
```


