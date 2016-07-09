const firebase = require('firebase')
import * as workouts from '../workouts'
import * as actionUtils from '../actionUtils'

export const CONFIG_REPLACE: string = 'CONFIG_REPLACE'
export const START_LISTENING_TO_AUTH: string = 'START_LISTENING_TO_AUTH'
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_ERROR = 'LOG_IN_ERROR'
export const FIREBASE_LIFT_CHANGED = 'FIREBASE_LIFT_CHANGED'

export const ADD_LIFT = 'ADD_LIFT'

interface LogInRequest {
  email: string;
  password: string;
}

interface LogInSuccessAction {

}

interface LogInErrorAction {

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

export function initialize() {
  getCurrentUser().then(startListening)
}

export function startListening() {
  return (dispatch, getState) => {
    const db = firebase.database()

    // Push lifts db changes to client
    const liftsRef = db.ref('/lifts')
    liftsRef.on('value', (liftsSnapshot) => {
      dispatch({
        type: FIREBASE_LIFT_CHANGED,
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

    firebase
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
export const currentUserWorkoutsRef = firebase.database().ref(`/users/${currentUserID}/workouts`)

export const addLift = (liftObj: workouts.ILift) => {
  return firebase.database().ref('/lifts').push(liftObj)
}

export const addWorkout = (workoutObj: workouts.IWorkout) => {
  console.log('workoutObj: ', workoutObj);
  return firebase.database().ref('/workouts').push(workoutObj)
}

const initialState = {}

function firebaseReducer(state = initialState, action) {
  switch (action.type) {
    case [ADD_LIFT]: {
      return addLift(action.payload)
    }
    default:
      return state
  }
}

export default firebase
