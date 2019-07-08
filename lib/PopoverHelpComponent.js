"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var OverlayTrigger, Popover, PopoverHelpComponent, PropTypes, R, React, _;

PropTypes = require('prop-types');
_ = require('lodash');
React = require('react');
R = React.createElement;
Popover = require('react-bootstrap/lib/Popover');
OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger'); // Shows a popover when help icon is clicked. Needs bootstrap

module.exports = PopoverHelpComponent = function () {
  var PopoverHelpComponent =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inherits2["default"])(PopoverHelpComponent, _React$Component);

    function PopoverHelpComponent() {
      (0, _classCallCheck2["default"])(this, PopoverHelpComponent);
      return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(PopoverHelpComponent).apply(this, arguments));
    }

    (0, _createClass2["default"])(PopoverHelpComponent, [{
      key: "render",
      value: function render() {
        return R(OverlayTrigger, {
          trigger: ["hover", "focus"],
          placement: this.props.placement,
          overlay: R(Popover, null, this.props.children)
        }, R('span', {
          className: "text-muted",
          style: {
            cursor: "pointer"
          }
        }, R('span', {
          className: "glyphicon glyphicon-question-sign"
        })));
      }
    }]);
    return PopoverHelpComponent;
  }(React.Component);

  ;
  PopoverHelpComponent.propTypes = {
    placement: PropTypes.string // "top", "right", "bottom", "left"

  };
  PopoverHelpComponent.defaultProps = {
    placement: "top"
  };
  return PopoverHelpComponent;
}.call(void 0);