"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var LoadingComponent, PropTypes, R, React;
PropTypes = require('prop-types');
React = require('react');
R = React.createElement; // Displays a spinner with loading in the center

module.exports = LoadingComponent = function () {
  var LoadingComponent = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2["default"])(LoadingComponent, _React$Component);

    var _super = _createSuper(LoadingComponent);

    function LoadingComponent() {
      (0, _classCallCheck2["default"])(this, LoadingComponent);
      return _super.apply(this, arguments);
    }

    (0, _createClass2["default"])(LoadingComponent, [{
      key: "render",
      value: function render() {
        return R('div', {
          style: {
            width: this.props.width,
            height: this.props.height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        }, this.props.label);
      }
    }]);
    return LoadingComponent;
  }(React.Component);

  ;
  LoadingComponent.propTypes = {
    width: PropTypes.any,
    // Defaults to 100%
    height: PropTypes.any,
    // Defaults to 100%
    label: PropTypes.node // Defaults to Loading...

  };
  LoadingComponent.defaultProps = {
    width: "100%",
    height: "100%",
    label: R('div', {
      className: "text-muted",
      style: {
        fontSize: 30
      }
    }, R('i', {
      className: "fa fa-spin fa-spinner"
    }), " Loading...")
  };
  return LoadingComponent;
}.call(void 0);