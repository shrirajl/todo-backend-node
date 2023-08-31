import { Todo } from "../dtos/todo.dto";

/**
 * This is interface for todo service
 *
 * @export
 * @interface ITodoService
 */
export interface ITodoService {
     getAllTodos(): Promise<Todo[]>;
     createTodo(todo: Todo): Promise<void>;
     deleteTodoById(id: number): Promise<void>;
     deleteAllTodos(): Promise<void>;
     getTodoById(id: number): Promise<Todo>;
     updateTodoById(id: number, todo: Todo ): Promise<void>;


}