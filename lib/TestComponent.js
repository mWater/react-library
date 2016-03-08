var H, React, ReactDOM, ReactTestUtils, TestComponent, _;

React = require('react');

ReactDOM = require('react-dom');

ReactTestUtils = require('react-addons-test-utils');

H = React.DOM;

_ = require('lodash');

module.exports = TestComponent = (function() {
  function TestComponent(elem) {
    this.div = document.createElement('div');
    this.comp = ReactDOM.render(elem, this.div);
  }

  TestComponent.prototype.setElement = function(elem) {
    return ReactDOM.render(elem, this.div);
  };

  TestComponent.prototype.getComponent = function() {
    return this.comp;
  };

  TestComponent.prototype.destroy = function() {
    return ReactDOM.unmountComponentAtNode(this.div);
  };

  TestComponent.prototype.findComponentByText = function(pattern) {
    return ReactTestUtils.findAllInRenderedTree(this.comp, function(c) {
      if (ReactTestUtils.isDOMComponent(c)) {
        return _.any(c.childNodes, function(node) {
          return node.nodeType === 3 && node.textContent.match(pattern);
        });
      }
    })[0];
  };

  TestComponent.prototype.findInput = function() {
    return ReactTestUtils.findRenderedDOMComponentWithTag(this.comp, "input");
  };

  TestComponent.click = function(comp) {
    return ReactTestUtils.Simulate.click(comp);
  };

  TestComponent.pressEnter = function(comp) {
    return ReactTestUtils.Simulate.keyDown(comp, {
      key: "Enter",
      keyCode: 13,
      which: 13
    });
  };

  TestComponent.pressTab = function(comp) {
    return ReactTestUtils.Simulate.keyDown(comp, {
      key: "Tab",
      keyCode: 9,
      which: 9
    });
  };

  TestComponent.changeValue = function(comp, value) {
    comp.value = value;
    return ReactTestUtils.Simulate.change(comp);
  };

  return TestComponent;

})();
