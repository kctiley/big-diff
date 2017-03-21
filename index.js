'use strict'

const _ = require('lodash')
const colors = require('colors')

/**
 * @class
**/
class Diff {

  /**
   * @constructor
  **/
  constructor (expected, actual) {
    this.expected = expected
    this.actual = actual
  }

  /**
   * @member
  **/
  get difference () {
    return {
      expected: Diff.difference(this.comparison.expected),
      actual: Diff.difference(this.comparison.actual)
    }
  }

  /**
   * @static
   * @function
  **/
  static difference (a) {
    let valid = []
    let invalid = []
    let missing = []
    _.each(a, (x) => {
      if (_.isEqual(x[0], x[2]) && _.isEqual(x[1], x[3])) valid.push(x)
      else if (_.isEqual(x[0], x[2])) invalid.push(x)
      else missing.push(x)
    })
    return {
      valid: valid,
      invalid: invalid,
      missing: missing
    }
  }

  /**
   * @member
  **/
  get comparison () {
    return {
      expected: Diff.compare(this.entries.expected, this.entries.actual),
      actual: Diff.compare(this.entries.actual, this.entries.actual)
    }
  }

  /**
   * @static
   * @function
  **/
  static compare (a, b) {
    return _.map(a, (x, i) => {
      let j = _.findIndex(b, (y) => {
        return _.isEqual(x[0], y[0])
      })
      if (j === -1) {
        x.push(null)
        x.push(null)
        return x
      }
      else {
        x.push(b[j][0])
        x.push(b[j][1])
        return x
      }
    })
  }

  /**
   * @member
  **/
  get entries () {
    return {
      expected: Diff.entries(this.expected),
      actual: Diff.entries(this.actual)
    }
  }

  /**
   * @static
   * @function
  **/
  static entries (object) {
    let entries = []
    Diff.toEntries(object, entries)
    return entries
  }

  /**
   * @static
   * @function
  **/
  static toEntries (object, target, path) {
    if (_.isObject(object)) _.each(object, (value, key) => Diff.toEntries(value, target, path ? path.concat(key) : [].concat(key)))
    else target.push([ path, object ])
  }

  /**
   * @member
  **/
  get pairs () {
    return {
      expected: Diff.toPairs(this.entries.expected),
      actual: Diff.toPairs(this.entries.actual)
    }
  }

  /**
   * @static
   * @function
  **/
  static toPairs (entries) {
    return _.map(entries, (entry) => {
      return [Diff.toPath(entry[0]), entry[1]]
    })
  }

  /**
   * @static
   * @function
  **/
  static toPath (keys) {
    let path = ''
    _.each(keys, (key) => {
      path += _.isNumber(key) ? `[${key}]` : `${path ? '.' : ''}${key}`
    })
    return path
  }

  /**
   * @member
  **/
  get print () {
    return {
      difference: {
        expected: Diff.print.difference.expected(this.difference.expected)
      }
    }
  }

  /**
   * @static
   * @member
  **/
  static get print () {
    return {
      difference: {
        expected: (diff) => {
          console.log(`\nValid (${diff.valid.length} / ${diff.valid.length + diff.invalid.length + diff.missing.length}):\n`)
          _.each(diff.valid, (entry) => {
            console.log(`${Diff.toPath(entry[0])}: ${entry[1]} === ${entry[3]}`.green)
          })
          console.log(`\nInvalid (${diff.invalid.length} / ${diff.valid.length + diff.invalid.length + diff.missing.length}):\n`)
          _.each(diff.invalid, (entry) => {
            console.log(`${Diff.toPath(entry[0])}: ${entry[1]} !== ${entry[3]}`.yellow)
          })
          console.log(`\nMissing (${diff.missing.length} / ${diff.missing.length + diff.invalid.length + diff.missing.length}):\n`)
          _.each(diff.missing, (entry) => {
            console.log(`${Diff.toPath(entry[0])}: ${entry[1]} !== ${entry[3]}`.red)
          })
        }
      }
    }
  }
}

/**
 * @exports
**/
module.exports = Diff
