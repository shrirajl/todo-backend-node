import { Todo } from "../dtos/todo.dto";

/**
 *
 * This is inerface for todo repository
 * @export
 * @interface ITodoRepository
 */
export interface ITodoRepository {
     getAllTodos(): Promise<Todo[]>;
     createTodo(todo: Todo): Promise<void>;
     deleteTodoById(id: number): Promise<void>;
     deleteAllTodos(): Promise<void>;
     getTodoById(id: number): Promise<Todo>;
     updateTodoById(id: number, todo: Todo ): Promise<void>;
}