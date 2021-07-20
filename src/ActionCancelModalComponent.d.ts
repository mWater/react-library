import { default as React, Component } from "react"

declare class ActionCancelModalComponent extends Component<{
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
}> {}

export default ActionCancelModalComponent
