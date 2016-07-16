import { expect } from 'chai'
import * as model from './model'
const Horizon = require('@horizon/client')
const hz = Horizon({
  host: 'localhost'
});

describe('Workouts Module', () => {
  describe('should progress weight properly', () => {
    it('basic case', () => {
      const actual = model.progressWeight(100, 10)
      expect(actual).to.equal(110)
    })

    it('round down normally', () => {
      const actual = model.progressWeight(100, 7)
      expect(actual).to.equal(105)
    })

    it('round up when rounding down would result in no increase', () => {
      const actual = model.progressWeight(100, 1)

      expect(actual).to.equal(105)
    })
  })
})

describe('Workout with DB', () => {
  it('basic case', () => {

    const workout: model.IWorkout = {
      startTS: Date.now()
    }
    const setGroup: model.ISetGroup = {
      percentUp: 10,
      number: 1,
    }
    const set: model.ISet = {
      number: 1,
      reps: 12,
    }
    const lift: model.ILift = {
      name: 'Bench Press',
    }

    hz('workouts_asdf_test').store(workout)
      .map(workout => {
        console.log('workout: ', workout)
        return hz('lifts').store(lift)
      })
      .map(lift => {
        console.log('lift: ', lift)
        // const savedSetGroup: model.ISetGroup = Object.assign(
        //   {},
        //   setGroup,
        //   {
        //     liftID: lift.id
        //   }
        // )
        // return hz('setGroups').store(setGroup)
      })
  })
})
