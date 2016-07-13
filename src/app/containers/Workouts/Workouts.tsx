import * as React from 'react'
import * as workout from '../../redux/modules/workouts'
import * as _ from 'lodash'
/* import * as Horizon from '@horizon/client';*/
const Horizon = require('@horizon/client')

const { connect } = require('react-redux')
const horizon = Horizon();
horizon.onReady(function() {
  console.log('app works')
});

horizon.connect();

interface IProps {
  workout: workout.IWorkout;
  newLift: workout.ILift;
  currentLift: workout.ILift;
  dispatch(state): any;
  lifts: workout.ILifts;
}
@connect(
  state => ({
    newLift: state.workouts.newLift,
    lifts: state.workouts.lifts,
  })
)
class Workouts extends React.Component<IProps, {}> {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    const name = evt.target.value
    this.props.dispatch({
      type: workout.CHANGE_LIFT,
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
      </div>
    )
  }
}

export { Workouts }
