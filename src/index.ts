// const express = require('express');
// const dotenv = require('dotenv');

import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { TodoController } from "./controllers/todo.controller";
import { TodoService } from "./services/todo.service";
import { TodoRepository } from "./repositories/todo.repository";
import { ExceptionHandler } from "./middlewares/exception-handler.middleware";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
//const swaggerDocument = require('./swagger.json');


dotenv.config();

const app = express();
const port = process.env.PORT || 8082;

app.use(bodyParser.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req: any, res: any) => {
  res.send('Express + TypeScript Server');
});

const todoRepo = new TodoRepository();
new TodoController(app, new TodoService(todoRepo));

app.use(new ExceptionHandler().handleError);

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);
});