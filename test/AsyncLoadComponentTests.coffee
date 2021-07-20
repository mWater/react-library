assert = require('chai').assert
_ = require 'lodash'
AsyncLoadComponent = require '../src/AsyncLoadComponent'

# Test version
class TestAsyncLoadComponent extends AsyncLoadComponent
  constructor: (props) ->
    super(props)
    @callbacks = []
    @setstates = []

  # Override to determine if a load is needed. Not called on mounting
  isLoadNeeded: (newProps, oldProps) -> 
    return @loadNeeded

  # Call callback with state changes
  load: (props, prevProps, callback) ->
    @callbacks.push(callback)

  setState: (state, callback) ->
    @setstates.push(state)
    if callback
      callback()

describe "AsyncLoadComponent", ->
  beforeEach ->
    @comp = new TestAsyncLoadComponent()

  it "starts load on componentWillMount", ->
    @comp.componentWillMount()
    assert.equal @comp.callbacks.length, 1

  it "starts load on componentWillReceiveProps if isLoadNeeded true", ->
    @comp.loadNeeded = true
    @comp.componentWillReceiveProps()
    assert.equal @comp.callbacks.length, 1

  it "doesn't start load on componentWillReceiveProps if isLoadNeeded false", ->
    @comp.loadNeeded = false
    @comp.componentWillReceiveProps()
    assert.equal @comp.callbacks.length, 0

  it "sets loading true before load", ->
    @comp.componentWillMount()
    assert.deepEqual @comp.setstates, [{ loading: true }]

  it "sets state and loading false after first callback", ->
    @comp.componentWillMount()
    @comp.callbacks[0]({ x: 1 })
    
    assert.deepEqual @comp.setstates, [{ loading: true }, { x: 1 }, { loading: false }]

  it "sets state to second call and loading false after first callback is doubled", ->
    @comp.componentWillMount()
    @comp.callbacks[0]({ x: 1 })
    @comp.callbacks[0]({ x: 2 })
    
    assert.deepEqual @comp.setstates, [{ loading: true }, { x: 1 }, { loading: false }, { x: 2 }, { loading: false }]

  it "sets state and loading true after 1st callback if 2nd pending", ->
    @comp.componentWillMount()
    @comp.loadNeeded = true
    @comp.componentWillReceiveProps()
    @comp.callbacks[0]({ x: 1 })
    
    assert.deepEqual @comp.setstates, [{ loading: true }, { loading: true }, { x: 1 }]

  it "sets state and loading false after 2nd callback if 1st pending", ->
    @comp.componentWillMount()
    @comp.loadNeeded = true
    @comp.componentWillReceiveProps()
    @comp.callbacks[1]({ x: 2 })
    
    assert.deepEqual @comp.setstates, [{ loading: true }, { loading: true }, { x: 2 }, { loading: false }]

  it "doesn't set state or loading after 1st callback if 2nd complete", ->
    @comp.componentWillMount()
    @comp.loadNeeded = true
    @comp.componentWillReceiveProps()
    @comp.callbacks[1]({ x: 2 })
    @comp.callbacks[0]({ x: 1 })
    
    assert.deepEqual @comp.setstates, [{ loading: true }, { loading: true }, { x: 2 }, { loading: false }]

  it "doesn't set state after 1st callback if unmounted", ->
    @comp.componentWillMount()
    @comp.componentWillUnmount()
    @comp.callbacks[0]({ x: 1 })
    
    assert.deepEqual @comp.setstates, [{ loading: true }]
