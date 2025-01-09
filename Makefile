.PHONY: db
db:
	docker compose up -d

.PHONY: prod
prod:
	docker build -t blitzed:latest .
	docker container stop blitzed
	docker container rm blitzed
	- prisma migrate deploy
	docker run --env-file .env -p 4000:3000 --name blitzed -d blitzed:latest
