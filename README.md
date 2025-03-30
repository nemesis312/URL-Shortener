# URL-Shortener

# Docker Compose Example

version: '3.9'
services:
db:
image: postgres:16
container_name: pg_url_shortener
environment:
POSTGRES_USER: shortener
POSTGRES_PASSWORD: secret
POSTGRES_DB: urlshortener
ports: - "5432:5432"
volumes: - pgdata:/var/lib/postgresql/data

backend:
build: ./backend
ports: - "5000:8080"
depends_on: - db
environment: - ConnectionStrings\_\_Default=Host=db;Port=5432;Database=urlshortener;Username=shortener;Password=secret

frontend:
build: ./frontend
ports: - "4200:80"
depends_on: - backend

volumes:
pgdata:
