"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Pane, PropTypes, R, React;
PropTypes = require('prop-types'); // Pane
// Internally used by SplitPane to create the resizable panes
// Vertical splitpane panes gets the classes "pane vertical"
// Horizontal splitpane panes gets the classes "pane horizontal"
// The first pane gets an added class "first"

React = require('react');
R = React.createElement;

module.exports = Pane = function () {
  var Pane = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2["default"])(Pane, _React$Component);

    var _super = _createSuper(Pane);

    function Pane() {
      (0, _classCallCheck2["default"])(this, Pane);
      return _super.apply(this, arguments);
    }

    (0, _createClass2["default"])(Pane, [{
      key: "render",
      value: function render() {
        var classNames, style;
        classNames = ["pane"];
        style = {
          flex: "0 0 auto",
          position: "relative"
        };

        if (this.props.split === 'vertical') {
          classNames.push('vertical');

          if (this.props.width != null) {
            style.width = this.props.width;
          }
        } else {
          classNames.push('horizontal');

          if (this.props.width != null) {
            style.height = this.props.width;
          }
        }

        if (this.props.width) {
          classNames.push("first");
        } else {
          style.flex = 1;

          if (this.props.split === 'vertical') {
            style.width = "100%";
          } else {
            style.height = "100%";
          }
        }

        return R('div', {
          style: style,
          className: classNames.join(" ")
        }, this.props.children);
      }
    }], [{
      key: "defaultProps",
      value: function defaultProps() {
        return {
          split: 'vertical'
        };
      }
    }]);
    return Pane;
  }(React.Component);

  ;
  Pane.propTypes = {
    split: PropTypes.oneOf(['vertical', 'horizontal']),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };
  return Pane;
}.call(void 0);