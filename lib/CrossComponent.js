"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var CrossComponent, PropTypes, R, React;
PropTypes = require('prop-types');
React = require('react');
R = React.createElement; // Displays a box with a cross in it with any segments optionally drawn

module.exports = CrossComponent = function () {
  var CrossComponent = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2["default"])(CrossComponent, _React$Component);

    var _super = _createSuper(CrossComponent);

    function CrossComponent() {
      (0, _classCallCheck2["default"])(this, CrossComponent);
      return _super.apply(this, arguments);
    }

    (0, _createClass2["default"])(CrossComponent, [{
      key: "render",
      // Make sure to always use className flexBox and not style: {display: 'flex'} (or else it won't work on all browsers)
      value: function render() {
        // Make horizontal two boxes
        return R('div', {
          className: "flexBox",
          style: {
            display: "flex",
            flexDirection: "column",
            width: this.props.width,
            height: this.props.height
          }
        }, R('div', {
          className: "flexBox",
          style: {
            display: "flex",
            flex: this.props.collapseTop ? "0 1 0px" : "1 1 0px"
          }
        }, R('div', {
          className: "flexBox",
          style: {
            flex: "1 1 0px",
            borderRight: this.props.n,
            borderBottom: this.props.w
          }
        }), R('div', {
          className: "flexBox",
          style: {
            flex: "1 1 0px",
            borderBottom: this.props.e
          }
        })), R('div', {
          className: "flexBox",
          style: {
            display: "flex",
            flex: "1 1 0px"
          }
        }, R('div', {
          className: "flexBox",
          style: {
            flex: "1 1 0px",
            borderRight: this.props.s
          }
        }), R('div', {
          className: "flexBox",
          style: {
            flex: "1 1 0px"
          }
        })));
      }
    }]);
    return CrossComponent;
  }(React.Component);

  ;
  CrossComponent.propTypes = {
    n: PropTypes.string,
    // north border style (e.g. "solid 1px blue")
    e: PropTypes.string,
    // east border style (e.g. "solid 1px blue")
    s: PropTypes.string,
    // south border style (e.g. "solid 1px blue")
    w: PropTypes.string,
    // west border style (e.g. "solid 1px blue")
    width: PropTypes.any,
    // 100% or 20, etc. Default: 100%
    height: PropTypes.any,
    // 100% or 20, etc. Default: 100%
    collapseTop: PropTypes.bool // True to collapse top half of box

  };
  CrossComponent.defaultProps = {
    width: "100%",
    height: "100%"
  };
  return CrossComponent;
}.call(void 0);