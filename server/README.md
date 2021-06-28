# Finances Tracker API

## About

This node.js API uses TypeScript and Express as main dependencies.  
It can use docker as a way to containerize mongoDB in development environments.

## How to run ?

1. Install node dependencies by running `npm i`, or `yarn`
1. Copy .env.example template to a new file called .env

   - `MONGO_INITDB_ROOT_USERNAME` is the root mongoDB username
   - `MONGO_INITDB_ROOT_PASSWORD` is the root mongoDB password
   - `DB_PERSIST_DIRECTORY` should be filled as a directory for persisting the database data through container deactivation
   - `SECRET` is the secret key used for the encoding and decoding of Json Web Token library's tokens used in the API's auth system.
   - `DB_HOST` the hostname of the mongoDB database
   - `DB_PORT` the port of the mongoDB database
   - `PORT` port that the server will run on, defaults to 3333 if empty.

1. Run command `make up` on terminal to initialize docker container, automatically importing the `.env` file
1. Run `yarn dev` or `npm run dev` to run API in development mode

</ol>
