import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  App, Home, About, Counter, Stars, TodoList, Workouts, Workout
} from './containers';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
    <Route path="counter" component={Counter} />
    <Route path="stars" component={Stars} />
    <Route path="todos" component={TodoList} />
    <Route path="workouts" component={Workouts} />
    <Route path="workouts/:id" component={Workout} />
  </Route>
);
