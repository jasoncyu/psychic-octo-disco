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
  setGroups: workout.ISetGroups;

  // All lifts that our app knows about.
  allLifts: workout.ILifts;
  dispatch: Redux.Dispatch;

  // From react-router
  params: any
}

@connect(
  (state, ownProps) => {
    return {}
  }
)

class Workout extends React.Component<IProps, {}> {
  componentDidMount() {
    this.props.dispatch(workout.getWorkout(this.props.params.id))
  }

  getSetGroupsJSX() {
    // R.pipe(
    //   R.keys,
    //   (setGroupID: string) => {
    //     return (
    //       <div>
    //         <select value={lift}>
    //           {Object.keys(this.props.allLifts).map((id) => {
    //              const lift = this.props.allLifts[id]
    //              return (
    //                <option key={id} value={id}>{lift.name}</option>
    //              )
    //            })}
    //         </select>
    //       </div>
    //     )
    //   }
    // )
    //
    return (<div>asdf</div>)
  }

  addSetGroup() {
    const setGroup: workout.ISetGroup = {
      workoutID: this.props.workoutID,
      percentUp: 10,
    }
  }

  render() {
    return (
      <div>
        <button
          onClick={this.addSetGroup}
        >
          Add set group
        </button>
      </div>
    )
  }
}

export { Workout }
