import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { counterReducer } from './modules/counter/counter';
import { starsReducer } from './modules/stars/stars';
import { todosReducer } from './modules/todos/todos'
import { workoutsReducer } from './modules/workouts'
const { reducer } = require('redux-connect');

const rootReducer: Redux.Reducer = combineReducers({
  routing: routerReducer,
  counter: counterReducer,
  stars: starsReducer,
  reduxAsyncConnect: reducer,
  todos: todosReducer,
  workouts: workoutsReducer,
});

export default rootReducer;
