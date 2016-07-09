import * as model from './workouts.model'
import * as fb from '../firebase/firebase'
import * as actionUtils from '../actionUtils'

/** Action types */
export const ADD_WORKOUT: string = 'ADD_WORKOUT'
export const ADD_WORKOUT_REQUEST: string = 'ADD_WORKOUT_REQUEST'
export const ADD_WORKOUT_SUCCESS: string = 'ADD_WORKOUT_SUCCESS'
export const ADD_WORKOUT_ERROR: string = 'ADD_WORKOUT_ERROR'

export const CHANGE_LIFT: string = 'CHANGE_LIFT'

interface IState {
  // The workouts I've done.
  workouts: model.IWorkout[];
  // The current lift being built up (before being saved).
  newLift: model.ILift;
}

const initialState: IState = {
  workouts: [],
  newLift: {
    name: 'new lift default name'
  }
}

const changeStateAction = actionUtils.actionCreator<model.ILift>(CHANGE_LIFT)
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
