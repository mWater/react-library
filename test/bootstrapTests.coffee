R = require('react').createElement
sinon = require 'sinon'
enzyme = require 'enzyme'
assert = require('chai').assert

bootstrap = require '../src/bootstrap'

describe "bootstrap", ->
  describe "NumberInput", ->
    it "converts number to text", ->
      onChange = sinon.spy()
      wrapper = enzyme.shallow(R(bootstrap.NumberInput, decimal: true, value: null, onChange: onChange))
      wrapper.find("input").props().onChange({ target: { value: "2.3"}})
      wrapper.find("input").props().onBlur()

      assert onChange.calledWith(2.3)

    it "sets null on gibberish blur", ->
      onChange = sinon.spy()
      wrapper = enzyme.shallow(R(bootstrap.NumberInput, decimal: true, value: null, onChange: onChange))
      wrapper.find("input").props().onChange({ target: { value: "2."}})
      wrapper.find("input").props().onBlur()

      assert onChange.calledWith(null)

    it "sets null on empty blur", ->
      onChange = sinon.spy()
      wrapper = enzyme.shallow(R(bootstrap.NumberInput, decimal: true, value: 2.3, onChange: onChange))
      wrapper.find("input").props().onChange({ target: { value: "" }})
      wrapper.find("input").props().onBlur()

      assert onChange.calledWith(null)

    it "stringifies null as blank", ->
      onChange = sinon.spy()
      wrapper = enzyme.shallow(R(bootstrap.NumberInput, decimal: true, value: null, onChange: onChange))

      assert.equal wrapper.find("input").props().value, ""

    it "stringifies 2.3 as 2.3", ->
      onChange = sinon.spy()
      wrapper = enzyme.shallow(R(bootstrap.NumberInput, decimal: true, value: 2.3, onChange: onChange))

      assert.equal wrapper.find("input").props().value, "2.3"


