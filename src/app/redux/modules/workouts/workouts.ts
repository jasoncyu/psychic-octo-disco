import * as model from './workouts.model'
import * as fb from '../firebase/firebase'
import * as actionUtils from '../actionUtils'

const Horizon = require('@horizon/client')
const hz = new Horizon();

/** Action types */
export const ADD_WORKOUT: string = 'ADD_WORKOUT'
export const ADD_WORKOUT_REQUEST: string = 'ADD_WORKOUT_REQUEST'
export const ADD_WORKOUT_SUCCESS: string = 'ADD_WORKOUT_SUCCESS'
export const ADD_WORKOUT_ERROR: string = 'ADD_WORKOUT_ERROR'

export const CHANGE_LIFT: string = 'CHANGE_LIFT'
export const SET_CURRENT_WORKOUT: string = 'SET_CURRENT_WORKOUT'

export const GET_WORKOUT_REQUEST: string = 'GET_WORKOUT_REQUEST'
export const GET_WORKOUT_SUCCESS: string = 'GET_WORKOUT_SUCCESS'
export const GET_WORKOUT_ERROR: string = 'GET_WORKOUT_ERROR'

export const ADD_SET_REQUEST: string = 'ADD_SET_REQUEST'
export const ADD_SET_SUCCESS: string = 'ADD_SET_SUCCESS'
export const ADD_SET_ERROR: string = 'ADD_SET_ERROR'

export const GET_WORKOUTS_REQUEST: string = 'GET_WORKOUTS_REQUEST'
export const GET_WORKOUTS_SUCCESS: string = 'GET_WORKOUTS_SUCCESS'
export const GET_WORKOUTS_ERROR: string = 'GET_WORKOUTS_ERROR'

// Update the LIFT that a set group belongs to
export const UPDATE_SET_GROUP_LIFT = 'UPDATE_SET_GROUP_LIFT'

// Get all lifts
export const GET_LIFTS_REQUEST: string = 'GET_LIFTS_REQUEST'
export const GET_LIFTS_SUCCESS: string = 'GET_LIFTS_SUCCESS'
export const GET_LIFTS_ERROR: string = 'GET_LIFTS_ERROR'

interface IState {
  // The workouts I've done.
  workouts: model.IWorkout[];
  // The current lift being built up (before being saved).
  newLift?: model.ILift;
  // The currently selected lift to add data for.
  currentLift: model.ILift;
  lifts: model.ILifts;

  // The current workout being viewed.
  workout: model.IWorkout;
  // The set groups of the current workout
  setGroups: model.ISetGroupSaved[];
}

const initialState: IState = {
  workouts: [],
  newLift: null,
  currentLift: null,
  lifts: {},
  workout: null,
  setGroups: [],
}

interface SetAndLift {
  setGroup: model.ISetGroupSaved;
  lift: model.ILiftSaved;
}

const changeStateAction = actionUtils.actionCreator<model.ILift>(CHANGE_LIFT)
const firebaseLiftsChanged = actionUtils.actionCreator<model.ILifts>(
  fb.FIREBASE_LIFTS_CHANGED)
const setCurrentWorkout = actionUtils.actionCreator<model.IWorkout>(
  SET_CURRENT_WORKOUT)
const updateSetGroupLift = actionUtils.actionCreator<SetAndLift>(
  UPDATE_SET_GROUP_LIFT
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
  } else if (actionUtils.isType(action, firebaseLiftsChanged)) {
    return Object.assign({}, state, {
      allLifts: action.payload
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
  } else if (action.type === GET_WORKOUTS_SUCCESS) {
    return Object.assign({}, state, {
      workouts: action.payload.workouts
    })
  } else if (action.type === GET_WORKOUT_SUCCESS) {
    return Object.assign({}, state, {
      workout: action.payload.workout
    })
  }

  return state
}

/** Async Action Creator */
export function getWorkouts(): Redux.Dispatch {
  return dispatch => {
    dispatch({
      type: GET_WORKOUTS_REQUEST
    })

    hz('workouts').watch().subscribe(workouts => {
      dispatch({
        type: GET_WORKOUTS_SUCCESS,
        payload: {
          workouts
        }
      })
      return workouts
    }, (err) => {
      dispatch({
        type: GET_WORKOUTS_ERROR
      })
    })
  }
}

export function getWorkout(id: string) {
  return dispatch => {
    dispatch(getWorkoutRequest(id))

    hz('workouts').find(id).watch().subscribe(workout => {
      dispatch(getWorkoutSuccess(workout))
    }, (err) => {
      dispatch(getLiftsError(err))
    })
  }
}

export function addWorkout(workout: model.IWorkout): Redux.Dispatch {
  return dispatch => {
    dispatch(addWorkoutRequest())

    hz('workouts').store(workout)
      .subscribe((id) => {
        dispatch(addWorkoutSuccess())
      }, (err) => {
        dispatch(addWorkoutError())
      })
  }
}


/** Action Creators */
export function getWorkoutRequest(id: string): model.IGetWorkoutAction {
  return {
    type: GET_WORKOUT_REQUEST,
    payload: {
      id
    }
  }
}

export function getWorkoutSuccess(workout: model.IWorkout): model.IWorkoutsAction {
  return {
    type: GET_WORKOUT_SUCCESS,
    payload: {
      workout
    }
  }
}

export function getWorkoutError(err: any): model.IWorkoutsAction {
  return {
    type: GET_WORKOUT_ERROR,
    error: err
  }
}

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

export function addSetRequest(): model.IWorkoutsAction {
  return {
    type: ADD_SET_REQUEST
  }
}

export function addSetSuccess(): model.IWorkoutsAction {
  return {
    type: ADD_SET_SUCCESS
  }
}

export function addSetError(): model.IWorkoutsAction {
  return {
    type: ADD_SET_ERROR
  }
}

export function getLiftsRequest(): model.IWorkoutsAction {
  return {
    type: GET_LIFTS_REQUEST
  }
}

export function getLiftsSuccess(): model.IWorkoutsAction {
  return {
    type: GET_LIFTS_SUCCESS
  }
}

export function getLiftsError(error): model.IWorkoutsAction {
  return {
    type: GET_LIFTS_ERROR,
    error
  }
}

export function getLiftsAsync() {
  return (dispatch) => {
    dispatch(getLiftsRequest())

    liftsDB.findAll({})
  }
}

export function changeLift() {
  return {
    type: CHANGE_LIFT
  }
}


const liftsDB = hz('lifts')
const setsDB = hz('sets')
const setGroupsDB = hz('setGroups')

const addSet = (set: model.ISet) => {
  liftsDB.upsert(set)
}

export const addSetToSetGroup = (set: model.ISet, setGroup: model.ISetGroup) => {
  const newSetGroup = Object.assign(
    {}, setGroup, {
      // TODO
      // setIDs: setGroup.setIDs.concat([set.id]),
    })
  setGroupsDB.replace(newSetGroup)

  setsDB.upsert(set)
}
