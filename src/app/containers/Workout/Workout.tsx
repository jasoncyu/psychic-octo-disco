import * as workout from '../../redux/modules/workouts'
import * as React from 'react'
import * as R from 'ramda'

// Need to use require() because 'react-autosuggest' isn't known at compile-time
// import * as Autosuggest from 'react-autosuggest';
const Autosuggest = require('react-autosuggest')

const { connect } = require('react-redux')


interface IProps {
  // The workoutID from the router
  workoutID: string;
  workout: workout.IWorkoutSaved;
  addLift: (setGroup: workout.ISetGroup) => void;

  // The lifts already present on this workout
  setGroups: workout.ISetGroup[];

  // All lifts that our app knows about.
  allLifts: workout.ILift[];
  dispatch: Redux.Dispatch;

  // From react-router
  params: any
}


const renderLiftSuggestion = (suggestion: workout.ILift) => {
  return <span>{suggestion.name}</span>
}

const getSuggestionValue = (suggestion: workout.ILift) => {
  return suggestion.name
}

@connect(
  (state, ownProps) => {
    return {
      setGroups: state.workouts.setGroups,
      allLifts: state.workouts.lifts,
    }
  },
  (dispatch) => {
    return {
      addLift(setGroup: workout.ISetGroup) {
        const liftName = setGroup.liftNameBeingTyped
        dispatch(workout.addLift(
          setGroup,
          {
            name: liftName
          }))
      },
      dispatch
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
      /* const onSuggestionsUpdateRequested = ({ value }) => {*/
      /* this.props.dispatch(workout.updateLiftSuggestions(setGroup, value))*/
      /* }*/
      const inputProps = {
        value: setGroup.liftNameBeingTyped,
        onChange: (event, {newValue}) => {
          this.props.dispatch(workout.changeLiftNameBeingTyped(setGroup, newValue))
        },
        type: 'search',
        placeholder: 'Enter lift name'
      }
      return (
        <div>
          {setGroup.id}
          <Autosuggest
            suggestions={setGroup.liftSuggestions}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderLiftSuggestion}
            inputProps={inputProps}
          />

          <input
            type="text"
            onChange={(evt) => {
              const target = evt.target as any
              this.props.dispatch(workout.changeLiftNameBeingTyped(setGroup, target.value))
            }}
          />

          <button
            onClick={() =>{
              this.props.addLift(setGroup)
            }}
          >
            Add Lift
          </button>

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
