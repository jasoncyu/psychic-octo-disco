import * as React from 'react'
import * as workout from '../../redux/modules/workouts'
import * as _ from 'lodash'
import * as router from 'react-router'
const Horizon = require('@horizon/client')
/* import Autosuggest from 'react-autosuggest'*/

const { connect } = require('react-redux')
const horizon = Horizon();
horizon.onReady(function() {
  console.log('horizon app works')
});

horizon.connect();

interface IProps {
  workouts: workout.IWorkoutSaved[];
  workout: workout.IWorkout;
  newLift: workout.ILift;
  currentLift: workout.ILift;
  dispatch(state): any;
  lifts: workout.ILifts;
  addWorkout: () => workout.IWorkout;
}

@connect(
  state => ({
    workouts: state.workouts.workouts,
    newLift: state.workouts.newLift,
    lifts: state.workouts.lifts,
  }),
  dispatch => ({
    addWorkout() {
      dispatch(workout.addWorkout({startTS: Date.now()}))
    },
    dispatch
  })
)

class Workouts extends React.Component<IProps, {}> {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(
      workout.getWorkouts()
    )
  }

  handleChange(evt) {
    const name = evt.target.value
    this.props.dispatch({
      type: 'CHANGE_LIFT',
      payload: {
        name,
      }
    })
  }

  getLifts() {
    return [
      {value: '1', label: 'Bench Press'},
      {value: '2', label: 'Deadlift'},
    ]
  }

  render() {
    return (
      <div>
        <button
          onClick={this.props.addWorkout}
        >
          Add Workout
        </button>
        <ul>
          {this.props.workouts.map(workout => {
             return (
               <li key={workout.id}>
                 <router.Link to={`/workouts/${workout.id}`}>
                   {workout.id}
                 </router.Link>
               </li>
             )
           })}
        </ul>
      </div>
    )
  }
}

export { Workouts }
