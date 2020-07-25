"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ActionCancelModalComponent, ModalPopupComponent, PropTypes, R, React, _;

PropTypes = require('prop-types');
React = require('react');
R = React.createElement;
_ = require('lodash');
ModalPopupComponent = require('./ModalPopupComponent'); // Modal with action and cancel buttons

module.exports = ActionCancelModalComponent = function () {
  var ActionCancelModalComponent = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2["default"])(ActionCancelModalComponent, _React$Component);

    var _super = _createSuper(ActionCancelModalComponent);

    function ActionCancelModalComponent() {
      (0, _classCallCheck2["default"])(this, ActionCancelModalComponent);
      return _super.apply(this, arguments);
    }

    (0, _createClass2["default"])(ActionCancelModalComponent, [{
      key: "render",
      value: function render() {
        return React.createElement(ModalPopupComponent, {
          size: this.props.size,
          header: this.props.title,
          footer: [R('button', {
            key: "cancel",
            type: "button",
            onClick: this.props.onCancel,
            className: "btn btn-default"
          }, this.props.onAction ? "Cancel" : "Close"), this.props.onAction ? R('button', {
            key: "action",
            type: "button",
            onClick: this.props.onAction,
            disabled: this.props.actionBusy,
            className: "btn btn-primary"
          }, this.props.actionBusy ? [R('i', {
            className: "fa fa-spinner fa-spin"
          }), "\xA0"] : void 0, this.props.actionLabel || "Save") : void 0, this.props.onDelete ? R('button', {
            key: "delete",
            type: "button",
            style: {
              "float": "left"
            },
            onClick: this.props.onDelete,
            className: "btn btn-danger"
          }, this.props.deleteLabel || "Delete") : void 0]
        }, this.props.children);
      }
    }]);
    return ActionCancelModalComponent;
  }(React.Component);

  ;
  ActionCancelModalComponent.propTypes = {
    title: PropTypes.node,
    // Title of modal. Any react element
    actionLabel: PropTypes.node,
    // Action button. Defaults to "Save"
    onAction: PropTypes.func,
    // Called when action button is clicked
    onCancel: PropTypes.func,
    // Called when cancel is clicked
    onDelete: PropTypes.func,
    // Big red destuctive action in footer. Not present if null
    deleteLabel: PropTypes.node,
    // Label of delete button. Default "Delete"
    size: PropTypes.string,
    // "large" for large, "full" for full width
    actionBusy: PropTypes.bool // True for action button to show spinner and be disabled

  };
  return ActionCancelModalComponent;
}.call(void 0);