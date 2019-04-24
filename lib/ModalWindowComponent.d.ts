import { default as React, Component } from 'react'

declare class ModalWindowComponent extends Component<{
  /** True to display modal window */
  isOpen: boolean
  
  /** Called when close X is clicked */
  onRequestClose?: () => void

  backgroundColor?: string
  /** Outer padding default 40 */
  outerPadding?: number
  /** Inner padding default 20 */
  innerPadding?: number
}> {}

export default ModalWindowComponent