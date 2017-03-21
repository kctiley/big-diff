'use strict'

const assert = require('assert')
const Diff = require('../')
const a = require('./a.json')
const b = require('./b.json')

describe('Diff', () => {
  it('', () => {
    Diff.print.asPathes(a, b)
  })
})
