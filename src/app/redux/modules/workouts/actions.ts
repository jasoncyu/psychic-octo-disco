import * as model from './model'
import * as C from './constants'

/** Action Creators */
export function getSetGroupsRequest(
  workoutID: string): model.IWorkoutsAction {
  return {
    type: C.GET_SET_GROUPS_REQUEST,
    payload: {
      workoutID
    }
  }
}

export function getSetGroupsSuccess(): model.IWorkoutsAction {
  return {
    type: C.GET_SET_GROUPS_SUCCESS
  }
}

export function getSetGroupsError(): model.IWorkoutsAction {
  return {
    type: C.GET_SET_GROUPS_ERROR
  }
}
export function addSetGroupRequest(
  setGroup: model.ISetGroup): model.IWorkoutsAction {
  return {
    type: C.ADD_SET_GROUP_REQUEST,
    payload: {
      setGroup
    }
  }
}

export function addSetGroupSuccess(): model.IWorkoutsAction {
  return {
    type: C.ADD_SET_GROUP_SUCCESS
  }
}

export function addSetGroupError(error): model.IWorkoutsAction {
  return {
    type: C.ADD_SET_GROUP_ERROR,
    error
  }
}

export function getWorkoutRequest(id: string): model.IGetWorkoutAction {
  return {
    type: C.GET_WORKOUT_REQUEST,
    payload: {
      id
    }
  }
}

export function getWorkoutSuccess(
  workout: model.IWorkout): model.IWorkoutsAction {
  return {
    type: C.GET_WORKOUT_SUCCESS,
    payload: {
      workout
    }
  }
}

export function getWorkoutError(err: any): model.IWorkoutsAction {
  return {
    type: C.GET_WORKOUT_ERROR,
    error: err
  }
}

export function addWorkoutRequest(): model.IWorkoutsAction {
  return {
    type: C.ADD_WORKOUT_REQUEST
  }
}

export function addWorkoutSuccess(): model.IWorkoutsAction {
  return {
    type: C.ADD_WORKOUT_SUCCESS
  }
}

export function addWorkoutError(): model.IWorkoutsAction {
  return {
    type: C.ADD_WORKOUT_ERROR
  }
}

export function addSetRequest(): model.IWorkoutsAction {
  return {
    type: C.ADD_SET_REQUEST
  }
}

export function addSetSuccess(): model.IWorkoutsAction {
  return {
    type: C.ADD_SET_SUCCESS
  }
}

export function addSetError(): model.IWorkoutsAction {
  return {
    type: C.ADD_SET_ERROR
  }
}

export function getLiftsRequest(): model.IWorkoutsAction {
  return {
    type: C.GET_LIFTS_REQUEST
  }
}

export function getLiftsSuccess(lifts): model.IWorkoutsAction {
  return {
    type: C.GET_LIFTS_SUCCESS,
    payload: {
      lifts
    }
  }
}

export function getLiftsError(error): model.IWorkoutsAction {
  return {
    type: C.GET_LIFTS_ERROR,
    error
  }
}

export function changeLift() {
  return {
    type: C.CHANGE_LIFT
  }
}

export function changeLiftNameBeingTyped(setGroup, name) {
  return {
    type: C.CHANGE_LIFT_NAME_BEING_TYPED,
    payload: {
      setGroup,
      name
    }
  }
}

export function addLiftRequest(setGroup, lift): model.IWorkoutsAction {
  return {
    type: C.ADD_LIFT_REQUEST,
    payload: {
      setGroup,
      lift
    }
  }
}

export function addLiftSuccess(id, setGroup): model.IWorkoutsAction {
  return {
    type: C.ADD_LIFT_SUCCESS,
    payload: {
      id,
      setGroup
    }
  }
}

export function addLiftError(error): model.IWorkoutsAction {
  return {
    type: C.ADD_LIFT_ERROR,
    error,
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
export function addSetGroup(setGroup) {
  return dispatch => {
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
      dispatch({
        type: C.GET_SET_GROUPS_SUCCESS,
        payload: {
          setGroups
        }
      })
    }, (err) => {
      console.error(err)
      dispatch({
        type: C.GET_SET_GROUPS_ERROR,
        error: err
      })
    })
  }
}

export function getWorkouts(): Redux.Dispatch {
  return dispatch => {
    dispatch({
      type: C.GET_WORKOUTS_REQUEST
    })

    hz('workouts').watch().subscribe(workouts => {
      dispatch({
        type: C.GET_WORKOUTS_SUCCESS,
        payload: {
          workouts
        }
      })
      return workouts
    }, (err) => {
      dispatch({
        type: C.GET_WORKOUTS_ERROR
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
