
assert = require('chai').assert
update = require '../src/update'

describe "update", ->
  beforeEach ->
    @newValue = null

    @value = { x: 1 }
    @onChange = (newValue) => @newValue = newValue

  it "updates using object", ->
    update(@value, @onChange, [{ y: 2 }])
    assert.deepEqual @newValue, { x: 1, y: 2 }

  it "updates using function builder", ->
    update(@value, @onChange, ["y"])(2)
    assert.deepEqual @newValue, { x: 1, y: 2 }

  it "updates using path directly", ->
    update(@value, @onChange, ["y", 2])
    assert.deepEqual @newValue, { x: 1, y: 2 }

  it "updates using path directly", ->
    update(@value, @onChange, ["y.z", 2])
    assert.deepEqual @newValue, { x: 1, y: { z: 2 } }
