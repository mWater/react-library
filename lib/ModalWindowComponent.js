"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var InnerModalComponent, ModalWindowComponent, PropTypes, R, React, ReactDOM, _;

PropTypes = require('prop-types');
React = require('react');
ReactDOM = require('react-dom');
R = React.createElement;
_ = require('lodash'); // Modal window that fills screen

module.exports = ModalWindowComponent = function () {
  var ModalWindowComponent =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inherits2["default"])(ModalWindowComponent, _React$Component);

    function ModalWindowComponent(props) {
      var _this;

      (0, _classCallCheck2["default"])(this, ModalWindowComponent);
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ModalWindowComponent).call(this, props)); // Add special region to body

      _this.modalNode = document.createElement("div"); // append is not supported everywhere https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append#Browser_compatibility

      document.body.appendChild(_this.modalNode);
      return _this;
    }

    (0, _createClass2["default"])(ModalWindowComponent, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        return this.modalNode.remove();
      }
    }, {
      key: "render",
      value: function render() {
        return ReactDOM.createPortal(R(InnerModalComponent, this.props), this.modalNode);
      } // Static version that displays a modal until the onClose is called.
      // modalFunc takes close function as a single parameter and returns a ModalWindowComponent

    }], [{
      key: "show",
      value: function show(modalFunc, onClose) {
        var close, popupElem, tempDiv; // Create temporary div to render into

        tempDiv = document.createElement("div"); // Create close function

        close = function close() {
          // Unrender
          ReactDOM.unmountComponentAtNode(tempDiv); // Remove div

          tempDiv.remove(); // Call onClose

          if (onClose) {
            return onClose();
          }
        };

        popupElem = modalFunc(close);
        return ReactDOM.render(popupElem, tempDiv);
      }
    }]);
    return ModalWindowComponent;
  }(React.Component);

  ;
  ModalWindowComponent.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func,
    backgroundColor: PropTypes.string,
    outerPadding: PropTypes.number,
    // Outer padding default 40
    innerPadding: PropTypes.number // Inner padding default 20

  };
  return ModalWindowComponent;
}.call(void 0);

InnerModalComponent = function () {
  // Content must be rendered at body level to prevent weird behaviour, so this is the inner component
  var InnerModalComponent =
  /*#__PURE__*/
  function (_React$Component2) {
    (0, _inherits2["default"])(InnerModalComponent, _React$Component2);

    function InnerModalComponent() {
      (0, _classCallCheck2["default"])(this, InnerModalComponent);
      return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(InnerModalComponent).apply(this, arguments));
    }

    (0, _createClass2["default"])(InnerModalComponent, [{
      key: "render",
      value: function render() {
        var closeStyle, contentStyle, overlayStyle, windowStyle;

        if (!this.props.isOpen) {
          return null;
        }

        overlayStyle = {
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 1040,
          // Same as bootstrap modals
          backgroundColor: "rgba(0, 0, 0, 0.7)"
        };
        windowStyle = {
          position: "fixed",
          left: this.props.outerPadding,
          right: this.props.outerPadding,
          top: this.props.outerPadding,
          bottom: this.props.outerPadding,
          zIndex: 1040,
          // Same as bootstrap modals
          backgroundColor: this.props.backgroundColor,
          borderRadius: 10,
          border: "solid 1px #AAA"
        };
        contentStyle = {
          position: "absolute",
          left: this.props.innerPadding,
          right: this.props.innerPadding,
          top: this.props.innerPadding,
          bottom: this.props.innerPadding,
          overflowY: "auto" // Allow scrolling

        };
        closeStyle = {
          position: "absolute",
          right: 8,
          top: 8,
          color: "#888",
          cursor: "pointer"
        };
        return R('div', {
          className: "modal-window-component"
        }, R('style', null, 'body { overflow-y: hidden }'), R('div', {
          style: overlayStyle,
          onClick: this.props.onRequestClose,
          className: "modal-window-component-overlay"
        }), R('div', {
          style: windowStyle,
          className: "modal-window-component-window"
        }, R('div', {
          style: contentStyle
        }, this.props.children), this.props.onRequestClose ? R('div', {
          style: closeStyle
        }, R('span', {
          className: "glyphicon glyphicon-remove",
          onClick: this.props.onRequestClose
        })) : void 0));
      }
    }]);
    return InnerModalComponent;
  }(React.Component);

  ;
  InnerModalComponent.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func,
    outerPadding: PropTypes.number,
    // Outer padding default 40
    innerPadding: PropTypes.number,
    // Inner padding default 20
    backgroundColor: PropTypes.string
  };
  InnerModalComponent.defaultProps = {
    outerPadding: 40,
    innerPadding: 20,
    backgroundColor: "white"
  };
  return InnerModalComponent;
}.call(void 0);