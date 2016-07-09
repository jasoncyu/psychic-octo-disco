import * as React from 'react'
import * as workout from '../../redux/modules/workouts'

const { connect } = require('react-redux')

interface IProps {
  newLift: workout.ILift;
  dispatch(state): any;
}
@connect(
  state => ({
    newLift: state.workouts.newLift,
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
