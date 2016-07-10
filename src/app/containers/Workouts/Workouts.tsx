import * as React from 'react'
import * as workout from '../../redux/modules/workouts'
import * as _ from 'lodash'

const { connect } = require('react-redux')

interface IProps {
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
    console.log(this.props.newLift)
    return (
      <div>
        <select value={this.props.currentLift}>
          {Object.keys(this.props.lifts).map((id) => {
            const lift = this.props.lifts[id]
            return (
              <option key={id} value={id}>{lift.name}</option>
            )
          })}
        </select>
        <input
          type="text"
          value={this.props.newLift.name}
          onChange={this.handleChange}
        />
        {this.props.newLift.name}
      </div>
    )
  }
}

export { Workouts }
