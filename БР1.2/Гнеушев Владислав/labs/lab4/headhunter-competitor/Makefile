.PHONY: help setup-dirs stop clean clean-networks start-dbs wait-dbs start-services status down up restart-service

help:
	@echo "Available commands:"
	@echo "  setup-dirs      - Create directories"
	@echo "  stop            - Stop containers"
	@echo "  clean           - Clean and rebuild"
	@echo "  clean-networks  - Clean networks"
	@echo "  start-dbs       - Start databases"
	@echo "  wait-dbs        - Wait for databases"
	@echo "  start-services  - Start services"
	@echo "  status          - Show status"
	@echo "  down            - Stop all"
	@echo "  up              - Full startup"

setup-dirs:
	@mkdir -p shared/nginx/conf.d shared/mysql-init mysql_data

stop:
	@docker-compose down

clean: stop
	@docker system prune -f
	@docker-compose build --no-cache

clean-networks:
	@docker network prune -f

start-dbs: setup-dirs clean-networks
	@docker-compose up -d user-db job-db application-db

wait-dbs:
	@sleep 10

start-services:
	@docker-compose up -d --build

status:
	@docker-compose ps

down:
	@docker-compose down

restart-service:
	@docker-compose restart $(SERVICE)

up: setup-dirs stop clean-networks start-dbs wait-dbs start-services

quick-up: setup-dirs clean-networks start-dbs wait-dbs start-services 