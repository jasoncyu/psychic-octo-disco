import * as firebase from '../../redux/modules/firebase/firebase'
import * as workout from '../../redux/modules/workouts'
import * as React from 'react'
import * as R from 'ramda'

const { connect } = require('react-redux')

interface IProps {
  // The workoutID from the router
  workoutID: string;
  workout: workout.IWorkout;
  addLift: () => void;

  // The lifts already present on this workout
  setGroups: workout.ISetGroups;

  // All lifts that our app knows about.
  allLifts: workout.ILifts;
}

@connect(
  (state, ownProps) => {
    const workoutSetGroups = R.pickBy(
      (setGroup) => setGroup.workoutID === ownProps.workoutID,
      state.workouts
    )
    return {
      setGroups: workoutSetGroups,
      allLifts: state.workouts.lifts,
    }
  }
)
class Workout extends React.Component<IProps, {}> {
  componentDidMount() {
    firebase.getWorkoutByID(this.props.workoutID).then(
      (workout: workout.IWorkout) => {
        this.props.workout = workout
      })
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
    // const setGroup: workout.ISetGroup = {
    //   setIDs: [],
    //   workoutID: this.props.workoutID,
    //   percentUp: 10,
    // }
  }

  render() {
    return (
      <div>
        {this.props.workout.startTS}
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
