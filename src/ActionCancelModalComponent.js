let ActionCancelModalComponent;
import PropTypes from 'prop-types';
import React from 'react';
const R = React.createElement;
import _ from 'lodash';
import ModalPopupComponent from './ModalPopupComponent';

// Modal with action and cancel buttons
export default ActionCancelModalComponent = (function() {
  ActionCancelModalComponent = class ActionCancelModalComponent extends React.Component {
    static initClass() {
      this.propTypes = { 
        title: PropTypes.node, // Title of modal. Any react element
        actionLabel: PropTypes.node, // Action button. Defaults to "Save"
        cancelLabel: PropTypes.node, // Cancel button. Defaults to "Cancel" if action, "Close" otherwise
        onAction: PropTypes.func, // Called when action button is clicked
        onCancel: PropTypes.func, // Called when cancel is clicked
        onDelete: PropTypes.func, // Big red destuctive action in footer. Not present if null
        deleteLabel: PropTypes.node, // Label of delete button. Default "Delete"
        size: PropTypes.string, // "large" for large, "full" for full width
        actionBusy: PropTypes.bool
      };
        // True for action button to show spinner and be disabled
    }

    render() {
      return React.createElement(ModalPopupComponent, {
        size: this.props.size,
        header: this.props.title,
        footer: [
          this.props.onAction ? 
            R('button', { 
              key: "action",
              type: "button",
              onClick: this.props.onAction,
              disabled: this.props.actionBusy,
              className: "btn btn-primary"
            },
                this.props.actionBusy ?
                  [
                    R('i', {className: "fa fa-spinner fa-spin"}),
                    "\u00A0"
                  ] : undefined,
                this.props.actionLabel || "Save") : undefined,
          R('button', { 
            key: "cancel",
            type: "button",
            onClick: this.props.onCancel,
            className: "btn btn-default"
          }, 
              this.props.cancelLabel || (this.props.onAction ? "Cancel" : "Close")),
          this.props.onDelete ? 
            R('button', { 
              key: "delete",
              type: "button",
              style: { float: "left" },
              onClick: this.props.onDelete,
              className: "btn btn-danger"
            },
                this.props.deleteLabel || "Delete") : undefined
        ]
      },
        this.props.children);
    }
  };
  ActionCancelModalComponent.initClass();
  return ActionCancelModalComponent;
})();
