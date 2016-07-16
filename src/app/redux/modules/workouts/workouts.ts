import * as model from './model'
import * as fb from '../firebase/firebase'
import * as actionUtils from '../actionUtils'
import * as C from './constants'

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

const changeStateAction = actionUtils.actionCreator<model.ILift>(C.CHANGE_LIFT)
const firebaseLiftsChanged = actionUtils.actionCreator<model.ILifts>(
  fb.FIREBASE_LIFTS_CHANGED)
const setCurrentWorkout = actionUtils.actionCreator<model.IWorkout>(
  C.SET_CURRENT_WORKOUT)
const updateSetGroupLift = actionUtils.actionCreator<SetAndLift>(
  C.UPDATE_SET_GROUP_LIFT
)

/** Reducer */
export function workoutsReducer(
  state = initialState,
  action: actionUtils.Action<any>
) {
  if (actionUtils.isType(action, changeStateAction)) {
    return Object.assign({}, state, {
      newLift: action.payload
    })
  } else if (actionUtils.isType(action, setCurrentWorkout)) {
    return Object.assign({}, state, {

    })
  } else if (actionUtils.isType(action, updateSetGroupLift)) {
    const newSetGroups = state.setGroups
      .filter(setGroup => setGroup.id === action.payload.setGroup.id)
      .map(setGroup => {
        setGroup.liftID = action.payload.lift.id
        return setGroup
      })
    return Object.assign({}, state, {
      setGroups: newSetGroups
    })
  } else if (action.type === C.GET_WORKOUTS_SUCCESS) {
    return Object.assign({}, state, {
      workouts: action.payload.workouts
    })
  } else if (action.type === C.GET_WORKOUT_SUCCESS) {
    return Object.assign({}, state, {
      workout: action.payload.workout
    })
  } else if (action.type === C.GET_SET_GROUPS_SUCCESS) {
    return Object.assign({}, state, {
      setGroups: action.payload.setGroups
    })
  } else if (action.type === C.GET_LIFTS_SUCCESS) {
    return Object.assign({}, state, {
      lifts: action.payload.lifts
    })
  } else if (action.type === C.CHANGE_LIFT_NAME_BEING_TYPED) {
    const newSetGroups = state.setGroups.map(setGroup => {
      const newSetGroup = Object.assign({}, setGroup)
      if (setGroup.id === action.payload.setGroup.id) {
        newSetGroup.liftNameBeingTyped = action.payload.name
        newSetGroup.liftSuggestions = getLiftSuggestions(
          state.lifts, newSetGroup.liftNameBeingTyped)
      }

      return newSetGroup
    })

    return Object.assign({}, state, {
      setGroups: newSetGroups
    })
  } else if (action.type === C.ADD_LIFT_SUCCESS) {
    const setGroups = state.setGroups.map(setGroup => {
      const newSetGroup = Object.assign({}, setGroup)
      if (setGroup.id === action.payload.setGroup.id) {
        newSetGroup.liftNameBeingTyped = ''
        newSetGroup.liftID = action.payload.id
      }

      return newSetGroup
    })

    return Object.assign({}, state, {
      setGroups
    })
  } else if (action.type === C.UPDATE_LIFT_SUGGESTIONS) {
    const newSetGroups = state.setGroups.map(setGroup => {
      const newSetGroup = Object.assign({}, setGroup)
      if (setGroup.id === action.payload.setGroup.id) {
        newSetGroup.liftSuggestions = getLiftSuggestions(
          state.lifts, action.payload.setGroup.liftNameBeingTyped)
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
