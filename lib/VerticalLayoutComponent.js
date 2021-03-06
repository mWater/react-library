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

var $,
    PropTypes,
    R,
    React,
    VerticalLayoutComponent,
    boundMethodCheck = function boundMethodCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new Error('Bound instance method accessed before binding');
  }
};

$ = require('jquery');
PropTypes = require('prop-types');
React = require('react');
R = React.createElement; // Lays out divs vertically, allowing fractional allocation combined with auto-sized ones
// Children must all have keys
// Children will be cloned with height: prop set in case of fractional ones

module.exports = VerticalLayoutComponent = function () {
  var VerticalLayoutComponent = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2["default"])(VerticalLayoutComponent, _React$Component);

    var _super = _createSuper(VerticalLayoutComponent);

    function VerticalLayoutComponent(props) {
      var _this;

      (0, _classCallCheck2["default"])(this, VerticalLayoutComponent);
      _this = _super.call(this, props);
      _this.recalculateSize = _this.recalculateSize.bind((0, _assertThisInitialized2["default"])(_this));
      _this.state = {
        availableHeight: 0
      };
      return _this;
    }

    (0, _createClass2["default"])(VerticalLayoutComponent, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.height !== this.props.height) {
          return this.recalculateSize(nextProps);
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        return this.recalculateSize(this.props);
      }
    }, {
      key: "recalculateSize",
      value: function recalculateSize(props) {
        var availableHeight, child, i, len, node, ref;
        boundMethodCheck(this, VerticalLayoutComponent); // Calculate available height 

        availableHeight = props.height;
        ref = props.children;

        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];

          if (!child) {
            continue;
          }

          if (props.relativeHeights[child.key]) {
            continue;
          }

          node = this[child.key];
          availableHeight -= $(node).outerHeight();
        }

        return this.setState({
          availableHeight: availableHeight
        });
      } // Get a subcomponent

    }, {
      key: "getComponent",
      value: function getComponent(key) {
        return this[key];
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        // Calculate scaling
        return R('div', {
          style: {
            height: this.props.height
          }
        }, React.Children.map(this.props.children, function (child) {
          var height;

          if (!child) {
            return;
          } // If variable height


          if (child.key && _this2.props.relativeHeights[child.key]) {
            // If available height is known, render variable
            if (_this2.state.availableHeight) {
              height = _this2.state.availableHeight * _this2.props.relativeHeights[child.key];
              return R('div', {
                style: {
                  height: height,
                  position: "relative"
                }
              }, R('div', {
                style: {
                  height: height,
                  overflowY: "auto"
                }
              }, React.cloneElement(child, {
                height: height,
                ref: function ref(c) {
                  _this2[child.key] = c; // Call existing ref

                  if (child.ref) {
                    return child.ref(c);
                  }
                }
              })));
            } // Otherwise don't show until available height is known


            return null;
          }

          return React.cloneElement(child, {
            ref: function ref(c) {
              return _this2[child.key] = c;
            }
          });
        }));
      }
    }]);
    return VerticalLayoutComponent;
  }(React.Component);

  ;
  VerticalLayoutComponent.propTypes = {
    height: PropTypes.number.isRequired,
    relativeHeights: PropTypes.object.isRequired // Fraction to allocate for fractional heights. Should total 1.0. Keyed by key

  };
  return VerticalLayoutComponent;
}.call(void 0);