run-back:
	cd ./cmd/pizzeria-backend/ && go run main.go

run-db:
	docker rm -f pizzerie-db && docker build -t pizzerie-db -f Dockerfile.postgres --no-cache . && docker run --name pizzerie-db -p 5432:5432 --env-file docker.env -d pizzerie-db
