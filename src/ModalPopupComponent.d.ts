import { default as React, Component } from "react"

declare class ModalPopupComponent extends Component<{
  header?: React.ReactNode
  footer?: React.ReactNode

  /** Size of modal. Default is "normal" */
  size?: "large" | "full" | "normal" | "small"
  width?: number
  showCloseX?: boolean
  onClose?: () => void
}> {}

export default ModalPopupComponent
