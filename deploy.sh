#!/usr/bin/env bash

set -e

echo "-> Building new Docker image"
docker build -t blitzed.tihlde.org .

echo "-> Migrating database"
prisma migrate deploy

echo "-> Stopping and removing old container"
docker rm -f blitzed.tihlde.org || true

echo "-> Starting new container"
docker run --env-file .env -p 4000:3000 --name blitzed.tihlde.org --restart unless-stopped -d blitzed.tihlde.org
