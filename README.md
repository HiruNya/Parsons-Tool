# Parsons-Tool

## Requirements

* [NodeJS](https://nodejs.org/) `>= v16`
* [Yarn](yarnpkg.com) `= v1`

## Setup

```sh
yarn
```

## Start Frontend

```sh
yarn start-frontend
```

## Start Backend (Docker)

Ensure that Docker Compose (or Podman Compose) is installed on your system.0

### Set up Firebase

This project uses Firebase for authentication and authorization.
To set this up go to the [Firebase Website](https://firebase.google.com)
and set up a new project.
Go to `Project Settings > Service Accounts > Firebase Admin SDK > Generate new private key`
and save the file to `parsons-tool-backend/src/middleware/firebaseConfig.json`.

### To set up a database running locally as well

```sh
# in parsons-tool-backend/
docker --profile local compose up -d
```

### If you'd like the backend to use an external database

Create a file called `.env` in the `parsons-tool-backend` folder
with the following content

```sh
MONGO_DB=<YOUR_MONGO_DB_URL>
```

And then run

```sh
# in parsons-tool-backend/
docker compose up -d
```

Alternatively you can pass the `MONGO_DB` variable in
when running the backend using docker or yarn.

## Start Backend Dev

```sh
yarn start-backend
```

