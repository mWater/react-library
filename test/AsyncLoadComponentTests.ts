// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
import { assert } from "chai"
import _ from "lodash"
import AsyncLoadComponent from "../src/AsyncLoadComponent"

// Test version
class TestAsyncLoadComponent extends AsyncLoadComponent {
  constructor(props) {
    super(props)
    this.callbacks = []
    this.setstates = []
  }

  // Override to determine if a load is needed. Not called on mounting
  isLoadNeeded(newProps, oldProps) {
    return this.loadNeeded
  }

  // Call callback with state changes
  load(props, prevProps, callback) {
    return this.callbacks.push(callback)
  }

  setState(state, callback) {
    this.setstates.push(state)
    if (callback) {
      return callback()
    }
  }
}

describe("AsyncLoadComponent", function () {
  beforeEach(function () {
    return (this.comp = new TestAsyncLoadComponent())
  })

  it("starts load on componentWillMount", function () {
    this.comp.componentWillMount()
    return assert.equal(this.comp.callbacks.length, 1)
  })

  it("starts load on componentWillReceiveProps if isLoadNeeded true", function () {
    this.comp.loadNeeded = true
    this.comp.componentWillReceiveProps()
    return assert.equal(this.comp.callbacks.length, 1)
  })

  it("doesn't start load on componentWillReceiveProps if isLoadNeeded false", function () {
    this.comp.loadNeeded = false
    this.comp.componentWillReceiveProps()
    return assert.equal(this.comp.callbacks.length, 0)
  })

  it("sets loading true before load", function () {
    this.comp.componentWillMount()
    return assert.deepEqual(this.comp.setstates, [{ loading: true }])
  })

  it("sets state and loading false after first callback", function () {
    this.comp.componentWillMount()
    this.comp.callbacks[0]({ x: 1 })

    return assert.deepEqual(this.comp.setstates, [{ loading: true }, { x: 1 }, { loading: false }])
  })

  it("sets state to second call and loading false after first callback is doubled", function () {
    this.comp.componentWillMount()
    this.comp.callbacks[0]({ x: 1 })
    this.comp.callbacks[0]({ x: 2 })

    return assert.deepEqual(this.comp.setstates, [
      { loading: true },
      { x: 1 },
      { loading: false },
      { x: 2 },
      { loading: false }
    ])
  })

  it("sets state and loading true after 1st callback if 2nd pending", function () {
    this.comp.componentWillMount()
    this.comp.loadNeeded = true
    this.comp.componentWillReceiveProps()
    this.comp.callbacks[0]({ x: 1 })

    return assert.deepEqual(this.comp.setstates, [{ loading: true }, { loading: true }, { x: 1 }])
  })

  it("sets state and loading false after 2nd callback if 1st pending", function () {
    this.comp.componentWillMount()
    this.comp.loadNeeded = true
    this.comp.componentWillReceiveProps()
    this.comp.callbacks[1]({ x: 2 })

    return assert.deepEqual(this.comp.setstates, [{ loading: true }, { loading: true }, { x: 2 }, { loading: false }])
  })

  it("doesn't set state or loading after 1st callback if 2nd complete", function () {
    this.comp.componentWillMount()
    this.comp.loadNeeded = true
    this.comp.componentWillReceiveProps()
    this.comp.callbacks[1]({ x: 2 })
    this.comp.callbacks[0]({ x: 1 })

    return assert.deepEqual(this.comp.setstates, [{ loading: true }, { loading: true }, { x: 2 }, { loading: false }])
  })

  return it("doesn't set state after 1st callback if unmounted", function () {
    this.comp.componentWillMount()
    this.comp.componentWillUnmount()
    this.comp.callbacks[0]({ x: 1 })

    return assert.deepEqual(this.comp.setstates, [{ loading: true }])
  })
})
