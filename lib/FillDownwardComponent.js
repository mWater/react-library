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

var FillDownwardComponent,
    R,
    React,
    ReactDOM,
    Resizable,
    boundMethodCheck = function boundMethodCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new Error('Bound instance method accessed before binding');
  }
};

React = require('react');
ReactDOM = require('react-dom');
R = React.createElement;
Resizable = require('./react-component-resizable'); // Component which sets its height to automatically fill all remaining vertical space

module.exports = FillDownwardComponent = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(FillDownwardComponent, _React$Component);

  var _super = _createSuper(FillDownwardComponent);

  function FillDownwardComponent(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, FillDownwardComponent);
    _this = _super.call(this, props);
    _this.updateSize = _this.updateSize.bind((0, _assertThisInitialized2["default"])(_this));
    _this.state = {
      height: null
    };
    return _this;
  }

  (0, _createClass2["default"])(FillDownwardComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Listen for changes
      window.addEventListener('resize', this.updateSize);
      return this.updateSize();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // Stop listening to resize events
      return window.removeEventListener('resize', this.updateSize);
    }
  }, {
    key: "updateSize",
    value: function updateSize() {
      var height, self, vpos;
      boundMethodCheck(this, FillDownwardComponent);
      self = this.self;

      if (!self) {
        return;
      } // Get vertical position of self


      vpos = self.getBoundingClientRect().top + window.scrollY; // Get vertical space remaining

      height = window.innerHeight - vpos; // Limit to 50 at smallest

      return this.setState({
        height: Math.max(height, 50)
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // If height is not known, render placeholder
      if (!this.state.height) {
        return R('div', {
          style: {
            height: 100
          },
          ref: function ref(c) {
            return _this2.self = c;
          }
        });
      } // Render with correct height


      return R('div', {
        style: {
          height: this.state.height
        },
        ref: function ref(c) {
          return _this2.self = c;
        }
      }, this.props.children);
    }
  }]);
  return FillDownwardComponent;
}(React.Component);