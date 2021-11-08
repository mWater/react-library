import React from "react"
const R = React.createElement
import _ from "lodash"
import ModalPopupComponent from "./ModalPopupComponent"

export interface ActionCancelModalComponentProps {
  /** Title of modal */
  title?: React.ReactNode
  /** Action button. Defaults to "Save" */
  actionLabel?: React.ReactNode
  /** Cancel button. Defaults to "Cancel" if action, "Close" otherwise */
  cancelLabel?: React.ReactNode
  /** Label of delete button. Default "Delete" */
  deleteLabel?: React.ReactNode
  /** Called when action button is clicked */
  onAction?: () => void
  /** Called when cancel is clicked */
  onCancel?: () => void
  /** Big red destuctive action in footer. Not present if null */
  onDelete?: () => void
  /** "large" for large, "full" for full width */
  size?: "large" | "full"
  /** True for action button to show spinner and be disabled */
  actionBusy?: boolean
  /** True for delete button to show spinner and be disabled */
  deleteBusy?: boolean
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
              className: "btn btn-secondary"
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
                  disabled: this.props.deleteBusy,
                  className: "btn btn-danger"
                },
                this.props.deleteBusy ? [R("i", { className: "fa fa-spinner fa-spin" }), "\u00A0"] : undefined,
                this.props.deleteLabel || "Delete"
              )
            : undefined
        ]
      },
      this.props.children
    )
  }
}
