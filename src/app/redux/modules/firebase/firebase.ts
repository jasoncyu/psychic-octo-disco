const firebase = require('firebase')
import * as workoutsModel from '../workouts/workouts.model'

export const CONFIG_REPLACE: string = 'CONFIG_REPLACE'

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

export const addLift = (liftObj) => {
  return firebase.database().ref('/lifts').push(liftObj)
}

export const addWorkout = (workoutObj: workoutsModel.IWorkout) => {
  console.log('workoutObj: ', workoutObj);
  return firebase.database().ref('/workouts').push(workoutObj)
}

export default firebase
