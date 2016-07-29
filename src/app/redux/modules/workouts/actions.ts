import * as model from './model'

/** Action Creators */
export interface GetSetGroupsRequestAction {
  type: 'GET_SET_GROUPS_REQUEST'
}
export function getSetGroupsRequest(
  workoutID: string): model.IWorkoutsAction {
  return {
    type: 'GET_SET_GROUPS_REQUEST',
    payload: {
      workoutID
    }
  }
}
export interface GetSetGroupsSuccessAction {
  type: 'GET_SET_GROUPS_SUCCESS',
  payload: {
    setGroups: model.ISetGroup[]
  }
}
export function getSetGroupsSuccess(
  setGroups: model.ISetGroup[]
): GetSetGroupsSuccessAction {
  return {
    type: 'GET_SET_GROUPS_SUCCESS',
    payload: {
      setGroups
    }
  }
}

export interface GetSetGroupsErrorAction {
  type: 'GET_SET_GROUPS_ERROR'
}
export function getSetGroupsError(): GetSetGroupsErrorAction {
  return {
    type: 'GET_SET_GROUPS_ERROR'
  }
}

export interface AddSetGroupRequestAction {
  type: 'ADD_SET_GROUP_REQUEST',
  payload: {
    setGroup: model.ISetGroup
  }
}
export function addSetGroupRequest(
  setGroup: model.ISetGroup): AddSetGroupRequestAction {
  return {
    type: 'ADD_SET_GROUP_REQUEST',
    payload: {
      setGroup
    }
  }
}

export interface AddSetGroupSuccessAction {
  type: 'ADD_SET_GROUP_SUCCESS'
}
export function addSetGroupSuccess(): AddSetGroupSuccessAction {
  return {
    type: 'ADD_SET_GROUP_SUCCESS'
  }
}
export interface AddSetGroupErrorAction {
  type: 'ADD_SET_GROUP_ERROR',
  error: Error
}
export function addSetGroupError(error: Error): AddSetGroupErrorAction {
  return {
    type: 'ADD_SET_GROUP_ERROR',
    error
  }
}

export interface GetWorkoutRequestAction {
  type: 'GET_WORKOUT_REQUEST',
  payload: {
    id: string
  }
}
export function getWorkoutRequest(id: string): GetWorkoutRequestAction {
  return {
    type: 'GET_WORKOUT_REQUEST',
    payload: {
      id
    }
  }
}

export interface GetWorkoutSuccessAction {
  type: 'GET_WORKOUT_SUCCESS',
  payload: {
    workout: model.IWorkout
  }
}
export function getWorkoutSuccess(
  workout: model.IWorkout
): model.IGetWorkoutSuccessAction {
  return {
    type: 'GET_WORKOUT_SUCCESS',
    payload: {
      workout
    }
  }
}

export interface GetWorkoutsSuccessAction {
  type: 'GET_WORKOUTS_SUCCESS',
  payload: {
    workouts: model.IWorkout[]
  }
}
export function getWorkoutsSuccess(
  workouts: model.IWorkout[]
): GetWorkoutsSuccessAction {
  return {
    type: 'GET_WORKOUTS_SUCCESS',
    payload: {
      workouts
    }
  }
}

export interface GetWorkoutErrorAction {
  type: 'GET_WORKOUT_ERROR',
  error: any
}
export function getWorkoutError(err: any): GetWorkoutErrorAction {
  return {
    type: 'GET_WORKOUT_ERROR',
    error: err
  }
}

export interface AddWorkoutRequestAction {
  type: 'ADD_WORKOUT_REQUEST'
}
export function addWorkoutRequest(): AddWorkoutRequestAction {
  return {
    type: 'ADD_WORKOUT_REQUEST'
  }
}

export interface AddWorkoutSuccessAction {
  type: 'ADD_WORKOUT_SUCCESS'
}
export function addWorkoutSuccess(): AddWorkoutSuccessAction {
  return {
    type: 'ADD_WORKOUT_SUCCESS'
  }
}

export interface AddWorkoutErrorAction {
  type: 'ADD_WORKOUT_ERROR'
}
export function addWorkoutError(): AddWorkoutErrorAction {
  return {
    type: 'ADD_WORKOUT_ERROR'
  }
}

export interface AddSetRequestAction {
  type: 'ADD_SET_REQUEST'
}
export function addSetRequest(): AddSetRequestAction {
  return {
    type: 'ADD_SET_REQUEST'
  }
}

export interface AddSetSuccessAction {
  type: 'ADD_SET_SUCCESS'
}
export function addSetSuccess(): AddSetSuccessAction {
  return {
    type: 'ADD_SET_SUCCESS'
  }
}

export interface AddSetErrorAction {
  type: 'ADD_SET_ERROR'
}
export function addSetError(): AddSetErrorAction {
  return {
    type: 'ADD_SET_ERROR'
  }
}

export interface GetLiftsRequestAction {
  type: 'GET_LIFTS_REQUEST'
}
export function getLiftsRequest(): GetLiftsRequestAction {
  return {
    type: 'GET_LIFTS_REQUEST'
  }
}

export interface GetLiftsSuccessAction {
  type: 'GET_LIFTS_SUCCESS',
  payload: {
    lifts: model.ILift[]
  }
}
export function getLiftsSuccess(lifts: model.ILift[]): GetLiftsSuccessAction {
  return {
    type: 'GET_LIFTS_SUCCESS',
    payload: {
      lifts
    }
  }
}

export interface GetLiftsErrorAction {
  type: 'GET_LIFTS_ERROR',
  error: any
}
export function getLiftsError(error): GetLiftsErrorAction {
  return {
    type: 'GET_LIFTS_ERROR',
    error
  }
}

export interface ChangeLiftAction {
  type: 'CHANGE_LIFT'
}
export function changeLift() {
  return {
    type: 'CHANGE_LIFT'
  }
}

export interface ChangeLiftNameBeingTypedAction {
  type: 'CHANGE_LIFT_NAME_BEING_TYPED',
  payload: {
    setGroup: model.ISetGroup,
    name: string
  }
}
export function changeLiftNameBeingTyped(
  setGroup: model.ISetGroup,
  name: string
): ChangeLiftNameBeingTypedAction {
  return {
    type: 'CHANGE_LIFT_NAME_BEING_TYPED',
    payload: {
      setGroup,
      name
    }
  }
}

export interface AddLiftRequestAction {
  type: 'ADD_LIFT_REQUEST',
  payload: {
    setGroup: model.ISetGroup,
    lift: model.ILift
  }
}
export function addLiftRequest(
  setGroup: model.ISetGroup, lift: model.ILift
): AddLiftRequestAction {
  return {
    type: 'ADD_LIFT_REQUEST',
    payload: {
      setGroup,
      lift
    }
  }
}

export interface AddLiftSuccessAction {
  type: 'ADD_LIFT_SUCCESS',
  payload: {
    id: string,
    setGroup: model.ISetGroup
  }
}
export function addLiftSuccess(
  id: string, setGroup: model.ISetGroup
): AddLiftSuccessAction {
  return {
    type: 'ADD_LIFT_SUCCESS',
    payload: {
      id,
      setGroup
    }
  }
}

export interface AddLiftErrorAction {
  type: 'ADD_LIFT_ERROR',
  error: any
}
export function addLiftError(error): AddLiftErrorAction {
  return {
    type: 'ADD_LIFT_ERROR',
    error,
  }
}

export interface UpdateLiftSuggestionsAction {
  type: 'UPDATE_LIFT_SUGGESTIONS',
  payload: {
    setGroup: model.ISetGroup,
    typedValue: string
  }
}
export function updateLiftSuggestions(
  setGroup: model.ISetGroup,
  typedValue: string
): UpdateLiftSuggestionsAction {
  return {
    type: 'UPDATE_LIFT_SUGGESTIONS',
    payload: {
      setGroup,
      typedValue,
    }
  }
}


const Horizon = require('@horizon/client')
const hz = new Horizon();

/** Async Action Creator */
export function getLifts() {
  return dispatch => {
    dispatch(getLiftsRequest())

    hz('lifts').above({id: ''}).watch().subscribe(lifts => {
      dispatch(getLiftsSuccess(lifts))
    }, (err) => {
      console.error(err)
      dispatch(getLiftsError(err))
    })
  }
}

export function addSetGroup(workoutID: string, percentUp: number) {
  return dispatch => {
    const setGroup = model.createSetGroup(workoutID, percentUp)
    dispatch(addSetGroupRequest(setGroup))

    hz('setGroups').store(setGroup)
      .subscribe((id) => {
        dispatch(addSetGroupSuccess())
      }, (err) => {
        dispatch(addSetGroupError(err))
      })
  }
}

export function getSetGroups(workoutID: string): Redux.Dispatch {
  return dispatch => {
    dispatch(getSetGroupsRequest(workoutID))

    hz('setGroups').findAll({workoutID}).watch().subscribe(setGroups => {
      dispatch(getSetGroupsSuccess(setGroups))
    }, (err) => {
      console.error(err)
      dispatch({
        type: 'GET_SET_GROUPS_ERROR',
        error: err
      })
    })
  }
}

export function getWorkouts(): Redux.Dispatch {
  return dispatch => {
    dispatch({
      type: 'GET_WORKOUTS_REQUEST'
    })

    hz('workouts').watch().subscribe(workouts => {
      dispatch(getWorkoutsSuccess(workouts))
      return workouts
    }, (err) => {
      dispatch({
        type: 'GET_WORKOUTS_ERROR'
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
      dispatch(getWorkoutError(err))
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

export function addLift(setGroup: model.ISetGroup, lift: model.ILift) {
  return dispatch => {
    dispatch(addLiftRequest(setGroup, lift))

    hz('lifts').store(lift)
      .subscribe((id) => {
        dispatch(addLiftSuccess(id, setGroup))
      }, (err) => {
        console.error(err)
        dispatch(addLiftError(err))
      })
  }
}

export type Action =
  GetSetGroupsRequestAction
  | GetSetGroupsSuccessAction
  | GetSetGroupsErrorAction
  | AddSetGroupRequestAction
  | AddSetGroupSuccessAction
  | AddSetGroupErrorAction
  | GetWorkoutRequestAction
  | GetWorkoutSuccessAction
  | GetWorkoutsSuccessAction
  | GetWorkoutErrorAction
  | AddWorkoutRequestAction
  | AddWorkoutSuccessAction
  | AddWorkoutErrorAction
  | AddSetRequestAction
  | AddSetSuccessAction
  | AddSetErrorAction
  | GetLiftsRequestAction
  | GetLiftsSuccessAction
  | GetLiftsErrorAction
  | ChangeLiftAction
  | ChangeLiftNameBeingTypedAction
  | AddLiftRequestAction
  | AddLiftSuccessAction
  | AddLiftErrorAction
  | UpdateLiftSuggestionsAction
