enum VisibilityFilter {
    SHOW_ALL,
    SHOW_COMPLETED
}
export interface ITodosState {
    todoList: TodoList,
    visibilityFilter: VisibilityFilter,
    newTodo: Todo  
}

export interface ITodoAction {
    type: string;
}

export interface IAddTodoAction extends ITodoAction {
    // The text of the next todo to add
    text: string;
}

export interface IUpdateNewTodoAction extends ITodoAction {
    // The new text of the new todo
    text: string;
}

export class Todo {
    id: string;
    text: string;
    completed: boolean;
    constructor(text: string = '') {
        this.completed = false
        this.text = text
    }

    setText(text: string): Todo {
        return new Todo(text)
    }
}

export class TodoList {
    todos: Todo[];
    constructor(todos = []) {
        this.todos = todos
    }

    addTodo(text: string): TodoList {
        const newTodos = this.todos.concat([new Todo(text)])
        return new TodoList(newTodos)
    }
}