import { ITodoService } from "./todo-interface.service";
import { Todo } from "../dtos/todo.dto";
import { ITodoRepository } from "../repositories/todo-interface.repository";

/**
 *
 * This is implementation class for Todo service
 * @export
 * @class TodoService
 * @implements {ITodoService}
 */
export class TodoService implements ITodoService{
    todoRepository: ITodoRepository;
    constructor(todoRepository: ITodoRepository){
        this.todoRepository = todoRepository;

    }
    
    public getAllTodos(): Promise<Todo[]> {
        return this.todoRepository.getAllTodos();
    }
    
    public createTodo(todo: Todo): Promise<void> {
        return this.todoRepository.createTodo(todo);
    }
    
    public deleteTodoById(id: number): Promise<void> {
        return this.todoRepository.deleteTodoById(id);

    }

    public getTodoById(id: number): Promise<Todo> {
        return this.todoRepository.getTodoById(id);

    }

    public updateTodoById(id: number, todo: Todo ): Promise<void> {
        return this.todoRepository.updateTodoById(id, todo);

    }

    public deleteAllTodos(): Promise<void> {
        return this.todoRepository.deleteAllTodos();

    }

}