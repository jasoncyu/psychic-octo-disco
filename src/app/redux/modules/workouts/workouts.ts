import * as model from './workouts.model'
import * as fb from '../firebase/firebase'
import * as actionUtils from '../actionUtils'

/** Action types */
export const ADD_WORKOUT: string = 'ADD_WORKOUT'
export const ADD_WORKOUT_REQUEST: string = 'ADD_WORKOUT_REQUEST'
export const ADD_WORKOUT_SUCCESS: string = 'ADD_WORKOUT_SUCCESS'
export const ADD_WORKOUT_ERROR: string = 'ADD_WORKOUT_ERROR'

export const CHANGE_LIFT: string = 'CHANGE_LIFT'
export const SET_CURRENT_WORKOUT: string = 'SET_CURRENT_WORKOUT'

interface IState {
  // The workouts I've done.
  workouts: model.IWorkout[];
  // The current lift being built up (before being saved).
  newLift: model.ILift;
  // The currently selected lift to add data for.
  currentLift: model.ILift;
  lifts: model.ILifts;

  // The current workout being viewed.
  workout: model.IWorkout;
  // The set groups of the current workout
  setGroupsOfWorkout: model.ISetGroups
}

const initialState: IState = {
  workouts: [],
  newLift: {
    name: '',
  },
  currentLift: {
    name: ''
  },
  lifts: {},
  workout: {
    startTS: new Date()
  },
  setGroupsOfWorkout: {}
}

const changeStateAction = actionUtils.actionCreator<model.ILift>(CHANGE_LIFT)
const firebaseLiftsChanged = actionUtils.actionCreator<model.ILifts>(
  fb.FIREBASE_LIFTS_CHANGED)
const setCurrentWorkout = actionUtils.actionCreator<model.IWorkout>(
  SET_CURRENT_WORKOUT)

/** Reducer */
export function workoutsReducer(
  state = initialState,
  action: actionUtils.Action<any>
) {
  if (actionUtils.isType(action, changeStateAction)) {
    return Object.assign({}, state, {
      newLift: action.payload
    })
  } else if (action.type === ADD_WORKOUT_SUCCESS) {
    const workout: model.IWorkout = {
      startTS: new Date()
    }
    return Object.assign({}, state, {
      workouts: state.workouts.concat([workout])
    })
  } else if (actionUtils.isType(action, firebaseLiftsChanged)) {
    return Object.assign({}, state, {
      allLifts: action.payload
    })
  } else if (actionUtils.isType(action, setCurrentWorkout)) {
    return Object.assign({}, state, {

    })
  }

  return state
}

/** Async Action Creator */
export function addWorkout(workout: model.IWorkout): Redux.Dispatch {
  return dispatch => {
    dispatch(addWorkoutRequest())

    return fb.addWorkout(workout)
    .then(() => {
      dispatch(addWorkoutSuccess())
    })
    .catch(() => {
      dispatch(addWorkoutError())
    })
  }
}


/** Action Creators */
export function addWorkoutRequest(): model.IWorkoutsAction {
  return {
    type: ADD_WORKOUT_REQUEST
  }
}

export function addWorkoutSuccess(): model.IWorkoutsAction {
  return {
    type: ADD_WORKOUT_SUCCESS
  }
}

export function addWorkoutError(): model.IWorkoutsAction {
  return {
    type: ADD_WORKOUT_ERROR
  }
}

export function changeLift() {
  return {
    type: CHANGE_LIFT
  }
}
