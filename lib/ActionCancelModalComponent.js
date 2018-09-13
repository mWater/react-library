var ActionCancelModalComponent, ModalPopupComponent, PropTypes, R, React, _,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PropTypes = require('prop-types');

React = require('react');

R = React.createElement;

_ = require('lodash');

ModalPopupComponent = require('./ModalPopupComponent');

module.exports = ActionCancelModalComponent = (function(superClass) {
  extend(ActionCancelModalComponent, superClass);

  function ActionCancelModalComponent() {
    return ActionCancelModalComponent.__super__.constructor.apply(this, arguments);
  }

  ActionCancelModalComponent.propTypes = {
    title: PropTypes.node,
    actionLabel: PropTypes.node,
    onAction: PropTypes.func,
    onCancel: PropTypes.func,
    onDelete: PropTypes.func,
    deleteLabel: PropTypes.node,
    size: PropTypes.string
  };

  ActionCancelModalComponent.prototype.render = function() {
    return React.createElement(ModalPopupComponent, {
      size: this.props.size,
      header: this.props.title,
      footer: [
        R('button', {
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
            float: "left"
          },
          onClick: this.props.onDelete,
          className: "btn btn-danger"
        }, this.props.deleteLabel || "Delete") : void 0
      ]
    }, this.props.children);
  };

  return ActionCancelModalComponent;

})(React.Component);
