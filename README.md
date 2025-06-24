# ITMO-ACS-Backend-2025

Курс по бэкенд-разработке в среде Node.JS для Университета ИТМО

# Материалы курса

- [Папка со всеми презентациями курса](https://disk.yandex.ru/d/nbVPfiSMsX_P4Q)

# Варианты лабораторного проекта

1. Сайт для поиска работы
    - Вход
    - Регистрация
    - Личный кабинет пользователя (с резюме)
    - Поиск вакансий с фильтрацией по отрасли, зарплате, опыту
    - Страница с деталями вакансии (описание, требования, компания)
    - Личный кабинет работодателя (управление вакансиями)

2. Платформа для фитнес-тренировок и здоровья
    - Вход
    - Регистрация
    - Личный кабинет пользователя (трекинг прогресса, планы тренировок)
    - Поиск тренировок с фильтрацией по уровню, типу (кардио, силовые) и продолжительности
    - Страница тренировки с видео, описанием и инструкциями
    - Блог о здоровье и питании

3. Сервис для аренды недвижимости
    - Вход
    - Регистрация
    - Личный кабинет пользователя (список арендованных и арендующихся объектов)
    - Поиск недвижимости с фильтрацией по типу, цене, расположению
    - Страница объекта недвижимости с фото, описанием и условиями аренды
    - История сообщений и сделок пользователя

4. Сервис для обмена рецептами и кулинарных блогов
    - Вход
    - Регистрация
    - Личный кабинет пользователя (сохраненные рецепты, публикации)
    - Поиск рецептов с фильтрацией по типу блюда, сложности, ингредиентам
    - Страница рецепта с фото, пошаговыми инструкциями и видео
    - Социальные функции (комментарии, лайки, подписки на кулинаров)

5. Платформа для организации путешествий
    - Вход/Регистрация
    - Личный кабинет путешественника (избранные маршруты, бронирования)
    - Поиск маршрутов с фильтрацией по бюджету, продолжительности поездки, типу отдыха
    - Карточка маршрута с описанием достопримечательностей, отзывами туристов, фото и видео
    - Социальные функции (рекомендации, отзывы, общение с другими туристами)

6. Свой вариант (необходимо отдельно согласовать, требованию остаются общими)

# Инструкция по загрузке работ

Работы нужно загружать по следующей маске: `{GROUP}/{FULL_NAME}/{TASK_TYPE}/{TASK_TYPE}{TASK_NUMBER}/{TASK_TYPE}{TASK_NUMBER}_{FULL_NAME}_{GROUP}`.

Рассмотрим на примере, вы Иванов Иван из группы БР1.1 и хотите загрузить первую домашнюю работу. В таком случае, вам надо загрузить её по следующуему пути: `БР1.1/Иванов Иван/homeworks/hw1/ДЗ1_Иванов Иван_БР1.1.pdf`, дополнительные файлы следует загружать в директорию `БР1.1/Иванов Иван/homeworks/hw1`.

Если вы хотите загрузить отчёт по лабораторной работе, то путь будет таким: `БР1.1/Иванов Иван/labs/lab1/ЛР1_Иванов Иван_БР1.1.pdf`, дополнительные файлы следует загружать в директорию `БР1.1/Иванов Иван/labs/lab1/`.

При создании коммитов следует руководствоваться спецификацией - https://www.conventionalcommits.org/en/v1.0.0/.

Не забудьте открыть Pull Request, удачи!

# 1. Введение в проблематику серверной веб-разработки

[Вводная презентация о курсе](https://disk.yandex.ru/i/igrRln4GD9LskQ)

### ДЗ1: Проектирование базы данных

**Срок:** 21.03.2025

**Задание:**

1) Выберите один из предложенных вариантов работ
2) Спроектируйте БД, придерживаясь нотации ERD (не жду полного соблюдения, можно делать через draw.io)
3) Составьте и загрузите отчёт на github
4) Подключитесь на защиту, чтобы согласовать вашу концепцию

Необходимо сделать отчёт по [шаблону](https://docs.google.com/document/d/1aAUawxv6_5k_Na7bLqrfUFANodyl89uPHXY4IKXS8WE/edit?usp=sharing)

## 1.1. Знакомство со средой Node.JS, пакетным менеджером npm

[Презентация](https://disk.yandex.ru/i/TSfYVqi3wardhw)

**Можно почитать:**

- Документация по командам npm: https://docs.npmjs.com/cli/v11/commands
- Установка nvm на Linux/MacOS: https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating
- Установка nvm на Windows: https://github.com/coreybutler/nvm-windows?tab=readme-ov-file#installation--upgrades
- Скачать node.js без nvm: https://nodejs.org/en

## 1.2. Typescript: основы языка

[Презентация](https://disk.yandex.ru/i/ZAwmFRq2blfXDA)

**Можно почитать:**

- Официальная документация TypeScript: https://www.typescriptlang.org/docs/
- Карманная книжка по TypeScript: https://www.typescriptlang.org/docs/handbook/intro.html
- Статья по основам синтаксиса: https://nuancesprog.ru/p/14210/

## 1.3. Знакомство с микрофреймворком Express

[Презентация](https://disk.yandex.ru/i/NLR1xyl_c-zh8w)

**Можно почитать:**

- Официальная документация: https://expressjs.com/en/starter/installing.html
- Пример с эндпоинтами: https://github.com/kantegory/mentoring/tree/master/28_express_endpoints

## 1.4. Знакомство с TypeORM

[Презентация](https://disk.yandex.ru/i/Exa487aUBTdsIQ)

**Можно почитать:**

- Документация typeorm: https://typeorm.io/
- Пример реализации приложения на Express + TypeORM: https://orkhan.gitbook.io/typeorm/docs/example-with-express
- Документация jsonwebtoken: https://github.com/auth0/node-jsonwebtoken#readme

### ДЗ2: Работа с TypeORM

**Срок:** 21.04.2025

**Задание:**

- Реализовать все модели данных, спроектированные в рамках ДЗ1
- Реализовать набор из CRUD-методов для работы с моделями данных средствами Express + TypeScript
- Реализовать API-эндпоинт для получения пользователя по id/email

Необходимо сделать отчёт по [шаблону](https://docs.google.com/document/d/1aAUawxv6_5k_Na7bLqrfUFANodyl89uPHXY4IKXS8WE/edit?usp=sharing)

### ЛР1: Реализация boilerplate

**Срок:** 28.04.2025

**Задание:**

Нужно написать свой boilerplate на express + TypeORM + typescript.

Должно быть явное разделение на:

- модели
- контроллеры
- роуты

Необходимо сделать отчёт по [шаблону](https://docs.google.com/document/d/1aAUawxv6_5k_Na7bLqrfUFANodyl89uPHXY4IKXS8WE/edit?usp=sharing)

Пример: [express-typeorm-boilerplate](https://github.com/kantegory/express-typeorm-boilerplate)

# 2. Тестирование, разработка и документирование RESTful API

## 2.1 REST, RESTful

[Презентация](https://disk.yandex.ru/i/MuL7VmFKmXSM9A)

**Можно почитать:**

- Сайт, посвящённый REST и RESTful: https://restfulapi.net/

### ЛР2: Реализация REST API на основе boilerplate

**Срок:** 12.05.2025

**Задание:**

По выбранному варианту необходимо будет реализовать RESTful API средствами express + typescript (используя ранее написанный boilerplate).

Необходимо сделать отчёт по [шаблону](https://docs.google.com/document/d/1aAUawxv6_5k_Na7bLqrfUFANodyl89uPHXY4IKXS8WE/edit?usp=sharing)

## 2.2 Документирование API

[Презентация](https://disk.yandex.ru/i/-lpIh8uTMn7BPw)

**Можно почитать:**

- Документация tsoa: https://tsoa-community.github.io/docs/getting-started.html
- Документация routing-controllers-openapi: https://github.com/epiphone/routing-controllers-openapi
- Документация swagger-jsdoc: https://github.com/Surnet/swagger-jsdoc
- Пример автодокументирования с tsoa: https://github.com/kantegory/mentoring/tree/master/30_express_swagger_tsoa_example
- Пример автодокументирования с routing-controllers: https://github.com/kantegory/mentoring/tree/master/29_express_swagger_routing_controllers_example
- Пример автодокументирования с swagger-jsdoc: https://github.com/kantegory/mentoring/tree/master/16_express_swagger_example
- Пример документирования в Postman: https://github.com/kantegory/mentoring/tree/master/24_postman_example

### ДЗ3: Документирование API средствами swagger и Postman

**Срок:** 12.05.2025

**Задание:**

- реализовать автодокументирование средствами swagger;
- реализовать документацию API средствами Postman.

Необходимо сделать отчёт по [шаблону](https://docs.google.com/document/d/1aAUawxv6_5k_Na7bLqrfUFANodyl89uPHXY4IKXS8WE/edit?usp=sharing)

## 2.3 Тестирование API

[Презентация](https://disk.yandex.ru/i/_tePhl6pu_ZFFA)

### ДЗ4: Тестирование API средствами Postman

**Срок:** 26.05.2025

**Задание:**

- реализовать тестирование API средствами Postman;
- написать тесты внутри Postman.

Необходимо сделать отчёт по [шаблону](https://docs.google.com/document/d/1aAUawxv6_5k_Na7bLqrfUFANodyl89uPHXY4IKXS8WE/edit?usp=sharing)

# 3. DI, IoC, Развёртывание, микросервисы, CI/CD

## 3.1 DI, IoC

[Презентация](https://disk.yandex.ru/i/YAyY5ci5-Ent4Q)

## 3.2 Микросервисы

[Презентация](https://disk.yandex.ru/i/HP1Txh-OuYwpqw)

### ЛР3: Миграция написанного API на микросервисную архитектуру

**Срок:** 02.06.2025

**Задание:**

- выделить самостоятельные модули в вашем приложении;
- провести разделение своего API на микросервисы (минимум, их должно быть 3);
- настроить сетевое взаимодействие между микросервисами.

Необходимо сделать отчёт по [шаблону](https://docs.google.com/document/d/1aAUawxv6_5k_Na7bLqrfUFANodyl89uPHXY4IKXS8WE/edit?usp=sharing)

## 3.3 Docker, docker compose

[Презентация](https://disk.yandex.ru/i/00yuT5kOA60KoQ)

### ЛР4: Контейнеризация написанного приложения средствами docker

**Срок:** 02.06.2025

**Задание:**

- реализовать Dockerfile для каждого сервиса;
- написать общий docker-compose.yml;
- настроить сетевое взаимодействие между сервисами.

Необходимо сделать отчёт по [шаблону](https://docs.google.com/document/d/1aAUawxv6_5k_Na7bLqrfUFANodyl89uPHXY4IKXS8WE/edit?usp=sharing)

## 3.4 Очереди сообщений

[Презентация](https://disk.yandex.ru/i/cbkQ91xzCjh-yA)

### ДЗ5: Реализация межсервисного взаимодействия посредством очередей сообщений

**Срок:** 18.06.2025

**Задание:**

- подключить и настроить rabbitMQ/kafka;
- реализовать межсервисное взаимодействие посредством rabbitMQ/kafka.

[Пример](https://github.com/kantegory/mentoring/tree/master/26_express_rabbitmq)

Необходимо сделать отчёт по [шаблону](https://docs.google.com/document/d/1aAUawxv6_5k_Na7bLqrfUFANodyl89uPHXY4IKXS8WE/edit?usp=sharing)

## 3.5 CI/CD

*Материал находится в разработке.*

**Можно почитать:**

- Документация по Github Actions: https://docs.github.com/en/actions
- Документация по Gitlab CI: https://docs.gitlab.com/ee/ci/

Необходимо сделать отчёт по [шаблону](https://docs.google.com/document/d/1aAUawxv6_5k_Na7bLqrfUFANodyl89uPHXY4IKXS8WE/edit?usp=sharing)

### ДЗ6: Настройка Gitlab CI/Github actions для автоматического развёртывания Node.JS-приложения

**Срок:** 18.06.2025

**Задание:**

Необходимо настроить автодеплой (с триггером на обновление кода в вашем репозитории, на определённой ветке) для вашего приложения на удалённый сервер с использованием Github Actions или Gitlab CI (любая другая CI-система также может быть использована). 

⚠️ В случае, если у вас нет возможности арендовать удалённый сервер, можно воспользоваться временной квотой в Yandex.Cloud, или любым другим аналогичным сервисом, на котором предоставляют бесплатные ресурсы на время тестирования. В том же случае, если у вас все эти квоты уже исчерпаны и нет возможности арендовать удалённый сервер самостоятельно - обратитесь ко мне лично, постараюсь предоставить вам мощности, но не делайте этого в последний момент, так шансов у вас крайне мало.

Необходимо сделать отчёт по [шаблону](https://docs.google.com/document/d/1aAUawxv6_5k_Na7bLqrfUFANodyl89uPHXY4IKXS8WE/edit?usp=sharing)
