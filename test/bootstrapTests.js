import { createElement as R } from 'react';
import sinon from 'sinon';
import enzyme from 'enzyme';
import { assert } from 'chai';
import bootstrap from '../src/bootstrap';

describe("bootstrap", () => describe("NumberInput", function() {
  it("converts number to text", function() {
    const onChange = sinon.spy();
    const wrapper = enzyme.shallow(R(bootstrap.NumberInput, {decimal: true, value: null, onChange}));
    wrapper.find("input").props().onChange({ target: { value: "2.3"}});
    wrapper.find("input").props().onBlur();

    return assert(onChange.calledWith(2.3));
  });

  it("sets null on gibberish blur", function() {
    const onChange = sinon.spy();
    const wrapper = enzyme.shallow(R(bootstrap.NumberInput, {decimal: true, value: null, onChange}));
    wrapper.find("input").props().onChange({ target: { value: "2."}});
    wrapper.find("input").props().onBlur();

    return assert(onChange.calledWith(null));
  });

  it("sets null on empty blur", function() {
    const onChange = sinon.spy();
    const wrapper = enzyme.shallow(R(bootstrap.NumberInput, {decimal: true, value: 2.3, onChange}));
    wrapper.find("input").props().onChange({ target: { value: "" }});
    wrapper.find("input").props().onBlur();

    return assert(onChange.calledWith(null));
  });

  it("stringifies null as blank", function() {
    const onChange = sinon.spy();
    const wrapper = enzyme.shallow(R(bootstrap.NumberInput, {decimal: true, value: null, onChange}));

    return assert.equal(wrapper.find("input").props().value, "");
  });

  it("stringifies 2.3 as 2.3", function() {
    const onChange = sinon.spy();
    const wrapper = enzyme.shallow(R(bootstrap.NumberInput, {decimal: true, value: 2.3, onChange}));

    return assert.equal(wrapper.find("input").props().value, "2.3");
  });

  return describe("decimalPlaces", function() {
    it("adds decimals", function() {
      const wrapper = enzyme.shallow(R(bootstrap.NumberInput, {decimal: true, value: 2.3, decimalPlaces: 3, onChange() {}}));

      return assert.equal(wrapper.find("input").props().value, "2.300");
    });

    return it("rounds decimals", function() {
      const onChange = sinon.spy();
      const wrapper = enzyme.shallow(R(bootstrap.NumberInput, {decimal: true, value: 2.3, decimalPlaces: 3, onChange}));

      wrapper.find("input").props().onChange({ target: { value: "2.3456"}});
      wrapper.find("input").props().onBlur();
      return assert(onChange.calledWith(2.346), "" + onChange.args[0]);
  });
});
}));


