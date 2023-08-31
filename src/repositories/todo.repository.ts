import { knex } from "knex";
import { Todo } from "../dtos/todo.dto";
import { CustomException } from "../exceptions/custom-exception";
import * as constants from "../utils/constants";
import { ITodoRepository } from "./todo-interface.repository";

/**
 *
 * This is Repository class which connects with postgres DB
 * @export
 * @class TodoRepository
 * @implements {ITodoRepository}
 */
export class TodoRepository implements ITodoRepository{
    constructor(){

    }
    
    /**
     * fetches all Todo order by order
     *
     * @return {*}  {Promise<any[]>}
     * @memberof TodoRepository
     */
    public async getAllTodos(): Promise<any[]> {
        const dbConnection = this.getDatabaseConnection(); console.log("db", dbConnection.client.config);
        try {
            return await dbConnection("todos").orderBy("order");
        } finally {
            dbConnection.destroy();
        }
    }
    /**
     * Insert new to in the DB
     *
     * @param {Todo} todo
     * @return {*}  {Promise<void>}
     * @memberof TodoRepository
     */
    public async createTodo(todo: Todo): Promise<void> {
        const dbConnection = this.getDatabaseConnection(); console.log("db", dbConnection.client.config, todo);
        try {
            await dbConnection('todos').insert(todo);
        } finally {
            dbConnection.destroy();
        }
        
    }
    /**
     * fetch single todo by id
     *
     * @param {number} id
     * @return {*}  {Promise<any>}
     * @memberof TodoRepository
     */
    public async getTodoById(id: number): Promise<any> {
        const dbConnection = this.getDatabaseConnection(); console.log("id", id);
        try {
            return await dbConnection("todos").where('id',id).first();
        } finally {
            dbConnection.destroy();
        }

    }
    /**
     * updates todo in db. throw exception if not updated
     *
     * @param {number} id
     * @param {Todo} todo
     * @return {*}  {Promise<void>}
     * @memberof TodoRepository
     */
    public async updateTodoById(id: number, todo: Todo ): Promise<void> {
        const dbConnection = this.getDatabaseConnection(); console.log("db", dbConnection.client.config, todo);
        try {
            const updatedRows = await dbConnection('todos').update(todo).where('id', id);
            if(updatedRows === 0) {
                throw new CustomException(404, constants.ERR_MESSAGE_NOT_FOUND );
            }
        } finally {
            dbConnection.destroy();
        }

    }
    /**
     *
     * delete todo in DB
     * @param {number} id
     * @return {*}  {Promise<void>}
     * @memberof TodoRepository
     */
    public async deleteTodoById(id: number): Promise<void> {
        const dbConnection = this.getDatabaseConnection(); console.log("id", id);
        try {
             await dbConnection("todos").del().where('id',id);
        } finally {
            dbConnection.destroy();
        }
    }

    /**
     * deletes all Todos
     *
     * @return {*}  {Promise<void>}
     * @memberof TodoRepository
     */
    public async deleteAllTodos(): Promise<void> {
        const dbConnection = this.getDatabaseConnection(); console.log("db", dbConnection.client.config);
        try {
            await dbConnection("todos").del();
        } finally {
            dbConnection.destroy();
        }
       
    }

    /**
     *
     * method to get conection object
     * @private
     * @return {*} 
     * @memberof TodoRepository
     */
    private getDatabaseConnection() {
        const config = {
            client: 'pg',
            connection: {
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                database: process.env.DB_NAME, 
                user: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                ssl: process.env.DB_SSL? { rejectUnauthorized: false } : false,
            }
    }

    return knex(config);
}



}