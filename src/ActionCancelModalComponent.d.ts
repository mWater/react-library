import { default as React, Component } from 'react'

declare class ActionCancelModalComponent extends Component<{
  /** Title of modal */
  title?: React.ReactNode
  /** Action button. Defaults to "Save" */
  actionLabel?: React.ReactNode
  deleteLabel?: React.ReactNode
  onAction?: () => void
  onCancel?: () => void
  onDelete?: () => void
  size?: "large" | "full"
}> {}

export default ActionCancelModalComponent
