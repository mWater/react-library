"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var CrossComponent, PropTypes, R, React, ReactDOM, VerticalTreeLayoutComponent, _;

PropTypes = require('prop-types');
_ = require('lodash');
React = require('react');
ReactDOM = require('react-dom');
R = React.createElement;
CrossComponent = require('./CrossComponent'); // Makes a vertical tree component with lines between

module.exports = VerticalTreeLayoutComponent = function () {
  var VerticalTreeLayoutComponent = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2["default"])(VerticalTreeLayoutComponent, _React$Component);

    var _super = _createSuper(VerticalTreeLayoutComponent);

    function VerticalTreeLayoutComponent() {
      (0, _classCallCheck2["default"])(this, VerticalTreeLayoutComponent);
      return _super.apply(this, arguments);
    }

    (0, _createClass2["default"])(VerticalTreeLayoutComponent, [{
      key: "renderChildren",
      value: function renderChildren() {
        var child, children, i, isCenter, j, len, ref;
        len = React.Children.count(this.props.children);
        children = []; // Alternate spacer and items, ending with spacer

        for (i = j = 0, ref = len * 2 + 1; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          isCenter = i === len; // Add spacer at start

          if (i === 0) {
            children.push(R(CrossComponent, {
              key: i,
              collapseTop: true,
              height: this.props.height
            })); // Add spacer at end
          } else if (i === len * 2) {
            children.push(R(CrossComponent, {
              key: i,
              collapseTop: true,
              height: this.props.height
            })); // Add spacer if odd
          } else if (i % 2 === 0) {
            children.push(R(CrossComponent, {
              key: i,
              collapseTop: true,
              height: this.props.height,
              e: this.props.line,
              w: this.props.line,
              n: isCenter ? this.props.line : void 0
            }));
          } else {
            child = React.Children.toArray(this.props.children)[Math.floor(i / 2)]; // It sets {flexShrink: 0} because without it the boxes where overlapping (on iPad at least)
            //   Note: that fix is based on that article: https://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs/
            //         (It contains many other interesting fixes for flexBox)

            children.push(R('div', {
              key: i,
              className: "flexBox",
              style: {
                flexFlow: "column nowrap",
                justifyContent: "flex-start",
                flexShrink: 0
              }
            }, React.createElement(CrossComponent, {
              collapseTop: true,
              n: isCenter ? this.props.line : void 0,
              s: this.props.line,
              e: i < len * 2 - 1 ? this.props.line : void 0,
              w: i > 1 ? this.props.line : void 0,
              height: this.props.height
            }), child));
          }
        }

        return children;
      } // Make sure to always use className flexBox and not style: {display: 'flex'} (or else it won't work on all browsers)

    }, {
      key: "render",
      value: function render() {
        return R('div', {
          className: "flexBox",
          style: {
            flexFlow: "column nowrap",
            alignItems: "center"
          } // Center head

        }, this.props.headElem, React.Children.count(this.props.children) > 0 ? R(CrossComponent, {
          collapseTop: true,
          height: this.props.height,
          s: this.props.line // Put children

        }) : void 0, R('div', {
          key: "children",
          className: "flexBox",
          style: {
            flexFlow: "row nowrap",
            justifyContent: "flex-start",
            width: "100%"
          }
        }, this.renderChildren()));
      }
    }]);
    return VerticalTreeLayoutComponent;
  }(React.Component);

  ;
  VerticalTreeLayoutComponent.propTypes = {
    headElem: PropTypes.node,
    height: PropTypes.number,
    // e.g. 50
    line: PropTypes.string.isRequired // e.g. "solid 1px gray"

  };
  return VerticalTreeLayoutComponent;
}.call(void 0);