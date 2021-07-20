import PropTypes from "prop-types"
import React from "react"
const R = React.createElement
import _ from "lodash"
import ModalPopupComponent from "./ModalPopupComponent"

interface ActionCancelModalComponentProps {
  /** Title of modal. Any react element */
  title?: any
  /** Action button. Defaults to "Save" */
  actionLabel?: any
  /** Cancel button. Defaults to "Cancel" if action, "Close" otherwise */
  cancelLabel?: any
  /** Called when action button is clicked */
  onAction?: any
  /** Called when cancel is clicked */
  onCancel?: any
  /** Big red destuctive action in footer. Not present if null */
  onDelete?: any
  /** Label of delete button. Default "Delete" */
  deleteLabel?: any
  /** "large" for large, "full" for full width */
  size?: string
  actionBusy?: boolean
}

// Modal with action and cancel buttons
export default class ActionCancelModalComponent extends React.Component<ActionCancelModalComponentProps> {
  render() {
    return React.createElement(
      ModalPopupComponent,
      {
        size: this.props.size,
        header: this.props.title,
        footer: [
          this.props.onAction
            ? R(
                "button",
                {
                  key: "action",
                  type: "button",
                  onClick: this.props.onAction,
                  disabled: this.props.actionBusy,
                  className: "btn btn-primary"
                },
                this.props.actionBusy ? [R("i", { className: "fa fa-spinner fa-spin" }), "\u00A0"] : undefined,
                this.props.actionLabel || "Save"
              )
            : undefined,
          R(
            "button",
            {
              key: "cancel",
              type: "button",
              onClick: this.props.onCancel,
              className: "btn btn-default"
            },
            this.props.cancelLabel || (this.props.onAction ? "Cancel" : "Close")
          ),
          this.props.onDelete
            ? R(
                "button",
                {
                  key: "delete",
                  type: "button",
                  style: { float: "left" },
                  onClick: this.props.onDelete,
                  className: "btn btn-danger"
                },
                this.props.deleteLabel || "Delete"
              )
            : undefined
        ]
      },
      this.props.children
    )
  }
}
