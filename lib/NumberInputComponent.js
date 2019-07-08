"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var NumberInputComponent, PropTypes, R, React, _, ui;

PropTypes = require('prop-types');
_ = require('lodash');
React = require('react');
R = React.createElement;
ui = require('./bootstrap'); // Number input component that handles parsing and maintains state when number is invalid

module.exports = NumberInputComponent = function () {
  var NumberInputComponent =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inherits2["default"])(NumberInputComponent, _React$Component);

    function NumberInputComponent() {
      (0, _classCallCheck2["default"])(this, NumberInputComponent);
      return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(NumberInputComponent).apply(this, arguments));
    }

    (0, _createClass2["default"])(NumberInputComponent, [{
      key: "render",
      value: function render() {
        return React.createElement(ui.NumberInput, {
          decimal: this.props.decimal,
          value: this.props.value,
          onChange: this.props.onChange,
          style: this.props.style,
          size: this.props.small ? "sm" : null
        });
      }
    }]);
    return NumberInputComponent;
  }(React.Component);

  ;
  NumberInputComponent.propTypes = {
    decimal: PropTypes.bool,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.object,
    // Will be merged with style of input box
    small: PropTypes.bool,
    // True to render with input-sm
    placeholder: PropTypes.string // Placeholder text

  };
  NumberInputComponent.defaultProps = {
    decimal: true
  };
  return NumberInputComponent;
}.call(void 0);