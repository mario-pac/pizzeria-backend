api:
	$(MAKE) run-db && $(MAKE) run-api

run-api:
	sh ./docker/env_config.sh && docker rm -f pizzerie-api && docker build -t pizzerie-api -f docker/Dockerfile.api --no-cache . && docker run --name pizzerie-api -p 8080:8080 --env-file docker/api.env -d pizzerie-api

run-db:
	docker rm -f pizzerie-db && docker build -t pizzerie-db -f docker/Dockerfile.postgres --no-cache .  && docker run --name pizzerie-db -p 5432:5432 --env-file docker/database.env -d pizzerie-db