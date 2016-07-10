import { expect } from 'chai'
import * as model from './workouts.model'

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
