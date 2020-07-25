"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Divider,
    PropTypes,
    R,
    React,
    boundMethodCheck = function boundMethodCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new Error('Bound instance method accessed before binding');
  }
};

PropTypes = require('prop-types'); // Divider
// Internally used by SplitPane to create the draggable divider between 2 panes
// Vertical splitpane divider gets the classes "divider vertical"
// Horizontal splitpane divider gets the classes "divider horizontal"

React = require('react');
R = React.createElement;

module.exports = Divider = function () {
  var Divider = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2["default"])(Divider, _React$Component);

    var _super = _createSuper(Divider);

    function Divider() {
      var _this;

      (0, _classCallCheck2["default"])(this, Divider);
      _this = _super.apply(this, arguments);
      _this.onMouseDown = _this.onMouseDown.bind((0, _assertThisInitialized2["default"])(_this));
      return _this;
    }

    (0, _createClass2["default"])(Divider, [{
      key: "onMouseDown",
      value: function onMouseDown(event) {
        boundMethodCheck(this, Divider);
        return this.props.onMouseDown(event);
      }
    }, {
      key: "render",
      value: function render() {
        var classNames;
        classNames = ["divider"];

        if (this.props.split === "vertical") {
          classNames.push("vertical");
        }

        if (this.props.split === "horizontal") {
          classNames.push("horizontal");
        }

        return R('div', {
          className: classNames.join(" "),
          onMouseDown: this.onMouseDown
        });
      }
    }], [{
      key: "defaultProps",
      value: function defaultProps() {
        return {
          split: 'vertical'
        };
      }
    }]);
    return Divider;
  }(React.Component);

  ;
  Divider.propTypes = {
    split: PropTypes.oneOf(['vertical', 'horizontal'])
  };
  return Divider;
}.call(void 0);