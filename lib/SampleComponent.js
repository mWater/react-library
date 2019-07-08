"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var AutoSizeComponent, R, React, SampleComponent, SplitPane;
React = require('react');
SplitPane = require('./SplitPane');
AutoSizeComponent = require('./AutoSizeComponent');
R = React.createElement; // This is a nice sample component

module.exports = SampleComponent =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(SampleComponent, _React$Component);

  function SampleComponent() {
    (0, _classCallCheck2["default"])(this, SampleComponent);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SampleComponent).apply(this, arguments));
  }

  (0, _createClass2["default"])(SampleComponent, [{
    key: "render",
    value: function render() {
      var style1;
      style1 = {
        height: 300,
        width: 300,
        border: "1px solid #000"
      };
      return React.createElement(SplitPane, {
        split: "vertical",
        firstPaneSize: "20%",
        minFirstPaneSize: 100
      }, [//      R 'div', null
      R(AutoSizeComponent, {
        injectWidth: true,
        injectHeight: true
      }, R('div', null, "width only")), React.createElement(SplitPane, {
        split: "horizontal",
        firstPaneSize: "20%",
        minFirstPaneSize: 100
      }, [R(AutoSizeComponent, {
        injectWidth: true,
        injectHeight: true
      }, R('div', {
        height: 300
      }, "height")), React.createElement(SplitPane, {
        split: "vertical",
        firstPaneSize: 300,
        minFirstPaneSize: 200
      }, [R(AutoSizeComponent, {
        injectWidth: true,
        injectHeight: true
      }, R('div', {
        height: 300
      }, "width and height")), R('div', null)])])]);
    }
  }]);
  return SampleComponent;
}(React.Component);