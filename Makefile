run-local:
	air
# test:
# 	cd src && dotnet test --verbosity normal --collect:"XPlat Code Coverage"

run-db:
	docker rm -f pizzerie-db && docker build -t pizzerie-db -f Dockerfile.postgres --no-cache . && docker run --name pizzerie-db -p 5432:5432 --env-file docker.env -d pizzerie-db
