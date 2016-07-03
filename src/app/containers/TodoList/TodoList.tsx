import * as React from 'react';
import * as todos from '../../redux/modules/todos/todos'
import * as model from '../../redux/modules/todos/todos.model'

const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect')

interface IProps {
  todoList: model.TodoList,
  addTodo: Redux.ActionCreator,
  updateNewTodo: Redux.ActionCreator,
  // The new todo that's being built up
  newTodo: model.Todo
}

@connect(
  state => ({ todoList: state.todos.todoList }),
  dispatch => ({
    addTodo: function(text) {
      dispatch(todos.addTodo(text))
    },
    updateNewTodo: function(text) {
      dispatch(todos.updateNewTodo(text))
    },
    dispatch
  })
)
class TodoList extends React.Component<IProps, {}> {
  /**
   *
   */
  constructor() {
    super();
    
    this.updateNewTodo = this.updateNewTodo.bind(this)
  }

  updateNewTodo(evt) {
    const text = evt.target.value
    console.log('text');
    
    console.log(text);
    
    
    this.props.updateNewTodo(text)
  }

  render() {
    const { todoList } = this.props

    return (
      <div>
        {todoList.todos.map((todo) => {
          return (
            <div>
              {todo.text}
            </div>
          )
        })}
        <input 
          type="text"
          placeholder="Add todo"
          value={this.props.newTodo}
          onChange={this.updateNewTodo}
        >
        </input>
      </div>
    )
  }
}

export { TodoList }