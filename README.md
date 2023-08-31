# todo-backend-node
This is todo project in Node.js ( Exxpress+Typescript+Knex+Postgres) as a backend 

It is based on https://todobackend.com/index.html

The entire API consists of about 5 distinct operations (create a todo, view a todo, modify a todo, list all todos, delete all todos).

## Pre-requisite
Postgres DB setup

## Steps for local setup:
1. After cloning, go to root folder and run "npm install"
2. Update DB configuretion in .env file
3. To run DB migration, run "npm run migrate" . This will create a table in Postgres DB.
4. Run "npm run start" . This will start service.
5. Try with Swagger http://localhost:8081/api-docs/ or on postman with this [collection](https://github.com/shrirajl/todo-backend-node/blob/main/Todo-backend.postman_collection.json). For swagger & postman, use the port on which service is running 

