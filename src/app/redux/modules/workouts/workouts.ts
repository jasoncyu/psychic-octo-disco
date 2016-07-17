import * as model from './model'
import * as actions from './actions'

interface IState {
  // The workouts I've done.
  workouts: model.IWorkout[];
  // The current lift being built up (before being saved).
  newLift?: model.ILift;
  // The currently selected lift to add data for.
  currentLift: model.ILift;
  lifts: model.ILift[];

  // The current workout being viewed.
  workout: model.IWorkout;
  // The set groups of the current workout
  setGroups: model.ISetGroup[];
}

const initialState: IState = {
  workouts: [],
  newLift: null,
  currentLift: null,
  lifts: [],
  workout: null,
  setGroups: [],
}

interface SetAndLift {
  setGroup: model.ISetGroup;
  lift: model.ILiftSaved;
}

const getLiftSuggestions = function(allLifts: model.ILift[], value: string) {
  const inputValue = value.trim().toLowerCase()
  if (inputValue.length === 0) {
    return []
  }

  const matchingLifts = allLifts.filter(lift => {
    return lift.name.indexOf(inputValue) !== -1
  })

  return matchingLifts
}


/* Action type checkers */

/** Reducer */
export function workoutsReducer(
  state = initialState,
  action: actions.Action
) {
  if (action.type === 'GET_WORKOUTS_SUCCESS') {
    return Object.assign({}, state, {
      workouts: action.payload.workouts
    })
  } else if (action.type === 'GET_WORKOUT_SUCCESS') {
    return Object.assign({}, state, {
      workout: action.payload.workout
    })
  } else if (action.type === 'GET_SET_GROUPS_SUCCESS') {
    return Object.assign({}, state, {
      setGroups: action.payload.setGroups
    })
  } else if (action.type === 'GET_LIFTS_SUCCESS') {
    return Object.assign({}, state, {
      lifts: action.payload.lifts
    })
  } else if (action.type === 'CHANGE_LIFT_NAME_BEING_TYPED') {
    const actionSetGroupID = action.payload.setGroup.id
    const actionName = action.payload.name

    const newSetGroups = state.setGroups.map(setGroup => {
      const newSetGroup = Object.assign({}, setGroup)
      if (setGroup.id === actionSetGroupID) {
        newSetGroup.liftNameBeingTyped = actionName
        newSetGroup.liftSuggestions = getLiftSuggestions(
          state.lifts, newSetGroup.liftNameBeingTyped)
      }

      return newSetGroup
    })

    return Object.assign({}, state, {
      setGroups: newSetGroups
    })
  } else if (action.type === 'ADD_LIFT_SUCCESS') {
    const actionSetGroupID = action.payload.setGroup.id
    const actionLiftID = action.payload.id

    const setGroups = state.setGroups.map(setGroup => {
      const newSetGroup = Object.assign({}, setGroup)
      if (setGroup.id === actionSetGroupID) {
        newSetGroup.liftNameBeingTyped = ''
        newSetGroup.liftID = actionLiftID
      }

      return newSetGroup
    })

    return Object.assign({}, state, {
      setGroups
    })
  } else if (action.type === 'UPDATE_LIFT_SUGGESTIONS') {
    const actionSetGroupID = action.payload.setGroup.id
    const actionLiftName = action.payload.setGroup.liftNameBeingTyped
    const newSetGroups = state.setGroups.map(setGroup => {
      const newSetGroup = Object.assign({}, setGroup)
      if (setGroup.id === actionSetGroupID) {
        newSetGroup.liftSuggestions = getLiftSuggestions(
          state.lifts, actionLiftName)
      }

      return newSetGroup
    })

    return Object.assign({}, state, {
      setGroups: newSetGroups
    })
  }
  return state
}

// const addSet = (set: model.ISet) => {
//   liftsDB.upsert(set)
// }

// export const addSetToSetGroup = (set: model.ISet, setGroup: model.ISetGroup) => {
//   const newSetGroup = Object.assign(
//     {}, setGroup, {
//       // TODO
//       // setIDs: setGroup.setIDs.concat([set.id]),
//     })
//   setGroupsDB.replace(newSetGroup)

//   setsDB.upsert(set)
// }
