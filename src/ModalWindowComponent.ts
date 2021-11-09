import React from "react"
import ReactDOM from "react-dom"
const R = React.createElement
import _ from "lodash"

export interface ModalWindowComponentProps {
  /** True to display modal window */
  isOpen: boolean

  /** Called when close X is clicked */
  onRequestClose?: () => void

  backgroundColor?: string
  /** Outer padding default 40 */
  outerPadding?: number
  /** Inner padding default 20 */
  innerPadding?: number
}

// Modal window that fills screen
export default class ModalWindowComponent extends React.Component<ModalWindowComponentProps> {
  modalNode: any

  static show = (modalFunc: any, onClose: any) => {
    // Create temporary div to render into
    const tempDiv = document.createElement("div")

    // Create close function
    const close = () => {
      // Unrender
      ReactDOM.unmountComponentAtNode(tempDiv)

      // Remove div
      tempDiv.remove()

      // Call onClose
      if (onClose) {
        return onClose()
      }
    }

    const popupElem = modalFunc(close)
    return ReactDOM.render(popupElem, tempDiv)
  }

  constructor(props: any) {
    super(props)

    // Add special region to body
    this.modalNode = document.createElement("div")

    // append is not supported everywhere https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append#Browser_compatibility
    if (document.fullscreenElement) {
      document.fullscreenElement.appendChild(this.modalNode)
    } else {
      document.body.appendChild(this.modalNode)
    }
  }

  componentWillUnmount() {
    return this.modalNode.remove()
  }

  render() {
    return ReactDOM.createPortal(R(InnerModalComponent, this.props), this.modalNode)
  }
}

interface InnerModalComponentProps {
  isOpen: boolean
  onRequestClose?: any
  /** Outer padding default 40 */
  outerPadding?: number
  /** Inner padding default 20 */
  innerPadding?: number
  backgroundColor?: string
}

// Content must be rendered at body level to prevent weird behaviour, so this is the inner component
class InnerModalComponent extends React.Component<InnerModalComponentProps> {
  static defaultProps = {
    outerPadding: 40,
    innerPadding: 20,
    backgroundColor: "white"
  }

  render() {
    if (!this.props.isOpen) {
      return null
    }

    const overlayStyle = {
      position: "fixed",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 1040, // Same as bootstrap modals
      backgroundColor: "rgba(0, 0, 0, 0.7)"
    }

    const windowStyle = {
      position: "fixed",
      left: this.props.outerPadding,
      right: this.props.outerPadding,
      top: this.props.outerPadding,
      bottom: this.props.outerPadding,
      zIndex: 1040, // Same as bootstrap modals
      backgroundColor: this.props.backgroundColor,
      borderRadius: 10,
      border: "solid 1px #AAA"
    }

    const contentStyle = {
      position: "absolute",
      left: this.props.innerPadding,
      right: this.props.innerPadding,
      top: this.props.innerPadding,
      bottom: this.props.innerPadding,
      overflowY: "auto" // Allow scrolling
    }

    const closeStyle = {
      position: "absolute",
      right: 8,
      top: 8,
      color: "#888",
      cursor: "pointer"
    }

    return R(
      "div",
      { className: "modal-window-component" },
      R("style", null, "body { overflow-y: hidden }"),
      R("div", {
        style: overlayStyle,
        onClick: this.props.onRequestClose,
        className: "modal-window-component-overlay"
      }),
      R(
        "div",
        { style: windowStyle, className: "modal-window-component-window" },
        R("div", { style: contentStyle }, this.props.children),
        this.props.onRequestClose
          ? R("div", { style: closeStyle }, R("i", { className: "fa fa-remove", onClick: this.props.onRequestClose }))
          : undefined
      )
    )
  }
}
