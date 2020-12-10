"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var AutoSizeComponent, PropTypes, R, React, ReactDOM, ReactResizeDetector;
PropTypes = require('prop-types');
React = require('react');
ReactDOM = require('react-dom');
R = React.createElement;
ReactResizeDetector = require('react-resize-detector')["default"]; // Automatically injects the width or height of the DOM element into the
// child component, updating as window resizes. 
// If children is a function, calls with with { width:,  height: } depending on injectHeight or injectWidth

module.exports = AutoSizeComponent = function () {
  var AutoSizeComponent = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2["default"])(AutoSizeComponent, _React$Component);

    var _super = _createSuper(AutoSizeComponent);

    function AutoSizeComponent() {
      (0, _classCallCheck2["default"])(this, AutoSizeComponent);
      return _super.apply(this, arguments);
    }

    (0, _createClass2["default"])(AutoSizeComponent, [{
      key: "render",
      value: function render() {
        var _this = this;

        return R(ReactResizeDetector, {
          handleWidth: this.props.injectWidth,
          handleHeight: this.props.injectHeight
        }, function (_ref) {
          var width = _ref.width,
              height = _ref.height,
              targetRef = _ref.targetRef;
          var innerElem, overrides, style; // Set style of outer div

          style = {};

          if (_this.props.injectWidth) {
            style.width = "100%";
          }

          if (_this.props.injectHeight) {
            style.height = "100%";
          } // Return placeholder until width/height known


          if (width == null || height == null) {
            return R('div', {
              style: style,
              ref: targetRef
            });
          }

          overrides = {};

          if (_this.props.injectWidth) {
            overrides.width = width;
          }

          if (_this.props.injectHeight) {
            overrides.height = height;
          }

          if (typeof _this.props.children === "function") {
            innerElem = _this.props.children(overrides);
          } else {
            innerElem = React.cloneElement(React.Children.only(_this.props.children), overrides);
          } // Call children to get element if function


          return R('div', {
            style: style,
            ref: targetRef
          }, innerElem);
        });
      }
    }]);
    return AutoSizeComponent;
  }(React.Component);

  ;
  AutoSizeComponent.propTypes = {
    injectWidth: PropTypes.bool,
    // True to inject width
    injectHeight: PropTypes.bool // True to inject height

  };
  return AutoSizeComponent;
}.call(void 0);