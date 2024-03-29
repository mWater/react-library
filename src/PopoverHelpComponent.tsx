import _ from "lodash"
import React, { ReactNode } from "react"
import ReactDOM from "react-dom"
import Popover from "bootstrap/js/dist/popover"

export interface PopoverHelpComponentProps {
  placement?: "top" | "right" | "bottom" | "left"

  /** hover is default */
  trigger?: "hover" | "click"

  /** Override content. Defaults to gray question circle */
  content?: ReactNode
}

/** Shows a popover when help icon is clicked. Needs bootstrap */
export default class PopoverHelpComponent extends React.Component<PopoverHelpComponentProps> {
  divRef = (el: any) => {
    if (el) {
      // Create div with content
      const contentDiv = document.createElement("div")
      ReactDOM.render(this.props.children as any, contentDiv)
      new Popover(el, {
        content: contentDiv,
        trigger: this.props.trigger || "hover",
        placement: this.props.placement || "top",
        html: true
      })
    }
  }


  render() {
    return <span ref={this.divRef}>
      {
        this.props.content ? 
        this.props.content : 
        <span className="text-muted" style={{ cursor: "pointer" }}>
          <i className="fa fa-question-circle"/>
        </span>
      }
    </span>
  }
}
