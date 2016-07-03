import * as redux from 'redux'
import * as model from './todos.model'

export const ADD_TODO: string = 'ADD_TODO'
export const UPDATE_NEW_TODO: string = 'UPDATE_NEW_TODO'

export const TOGGLE_TODO: string = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER: string = 'SET_VISIBILITY_FILTER'

// What todos are visible.
export const SHOW_ALL: string = 'SHOW_ALL'
export const SHOW_COMPLETED: string = 'SHOW_COMPLETED'

const initialState = {
    todoList: new model.TodoList(),
    visibilityFilter: SHOW_ALL,
    newTodo: new model.Todo()
}

/* Type guards */
function isAddTodoAction(action: model.ITodoAction): action is model.IAddTodoAction {
    return action.type === ADD_TODO
}
function isUpdateNewTodoAction(action: model.ITodoAction): action is model.IUpdateNewTodoAction {
  return action.type === UPDATE_NEW_TODO
}

export function todosReducer(state = initialState, action: model.ITodoAction) {
    if (isAddTodoAction(action)) {
        return Object.assign(
            {},
            state,
            {
                todoList: state.todoList.addTodo(action.text)
            })
    } else if (isUpdateNewTodoAction(action)) {
        console.log(state.newTodo);
        debugger
        return Object.assign(
            {},
            state,
            {
                newTodo: state.newTodo.setText(action.text)
            }
        )
    }

    return state
}

// Action creator
export function addTodo(text: string): model.IAddTodoAction {
    return {
        type: ADD_TODO,
        text
    }
}

/**
 * Action creator
 */

export function updateNewTodo(text: string): model.IUpdateNewTodoAction {
    return {
        type: UPDATE_NEW_TODO,
        text
    }
}