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

var AutoSizeComponent,
    PropTypes,
    R,
    React,
    ReactDOM,
    Resizable,
    boundMethodCheck = function boundMethodCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new Error('Bound instance method accessed before binding');
  }
};

PropTypes = require('prop-types');
React = require('react');
ReactDOM = require('react-dom');
R = React.createElement;
Resizable = require('./react-component-resizable'); // Automatically injects the width or height of the DOM element into the
// child component, updating as window resizes. 
// If children is a function, calls with with { width:,  height: } depending on injectHeight or injectWidth

module.exports = AutoSizeComponent = function () {
  var AutoSizeComponent = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2["default"])(AutoSizeComponent, _React$Component);

    var _super = _createSuper(AutoSizeComponent);

    function AutoSizeComponent(props) {
      var _this;

      (0, _classCallCheck2["default"])(this, AutoSizeComponent);
      _this = _super.call(this, props);
      _this.updateSize = _this.updateSize.bind((0, _assertThisInitialized2["default"])(_this));
      _this.state = {
        width: null,
        height: null
      };
      return _this;
    }

    (0, _createClass2["default"])(AutoSizeComponent, [{
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
        var node;
        boundMethodCheck(this, AutoSizeComponent); // Get width of self

        node = ReactDOM.findDOMNode(this);
        return this.setState({
          width: node.clientWidth,
          height: node.clientHeight
        });
      }
    }, {
      key: "render",
      value: function render() {
        var innerElem, overrides, style;
        innerElem = null;

        if (this.state.width != null && this.state.height != null) {
          overrides = {};

          if (this.props.injectWidth) {
            overrides.width = this.state.width;
          }

          if (this.props.injectHeight) {
            overrides.height = this.state.height;
          } // Call children to get element if function


          if (typeof this.props.children === "function") {
            innerElem = this.props.children(overrides);
          } else {
            innerElem = React.cloneElement(React.Children.only(this.props.children), overrides);
          }
        }

        style = {
          overflow: "hidden" // Attempt to resolve jittering bug

        };

        if (this.props.injectWidth) {
          style.width = "100%";
        }

        if (this.props.injectHeight) {
          style.height = "100%";
        }

        return R(Resizable, {
          style: style,
          onResize: this.updateSize
        }, innerElem);
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