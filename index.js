'use strict'

const _ = require('lodash')

/**
 * @class
 * @author Chantz Large <@chantzlarge>
 * @description TODO
**/
class Diff {
  /**
   * @constructor
   * @author Chantz Large <@chantzlarge>
   * @description TODO
   * @arg {Object|Array} expected - TODO
   * @arg {Object|Array} actual - TODO
   * @arg {Object} options - TODO
  **/
  constructor (expected, actual, options) {
    this.expected = expected
    this.actual = actual
    this.options = options
    this.pairs = { expected: [], actual: [] }
    Diff.toPairsDeep(this.expected, this.pairs.expected)
    Diff.toPairsDeep(this.actual, this.pairs.actual)
  }

  /**
   * @setter
   * @arg {Object|Array} expected - TODO
  **/
  set expected (expected) {
    if (_.isObject(expected)) this._expected = expected
    else throw new Error('Invalid argument: expected')
  }

  /**
   * @setter
   * @arg {Object|Array} expected - TODO
  **/
  set actual (actual) {
    if (_.isObject(actual)) this._actual = actual
    else throw new Error('Invalid argument: actual')
  }

  /**
   * @getter
   * @returns {Object|Array}
  **/
  get expected () {
    return this._expected
  }

  /**
   * @getter
   * @returns {Object|Array}
  **/
  get actual () {
    return this._actual
  }

  /**
   * @function
   * @author Chantz Large <@chantzlarge>
   * @description TODO
  **/
  static toPairsDeep (o, target, path) {
    if (_.isArray(o)) _.each(o, (v, i) => Diff.toPairsDeep(o[i], target, `${path}[${i}]`))
    else if (_.isObject(o)) _.each(o, (v, k) => Diff.toPairsDeep(o[k], target, `${(path) ? `${path}.` : ''}${k}`))
    else target.push([ path, o ])
  }

  /**
   * @function
   * @author Chantz Large <@chantzlarge>
   * @description TODO
   * @arg {Any} a - TODO
   * @arg {Any} b - TODO
  **/
  static difference (a, b) {
    return _.differenceWith(a, b, _.isEqual)
  }
}

/**
 * @exports
 * @description TODO
**/
module.exports = Diff
