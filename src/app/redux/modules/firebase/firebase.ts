const firebase = require('firebase')
import * as workouts from '../workouts'
import * as actionUtils from '../actionUtils'
import * as R from 'ramda'

// Constants
export const CONFIG_REPLACE: string = 'CONFIG_REPLACE'
export const START_LISTENING_TO_AUTH: string = 'START_LISTENING_TO_AUTH'
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_ERROR = 'LOG_IN_ERROR'
export const FIREBASE_LIFTS_CHANGED = 'FIREBASE_LIFT_CHANGED'

export const ADD_LIFT_REQUEST = 'ADD_LIFT_REQUEST'
export const ADD_LIFT_SUCCESS = 'ADD_LIFT_SUCCESS'
export const ADD_LIFT_ERROR = 'ADD_LIFT_ERROR'

interface LogInRequest {
  email: string;
  password: string;
}

interface LogInSuccessAction {

}

interface LogInErrorAction {

}

interface AddLiftRequest {
  name: string;
}

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBWPSHXhXpV7_Rg99GsIvCwjzCFo_Xkizg',
  authDomain: 'always-be-bulking.firebaseapp.com',
  databaseURL: 'https://always-be-bulking.firebaseio.com',
  storageBucket: 'always-be-bulking.appspot.com',
}
const app = firebase.initializeApp(config);

const myUserID = 'zl2jhz5tUjSGWbDYmscYE7f6tJl2'
const currentUserID = myUserID
export const firebaseApp = app

export function initialize(store: Redux.Store) {
  getCurrentUser().then(() => {
    store.dispatch(startListening())
  })
}

export function getServerReduxInitialState() {
  const db = firebase.database()

  return getCurrentUser().then(() => {
    const keys = ['lifts', 'workouts', 'setGroups']

    const promises = []
    keys.forEach((key) => {
      const p = new Promise((resolve, reject) => {
        db.ref(key).once('value', (snapshot) => {
          return snapshot.val()
        })
      })
      promises.push(p)
    })

    return Promise.all(promises)
  })
}

export function startListening() {
  return (dispatch, getState) => {
    const db = firebase.database()

    // Push lifts db changes to client
    const liftsRef = db.ref('/lifts')
    liftsRef.on('value', (liftsSnapshot) => {
      dispatch({
        type: FIREBASE_LIFTS_CHANGED,
        payload: liftsSnapshot.val() || {},
      })
    })
  }
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    let currentUser = firebase.auth().currentUser
    if (currentUser) {
      resolve(currentUser)
      return
    }

    return firebase
    .auth()
    .signInWithEmailAndPassword('yujason2@gmail.com', 'asdfasdf')
    .then(() => {
      currentUser = firebase.auth().currentUser
      console.log('firebase.auth().currentUser: ', currentUser.email)
      console.log('currentUser: ', currentUser.uid);
      resolve(currentUser)
    })
    .catch((err) => {
      console.log('err: ', err)
      reject(err)
    })
  })
}

export const currentUserWorkoutsRef = (
  firebase.database().ref(`/users/${currentUserID}/workouts`))

export const addLift = (liftObj: workouts.ILift) => {
  return ((dispatch, getState) => {
    return firebase.database().ref('/lifts').push(liftObj)
  })
}

export const getWorkoutByID = (workoutID: string) => {
  return new Promise((resolve, reject) => {
    firebase.database()
      .ref(`/workouts/${workoutID}`)
      .on('value', (workoutsSnapshot) => {
        resolve({workout: workoutsSnapshot.val()})
      })
  })
}

export const addWorkout = (workoutObj: workouts.IWorkout) => {
  console.log('workoutObj: ', workoutObj);
  return firebase.database().ref('/workouts').push(workoutObj)
}

export const addSetGroup = (setGroup: workouts.ISetGroup) => {
  firebase.database().ref('/setGroups').push(setGroup)
}

export const addLiftRequest = actionUtils.actionCreator<workouts.ILift>(
  ADD_LIFT_REQUEST)
export const addLiftSuccess = actionUtils.actionCreator<workouts.ILift>(
  ADD_LIFT_SUCCESS)
export const addLiftError = actionUtils.actionCreator<workouts.ILift>(
  ADD_LIFT_ERROR)
export const firebaseLiftChanged = actionUtils.actionCreator<workouts.ILift[]>(
  FIREBASE_LIFTS_CHANGED)

const initialState = {}

function firebaseReducer(state = initialState, action) {
  if (actionUtils.isType(action, addLiftRequest)) {
    return addLift(action.payload)
  }

  return state
}

export default firebase
