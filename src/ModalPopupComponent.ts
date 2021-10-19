import PropTypes from "prop-types"
import React from "react"
import ReactDOM from "react-dom"
const R = React.createElement
import _ from "lodash"

interface ModalPopupComponentProps {
  /** Header of modal. Any react element */
  header?: React.ReactNode
  /** Footer of modal. Any react element */
  footer?: React.ReactNode
  /** Size of modal. Default is "normal" */
  size?: "large" | "full" | "normal" | "small"
  /** True to show close 'x' at top right */
  showCloseX?: boolean
  /** callback function to be called when close is requested */
  onClose?: () => void
  width?: number
}

// Modal popup based on react
export default class ModalPopupComponent extends React.Component<ModalPopupComponentProps> {
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
  /** Header of modal. Any react element */
  header?: any
  /** Footer of modal. Any react element */
  footer?: any
  /** "large" for large, "full" for full-width */
  size?: string
  /** True to show close 'x' at top right */
  showCloseX?: boolean
  /** callback function to be called when close is requested */
  onClose?: any
  width?: number
}

// Content must be rendered at body level to prevent weird behaviour, so this is the inner component
class InnerModalComponent extends React.Component<InnerModalComponentProps> {
  render() {
    let dialogStyle
    let dialogClass = "modal-dialog"
    if (this.props.size === "large") {
      dialogClass += " modal-lg"
    }
    if (this.props.size === "small") {
      dialogClass += " modal-sm"
    }
    if (this.props.size === "full") {
      dialogStyle = { width: "95%" }
    }

    if (this.props.width) {
      dialogStyle = { width: this.props.width }
    }

    const rootStyle = {
      position: "fixed",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 1040 // Same as bootstrap modals
    }

    const overlayStyle = {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)"
    }

    return R(
      "div",
      { style: rootStyle },
      R("style", null, "body { overflow-y: hidden }"),
      R("div", { style: overlayStyle, onClick: this.props.onClose }),
      R(
        "div",
        { className: dialogClass, style: dialogStyle },
        R(
          "div",
          { className: "modal-content" },
          this.props.header
            ? R(
                "div",
                { className: "modal-header" },
                this.props.showCloseX
                  ? R("button", { className: "close", onClick: this.props.onClose }, R("span", null, "\u00d7"))
                  : undefined,
                R("h5", { className: "modal-title" }, this.props.header)
              )
            : undefined,

          R(
            "div",
            {
              className: "modal-body",
              style: {
                maxHeight: window.innerHeight - (this.props.header ? 56 : 0) - (this.props.footer ? 65 : 0) - 30 - 30,
                overflowY: "auto"
              }
            },
            this.props.children
          ),
          this.props.footer ? R("div", { className: "modal-footer" }, this.props.footer) : undefined,

          !this.props.header && this.props.showCloseX
            ? R(
                "button",
                { className: "close", style: { position: "absolute", right: 10, top: 10 } }, // Put above body
                R("span", { onClick: this.props.onClose }, "\u00d7")
              )
            : undefined
        )
      )
    )
  }
}
