'use strict'

const assert = require('assert')
const Diff = require('../')
const a = require('./a.json')
const b = require('./b.json')

describe('Diff', () => {
  describe('new Diff()', () => {
    it('should construct instance of Diff', () => {
      let diff = new Diff(a, b)
      assert.equal('Diff', diff.constructor.name)
      console.log(Diff.difference(diff.pairs.actual, diff.pairs.expected))
    })
  })

  describe('toPairsDeep()', () => {
    it('', () => {
      let target = []
      Diff.toPairsDeep(a, target)
    })
  })
})
