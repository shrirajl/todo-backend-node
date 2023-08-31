import { ITodoService } from "../services/todo-interface.service";
import  express  from "express";
import { CustomException } from "../exceptions/custom-exception";
import * as constants from "../utils/constants";

/**
 * This is controller class for Todo
 *
 * @export
 * @class TodoController
 */
export class TodoController {
   
   
    todoService: ITodoService
    app: any;
    constructor(app: express.Application, todoService: ITodoService) {
        this.todoService = todoService;
        this.app = app;
        this.getAllTodos = this.getAllTodos.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.deleteAllTodos = this.deleteAllTodos.bind(this);
        this.getTodoById = this.getTodoById.bind(this);
        this.updateTodoById = this.updateTodoById.bind(this);
        this.deleteTodoById = this.deleteTodoById.bind(this);
        this.registerRoutes();
    }

    /**
     *This method registers routes
     *
     * @memberof TodoController
     */
    registerRoutes(){
        this.app.route("/todos")
        .get(this.getAllTodos)
        .post(this.createTodo)
        .delete(this.deleteAllTodos);
        this.app.route("/todos/:id")
        .get(this.getTodoById)
        .delete(this.deleteTodoById)
        .patch(this.updateTodoById);

    }

    /**
     *
     *This method get all todos
     * @param {Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @memberof TodoController
     */
    async getAllTodos(req: Request, res: express.Response, next: express.NextFunction) {
        console.log("Start of the method  TodoController.getAllTodos")
        
        try{
            const todos = await this.todoService.getAllTodos();
             res.status(200).send(todos); 
        } catch (error) {
            console.error("Error while gettig all todos:", error);
        }
    }

    /**
     *
     * This method deletes all Todos
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @memberof TodoController
     */
    async deleteAllTodos(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log("Start of the method  TodoController.deleteAllTodos");
        try{
            await this.todoService.deleteAllTodos();
            res.status(204).send(""); 
        } catch (error) {
            console.error("Error while deleting all todos:", error);
            next(error);
        }
        
    }
    
    /**
     * This method creates a Todo
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @memberof TodoController
     */
    async createTodo(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log("Start of the method  TodoController.createTodo", req.body);
         
        try {
            let todo = req.body;
            this.validateTodo(todo);
            await this.todoService.createTodo(todo);
            res.status(201).send(""); 
        } catch (error) {
            console.error("Error while creating todo:", error);
            next(error);
        }
    }

    /**
     * This method updates a Todo by id
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @memberof TodoController
     */
    async updateTodoById(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log("Start of the method  TodoController.updateTodoById");
        try{
            let todo = req.body;
            this.validateTodo(todo);
            this.validateId(req.params.id);
             await this.todoService.updateTodoById(Number(req.params.id), todo);
             res.status(204).send(""); 
        } catch (error) {
            console.error("Error while updating todo:", error);
            next(error);
        }
    }

    /**
     *  This method deletes a Todo by id
     */
    async deleteTodoById(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log("Start of the method  TodoController.deleteTodoById");
        try{
            this.validateId(req.params.id);
            await this.todoService.deleteTodoById(Number(req.params.id));
             res.status(204).send(""); 
        } catch (error) {
            console.error("Error while deleting todo:", error);
            next(error);
        }
    }
    /**
     * This method get todo by Id
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @memberof TodoController
     */
    async getTodoById(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log("Start of the method  TodoController.getTodoById");
        try{
            this.validateId(req.params.id);
            const todo = await this.todoService.getTodoById(Number(req.params.id));
            if(!todo) {
                throw new CustomException(404, constants.ERR_MESSAGE_NOT_FOUND);
            }
             res.status(200).send(todo); 
        } catch (error) {
            console.error("Error while getting todos:", error);
            next(error);
        }
    }
    
    /**
     * This method validates todo object
     *
     * @private
     * @param {*} todo
     * @memberof TodoController
     */
    private validateTodo(todo: any){
        
        if(todo.title && (typeof todo.title !== "string" || todo.title.trim().length < 1 )) {
            throw new CustomException(400, constants.ERR_MESSAGE_INVALID_TITLE);
        }

        if(todo.order && !Number.isInteger(todo.order)) {
            throw new CustomException(400, constants.ERR_MESSAGE_INVALID_ORDER);
        }

        if(todo.completed &&  typeof todo.completed !== "boolean"  ) {
            throw new CustomException(400, constants.ERR_MESSAGE_INVALID_COMPLETED);
        }
        if(todo.id) {
            delete todo["id"];
        }

    }

    /**
     * this method validates id param in the URL.
     *
     * @private
     * @param {*} id
     * @memberof TodoController
     */
    private validateId(id: any)
    {
        if(!Number.isInteger(Number(id)) ) {
            throw new CustomException(400, constants.ERR_MESSAGE_INVALID_PARAM_ID);
        }
    }
    
    
}