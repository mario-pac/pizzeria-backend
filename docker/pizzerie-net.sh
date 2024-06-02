#!/bin/bash

rede="pizzerie-net"

if docker network inspect "$rede" &> /dev/null; then
    docker network rm "$rede"
docker network create pizzeria-net
fi
