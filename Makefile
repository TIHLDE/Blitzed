.PHONY: db
db:
	docker compose up -d

.PHONY: prod
prod:
	docker build -t blitzed.tihlde.org .
	prisma migrate deploy
	- docker rm -f blitzed.tihlde.org
	docker run --env-file .env -p 4000:3000 --name blitzed.tihlde.org --restart unless-stopped -d blitzed.tihlde.org

