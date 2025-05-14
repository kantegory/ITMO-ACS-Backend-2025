run-dev:
	docker compose -f ./docker-compose.yaml up --build -d
run-prod:
	docker compose -f ./docker-compose.prod.yaml --env-file .env.build up --build -d

stop-dev:
	docker compose -f ./docker-compose.yaml down 
stop-prod:
	docker compose -f ./docker-compose.prod.yaml down 

