import { default as React, Component } from 'react'

declare class ModalPopupComponent extends Component<{
  header?: React.ReactNode
  footer?: React.ReactNode
  size?: "large" | "full"
  showCloseX?: boolean
  onClose?: () => void
}> {}

export default ModalPopupComponent