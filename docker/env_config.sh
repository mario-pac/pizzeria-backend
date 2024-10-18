#!/bin/bash
export DB_HOST=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' pizzerie-db)
echo "DB_USER=postgres \nDB_PASSWORD=secret \nDB_HOST=$DB_HOST \nDB_NAME=postgres \nDB_PORT=5432" > ./docker/api.env