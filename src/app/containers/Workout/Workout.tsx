import * as firebase from '../../redux/modules/firebase/firebase'
import * as workout from '../../redux/modules/workouts'
import * as React from 'react'
import * as R from 'ramda'

const { connect } = require('react-redux')


interface IProps {
  // The workoutID from the router
  workoutID: string;
  workout: workout.IWorkoutSaved;
  addLift: () => void;

  // The lifts already present on this workout
  setGroups: workout.ISetGroup[];

  // All lifts that our app knows about.
  allLifts: workout.ILifts;
  dispatch: Redux.Dispatch;

  // From react-router
  params: any
}

@connect(
  (state, ownProps) => {
    return {
      setGroups: state.workouts.setGroups,
      allLifts: state.workouts.lifts
    }
  }
)

class Workout extends React.Component<IProps, {}> {
  constructor() {
    super()
    this.addSetGroup = this.addSetGroup.bind(this)
    this.getSetGroupsJSX = this.getSetGroupsJSX.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(workout.getWorkout(this.props.params.id))
    this.props.dispatch(workout.getSetGroups(this.props.params.id))
    this.props.dispatch(workout.getLifts())
  }

  addSetGroup() {
    const setGroup: workout.ISetGroup = {
      workoutID: this.props.params.id,
      percentUp: 10,
    }
    this.props.dispatch(workout.addSetGroup(setGroup))
  }

  getSetGroupsJSX() {
    if (this.props.setGroups === null) {
      return
    }

    return this.props.setGroups.map(setGroup => {
      return (
        <div>
          {setGroup.id}
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <button
          onClick={this.addSetGroup}
        >
          Add set group
        </button>
        {this.getSetGroupsJSX()}
      </div>
    )
  }
}

export { Workout }
