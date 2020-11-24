"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var OverlayTrigger, Popover, PopoverHelpComponent, PropTypes, R, React, _;

PropTypes = require('prop-types');
_ = require('lodash');
React = require('react');
R = React.createElement;
Popover = require('react-bootstrap/lib/Popover');
OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger'); // Shows a popover when help icon is clicked. Needs bootstrap

module.exports = PopoverHelpComponent = function () {
  var PopoverHelpComponent = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2["default"])(PopoverHelpComponent, _React$Component);

    var _super = _createSuper(PopoverHelpComponent);

    function PopoverHelpComponent() {
      (0, _classCallCheck2["default"])(this, PopoverHelpComponent);
      return _super.apply(this, arguments);
    }

    (0, _createClass2["default"])(PopoverHelpComponent, [{
      key: "render",
      value: function render() {
        return R(OverlayTrigger, {
          trigger: this.props.trigger === "hover" ? ["hover", "focus"] : ["click"],
          placement: this.props.placement,
          overlay: R(Popover, null, this.props.children)
        }, R('span', {
          className: "text-muted",
          style: {
            cursor: "pointer"
          }
        }, R('i', {
          className: "fa fa-question-circle"
        })));
      }
    }]);
    return PopoverHelpComponent;
  }(React.Component);

  ;
  PopoverHelpComponent.propTypes = {
    placement: PropTypes.string,
    // "top", "right", "bottom", "left"
    trigger: PropTypes.string // "hover", "click"

  };
  PopoverHelpComponent.defaultProps = {
    placement: "top",
    trigger: "hover"
  };
  return PopoverHelpComponent;
}.call(void 0);