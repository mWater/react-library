"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var ActionCancelModalComponent, ModalPopupComponent, PropTypes, R, React, _;

PropTypes = require('prop-types');
React = require('react');
R = React.createElement;
_ = require('lodash');
ModalPopupComponent = require('./ModalPopupComponent'); // Modal with action and cancel buttons

module.exports = ActionCancelModalComponent = function () {
  var ActionCancelModalComponent =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inherits2["default"])(ActionCancelModalComponent, _React$Component);

    function ActionCancelModalComponent() {
      (0, _classCallCheck2["default"])(this, ActionCancelModalComponent);
      return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ActionCancelModalComponent).apply(this, arguments));
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
            className: "btn btn-primary"
          }, this.props.actionLabel || "Save") : void 0, this.props.onDelete ? R('button', {
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
    size: PropTypes.string // "large" for large, "full" for full width

  };
  return ActionCancelModalComponent;
}.call(void 0);