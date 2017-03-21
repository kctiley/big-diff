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
  constructor (e, a) {
    this.e = e
    this.a = a
    Diff.print.asPathes(e, a)
  }

  /**
   * @static
   * @function
  **/
  static get print () {
    return {
      asPathes: (a, b) => console.log(Diff.asPathes(a, b))
    }
  }

  /**
   * @static
   * @function
  **/
  static asPathes (a, b) {
    let s = ''
    _.each(Diff.difference(a, b), (v, k) => {
      let t = `${Diff.toPath(v[0])}: ${v[1]} → ${v[2]}\n`
      if (_.isEqual(v[1], v[2])) s += t.green
      else if (v[1] && v[2]) s += t.yellow
      else s += t.red
    })
    return s
  }

  /**
   * @static
   * @function
  **/
  static difference (a, b) {
    a = Diff.entries(a)
    b = Diff.entries(b)
    return _.map(a, (x, i) => {
      let j = _.findIndex(b, (y) => { return _.isEqual(x[0], y[0]) })
      return (j === -1) ? x.concat(undefined) : x.concat(b[j][1])
    })
  }

  /**
   * @static
   * @function
  **/
  static entries (o) {
    let e = []
    Diff.toEntries(o, e)
    return e
  }

  /**
   * @static
   * @function
  **/
  static toEntries (o, t, p) {
    _.isObject(o) ? _.each(o, (v, k) => Diff.toEntries(v, t, p ? p.concat(k) : [].concat(k))) : t.push([p, o])
  }

  /**
   * @static
   * @function
  **/
  static toPairs (o) {
    let e = Diff.entries(o)
    return _.map(e, (v, k) => { return [Diff.toPath(v[0]), v[1]] })
  }

  /**
   * @static
   * @function
  **/
  static toPath (p) {
    let str = ''
    _.each(p, (v) => str += _.isNumber(v) ? `[${v}]` : `${str ? '.' : ''}${v}`)
    return str
  }
}

/**
 * @exports
**/
module.exports = Diff
