"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var R, React, ReactDOM, ReactTestUtils, TestComponent, _;

React = require('react');
ReactDOM = require('react-dom');
ReactTestUtils = require('react-dom/test-utils');
R = React.createElement;
_ = require('lodash'); // Test component that can be created, have its element changed, have clicks and other actions simulated
// Used for unit testing React components

module.exports = TestComponent = /*#__PURE__*/function () {
  function TestComponent(elem) {
    (0, _classCallCheck2["default"])(this, TestComponent);
    this.div = document.createElement('div');
    this.comp = ReactDOM.render(elem, this.div);
  }

  (0, _createClass2["default"])(TestComponent, [{
    key: "setElement",
    value: function setElement(elem) {
      return ReactDOM.render(elem, this.div);
    }
  }, {
    key: "getComponent",
    value: function getComponent() {
      return this.comp;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      return ReactDOM.unmountComponentAtNode(this.div);
    } // Finds DOM node by pattern (optional)

  }, {
    key: "findDOMNodesByText",
    value: function findDOMNodesByText(pattern) {
      var _findRecursively, matches;

      matches = [];

      _findRecursively = function findRecursively(node) {
        var i, len, ref, results, subnode; // Recurse to children

        if (node.nodeType === 1) {
          ref = node.childNodes;
          results = [];

          for (i = 0, len = ref.length; i < len; i++) {
            subnode = ref[i]; // Check text match

            if (subnode.nodeType === 3 && subnode.nodeValue.match(pattern)) {
              matches.push(node);
            }

            results.push(_findRecursively(subnode));
          }

          return results;
        }
      };

      _findRecursively(ReactDOM.findDOMNode(this.comp));

      return matches;
    } // Finds a DOM node by pattern

  }, {
    key: "findDOMNodeByText",
    value: function findDOMNodeByText(pattern) {
      return this.findDOMNodesByText(pattern)[0];
    } // Find a subcomponent by a pattern (deprecated)

  }, {
    key: "findComponentByText",
    value: function findComponentByText(pattern) {
      return this.findDOMNodesByText(pattern);
    } // Find input field

  }, {
    key: "findInput",
    value: function findInput() {
      return ReactTestUtils.findRenderedDOMComponentWithTag(this.comp, "input");
    }
  }, {
    key: "findComponentById",
    value: function findComponentById(id) {
      return ReactTestUtils.findAllInRenderedTree(this.comp, function (c) {
        return c.id === id;
      })[0];
    }
  }], [{
    key: "click",
    value: function click(comp) {
      return ReactTestUtils.Simulate.click(comp);
    }
  }, {
    key: "pressEnter",
    value: function pressEnter(comp) {
      return ReactTestUtils.Simulate.keyDown(comp, {
        key: "Enter",
        keyCode: 13,
        which: 13
      });
    }
  }, {
    key: "pressTab",
    value: function pressTab(comp) {
      return ReactTestUtils.Simulate.keyDown(comp, {
        key: "Tab",
        keyCode: 9,
        which: 9
      });
    }
  }, {
    key: "changeValue",
    value: function changeValue(comp, value) {
      comp.value = value;
      return ReactTestUtils.Simulate.change(comp);
    }
  }]);
  return TestComponent;
}();