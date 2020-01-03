"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var InnerModalComponent, ModalPopupComponent, PropTypes, R, React, ReactDOM, _;

PropTypes = require('prop-types');
React = require('react');
ReactDOM = require('react-dom');
R = React.createElement;
_ = require('lodash'); // Modal popup based on react

module.exports = ModalPopupComponent = function () {
  var ModalPopupComponent =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inherits2["default"])(ModalPopupComponent, _React$Component);

    function ModalPopupComponent(props) {
      var _this;

      (0, _classCallCheck2["default"])(this, ModalPopupComponent);
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ModalPopupComponent).call(this, props)); // Add special region to body

      _this.modalNode = document.createElement("div"); // append is not supported everywhere https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append#Browser_compatibility

      document.body.appendChild(_this.modalNode);
      return _this;
    }

    (0, _createClass2["default"])(ModalPopupComponent, [{
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
    return ModalPopupComponent;
  }(React.Component);

  ;
  ModalPopupComponent.propTypes = {
    header: PropTypes.node,
    // Header of modal. Any react element
    footer: PropTypes.node,
    // Footer of modal. Any react element
    size: PropTypes.string,
    // "large" for large, "full" for full-width
    showCloseX: PropTypes.bool,
    // True to show close 'x' at top right
    onClose: PropTypes.func,
    // callback function to be called when close is requested
    width: PropTypes.number // For setting arbitary width of the modal

  };
  return ModalPopupComponent;
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
        var dialogClass, dialogStyle, overlayStyle, rootStyle;
        dialogClass = "modal-dialog";

        if (this.props.size === "large") {
          dialogClass += " modal-lg";
        }

        if (this.props.size === "small") {
          dialogClass += " modal-sm";
        }

        if (this.props.size === "full") {
          dialogStyle = {
            width: "95%"
          };
        }

        if (this.props.width) {
          dialogStyle = {
            width: this.props.width
          };
        }

        rootStyle = {
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 1040 // Same as bootstrap modals

        };
        overlayStyle = {
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)"
        };
        return R('div', {
          style: rootStyle
        }, R('style', null, 'body { overflow-y: hidden }'), R('div', {
          style: overlayStyle,
          onClick: this.props.onClose
        }), R('div', {
          className: dialogClass,
          style: dialogStyle
        }, R('div', {
          className: "modal-content"
        }, this.props.header ? R('div', {
          className: "modal-header"
        }, this.props.showCloseX ? R('button', {
          className: "close",
          onClick: this.props.onClose
        }, R('span', null, "\xD7")) : void 0, R('h4', {
          className: "modal-title"
        }, this.props.header)) : void 0, R('div', {
          className: "modal-body",
          style: {
            maxHeight: window.innerHeight - 56 - 65 - 30 - 30,
            overflowY: "auto"
          }
        }, this.props.children), this.props.footer ? R('div', {
          className: "modal-footer"
        }, this.props.footer) : void 0, !this.props.header && this.props.showCloseX ? R('button', {
          className: "close",
          style: {
            position: "absolute",
            right: 10,
            top: 10 // Put above body

          }
        }, R('span', {
          onClick: this.props.onClose
        }, "\xD7")) : void 0)));
      }
    }]);
    return InnerModalComponent;
  }(React.Component);

  ;
  InnerModalComponent.propTypes = {
    header: PropTypes.node,
    // Header of modal. Any react element
    footer: PropTypes.node,
    // Footer of modal. Any react element
    size: PropTypes.string,
    // "large" for large, "full" for full-width
    showCloseX: PropTypes.bool,
    // True to show close 'x' at top right
    onClose: PropTypes.func,
    // callback function to be called when close is requested
    width: PropTypes.number
  };
  return InnerModalComponent;
}.call(void 0);