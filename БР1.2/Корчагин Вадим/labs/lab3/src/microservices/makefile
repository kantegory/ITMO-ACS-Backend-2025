POSTMAN_API_KEY := $(POSTMAN_API_KEY)
COLLECTION_UID := $(COLLECTION_UID)

# swagger.json:
# 	curl http://localhost:3000/swagger.json -o swagger.json

# postman.json: swagger.json
# 	openapi2postmanv2 -s swagger.json -o postman.json -p

# wrap:
# 	jq '{ collection: . }' postman.json > wrapped-postman.json

# sync: swagger.json
# 	openapi2postmanv2 -s swagger.json -o postman.json -p
# 	jq '{ collection: . }' postman.json > wrapped-postman.json
# 	curl -X PUT https://api.getpostman.com/collections/$(COLLECTION_UID) \
# 	  -H "X-Api-Key: $(POSTMAN_API_KEY)" \
# 	  -H "Content-Type: application/json" \
# 	  -d @wrapped-postman.json

# clean:
# 	rm -f swagger.json postman.json wrapped-postman.json


# === Список микросервисов ===
SERVICES = auth-service workout-service progress-service order-service blog-service

# === Запуск всех сервисов ===
run:
	@for service in $(SERVICES); do \
		echo "▶ Starting $$service..."; \
		cd $$service && pnpm dev & cd ..; \
	done

# === Запуск конкретного сервиса ===
run-%:
	@echo "▶ Starting $*..."
	cd $*-service && pnpm dev

# === Сборка всех TS проектов ===
build:
	@for service in $(SERVICES); do \
		echo "🔨 Building $$service..."; \
		cd $$service && pnpm build && cd ..; \
	done

# === Прогон миграций ===
migrate:
	@for service in $(SERVICES); do \
		echo "📦 Running migrations for $$service..."; \
		cd $$service && pnpm migration:run && cd ..; \
	done

# === Генерация миграций (только для одного сервиса!) ===
gen-migration-%:
	@echo "⚙️ Generating migration for $*..."
	cd $*-service && pnpm migration:generate

# === Удаление node_modules + dist + логов
clean:
	@for service in $(SERVICES); do \
		echo "🧹 Cleaning $$service..."; \
		rm -rf $$service/node_modules $$service/dist; \
	done

# === Установка зависимостей
install:
	@for service in $(SERVICES); do \
		echo "📦 Installing dependencies for $$service..."; \
		cd $$service && pnpm install && cd ..; \
	done
