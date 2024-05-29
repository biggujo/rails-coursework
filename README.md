# Social Network

## Description

This is a social network built with Ruby on Rails, Docker, and PostgreSQL.

## Contents

- [Prerequisites](#prerequisites)
- [Set up](#set-up)
- [Scripts](#scripts)

## Prerequisites

- Docker + Docker Compose
- a package manager (apt/brew/winget)

## Set up

### Development environment

> If you just need to run the app, skip this part

1. Setup hooks

```shell
./scripts/setup-hooks.sh
```

### Application

1. Run the Docker project

```shell
docker compose up
```

2. Create databases and run the migrations

```shell
docker exec -it coursework-rails rails db:create db:migrate
```

Access the services:
> - db: http://localhost:6000
> - backend: http://localhost:6001
> - frontend: http://localhost:6002

## Scripts

### Backend `rake` scripts

| Script                         | Description                                        |
|--------------------------------|----------------------------------------------------|
| `rake rubocop`                 | Run RuboCop (show offenses)                        |
| `rake rubocop:autocorrect`     | Autocorrect RuboCop offenses (only when it's safe) |
| `rake rubocop:autocorrect_all` | Autocorrect RuboCop offenses (safe and unsafe)     |

### Frontend `npm` scripts

| Script              | Description                              |
|---------------------|------------------------------------------|
| `npm run dev`       | Run the application                      |
| `npm run build`     | Get the build for a production           |
| `npm run lint`      | Run ESLint                               |
| `npm run style:fix` | Fix code style with Prettier             |
| `npm run preview`   | Run a live preview of a production build |
