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

var AsyncLoadComponent,
    R,
    React,
    ReactDOM,
    boundMethodCheck = function boundMethodCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new Error('Bound instance method accessed before binding');
  }
};

React = require('react');
ReactDOM = require('react-dom');
R = React.createElement; // React component that asynchronously loads something into state from the props
// Handles the common case of wanting to load something but having to deal with the complexities
// of multiple updates, unmounting, componentWillReceiveProps vs componentDidMount, etc.
// To use, override isLoadNeeded to determine if a prop change requires a load
// and load to perform load and call setState with callback value.
// Sets state of loading to true/false appropriately
// DO NOT call @setState or reference @props in load

module.exports = AsyncLoadComponent = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(AsyncLoadComponent, _React$Component);

  var _super = _createSuper(AsyncLoadComponent);

  function AsyncLoadComponent(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, AsyncLoadComponent);
    _this = _super.call(this, props);
    _this.isLoading = _this.isLoading.bind((0, _assertThisInitialized2["default"])(_this));
    _this.state = {
      loading: false
    }; // Keep track if mounted

    _this._mounted = false; // Keep track of load number started and completed to ignore old ones

    _this._loadSeqStarted = 0;
    _this._loadSeqCompleted = 0;
    return _this;
  }

  (0, _createClass2["default"])(AsyncLoadComponent, [{
    key: "isLoading",
    value: function isLoading() {
      boundMethodCheck(this, AsyncLoadComponent);
      return this.state.loading;
    } // Override to determine if a load is needed. Not called on mounting

  }, {
    key: "isLoadNeeded",
    value: function isLoadNeeded(newProps, oldProps) {
      throw new Error("Not implemented");
    } // Call callback with state changes

  }, {
    key: "load",
    value: function load(props, prevProps, callback) {
      throw new Error("Not implemented");
    } // Call to force load

  }, {
    key: "forceLoad",
    value: function forceLoad() {
      return this._performLoad(this.props, this.props);
    }
  }, {
    key: "_performLoad",
    value: function _performLoad(newProps, oldProps) {
      var _this2 = this;

      var callback, seq;
      this._loadSeqStarted += 1;
      seq = this._loadSeqStarted; // Create callback

      callback = function callback(state) {
        // Check if unmounted
        if (!_this2._mounted) {
          return;
        } // Check if out of date


        if (seq < _this2._loadSeqCompleted) {
          return;
        }

        _this2._loadSeqCompleted = seq; // Apply state

        _this2.setState(state); // Check if latest


        if (seq === _this2._loadSeqStarted) {
          return _this2.setState({
            loading: false
          });
        }
      };

      return this.setState({
        loading: true
      }, function () {
        return _this2.load(newProps, oldProps, callback);
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this._mounted = true;
      return this._performLoad(this.props, {});
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.isLoadNeeded(nextProps, this.props)) {
        return this._performLoad(nextProps, this.props);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      return this._mounted = false;
    }
  }]);
  return AsyncLoadComponent;
}(React.Component);