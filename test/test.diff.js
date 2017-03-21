'use strict'

const assert = require('assert')
const Diff = require('../')
const a = require('./a.json')
const b = require('./b.json')

describe('Diff', () => {
  describe('new Diff()', () => {
    it('', () => {
      let d = new Diff(a, b)
    })
  })

  describe('#entries()', () => {
    it('', () => {
      let e = Diff.entries(a)
    })
  })

  describe('#entries', () => {
    it('', () => {
      let d = new Diff(a, b)
      // console.log(d.entries)
    })
  })

  describe('#compare()', () => {
    it('', () => {
      let d = new Diff(a, b)
      let comparison = Diff.compare(d.entries.expected, d.entries.actual)
    })
  })

  describe('#comparison', () => {
    it('', () => {
      let d = new Diff(a, b)
      // console.log(d.comparison)
    })
  })

  describe('#difference()', () => {
    it('', () => {
      let d = new Diff(a, b)
      let diff = Diff.difference(d.comparison.expected)
    })
  })

  describe('#difference', () => {
    it('', () => {
      let d = new Diff(a, b)
      d.difference
    })
  })

  describe('#toPath()', () => {
    it('', () => {
      let d = new Diff(a, b)
      let path = Diff.toPath(d.entries.expected[0])
    })
  })

  describe('#toPairs()', () => {
    it('', () => {
      let d = new Diff(a, b)
      let path = Diff.toPairs(d.entries.expected)
    })
  })

  describe('#pairs', () => {
    it('', () => {
      let d = new Diff(a, b)
      d.pairs
    })
  })

  describe('print.difference.expected()', () => {
    let d = new Diff(a, b)
    d.print.expected
  })
})
