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

  TestComponent.prototype.findDOMNodesByText = function(pattern) {
    var findRecursively, matches;
    matches = [];
    findRecursively = function(node) {
      var i, len, ref, results, subnode;
      if (node.nodeType === 1) {
        ref = node.childNodes;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          subnode = ref[i];
          if (subnode.nodeType === 3 && subnode.nodeValue.match(pattern)) {
            matches.push(node);
          }
          results.push(findRecursively(subnode));
        }
        return results;
      }
    };
    findRecursively(ReactDOM.findDOMNode(this.comp));
    return matches;
  };

  TestComponent.prototype.findDOMNodeByText = function(pattern) {
    return this.findDOMNodesByText(pattern)[0];
  };

  TestComponent.prototype.findComponentByText = function(pattern) {
    return findDOMNodesByText(pattern);
  };

  TestComponent.prototype.findInput = function() {
    return ReactTestUtils.findRenderedDOMComponentWithTag(this.comp, "input");
  };

  TestComponent.prototype.findComponentById = function(id) {
    return ReactTestUtils.findAllInRenderedTree(this.comp, function(c) {
      return c.id === id;
    })[0];
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
