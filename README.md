# Parsons-Tool

## Requirements

* [NodeJS](https://nodejs.org/) `>= v16`
* [Yarn](yarnpkg.com) `= v1`

## Setup

### Javascript Packages

```sh
yarn
```
### Set up Firebase

This project uses Firebase for authentication and authorization.
To set this up go to the [Firebase Website](https://firebase.google.com)
and set up a new project.

Go to `Project Settings > Service Accounts > Firebase Admin SDK > Generate new private key`
and save the file to `parsons-tool-backend/src/middleware/firebaseConfig.json`.

Go to `Project Settings > General`,
scroll down to your apps (and add one if neccesary).
Then copy and paste the piece of the code shown that is in the same format as below into
the relevant position in the code at `parsons-tool-frontend/src/firebase.js`.
The piece of config code should look something like this:
```js
const firebaseConfig = {
  apiKey: "AIzaSyBhui9Z9rMWx8jDAAPRvcr1rPQ6F87YuoM",
  authDomain: "unamed-parsons-problems.firebaseapp.com",
  projectId: "unamed-parsons-problems",
  storageBucket: "unamed-parsons-problems.appspot.com",
  messagingSenderId: "1084557798122",
  appId: "1:1084557798122:web:a83b20ddf84e46b7260593"
};

```

## Start Frontend

```sh
yarn start-frontend
```

## Start Backend (Docker)

Ensure that Docker Compose (or Podman Compose) is installed on your system.0


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

---

## Hosting

This service was deployed for use in the epxeriment.
The frontend was deployed to Netify, a CDN, that can handle static sites like our easily.
THe backend (API and Jobe server) was run on a Linux server hosted by Linode.
Caddy, a reverse-proxy that manages TLS certicates, was used to provide the HTTPS functionality.
Systemd was used to restart the service on failure / shutdown.
The Mongo database was hosted on Mongo Atlas Serverless, Mongo's hosted serverless solution.

