import PropTypes from "prop-types"
import _ from "lodash"
import React from "react"
const R = React.createElement

import Popover from "react-bootstrap/lib/Popover"
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger"

interface PopoverHelpComponentProps {
  /** "top", "right", "bottom", "left" */
  placement?: string
  /** "hover", "click" */
  trigger?: string
  /** Defaults to gray question circle */
  content?: any
}

// Shows a popover when help icon is clicked. Needs bootstrap
export default class PopoverHelpComponent extends React.Component<PopoverHelpComponentProps> {
  static defaultProps = {
    placement: "top",
    trigger: "hover"
  }

  render() {
    return R(
      OverlayTrigger,
      {
        trigger: this.props.trigger === "hover" ? ["hover", "focus"] : ["click"],
        placement: this.props.placement,
        overlay: R(Popover, null, this.props.children)
      },
      this.props.content
        ? this.props.content
        : R(
            "span",
            { className: "text-muted", style: { cursor: "pointer" } },
            R("i", { className: "fa fa-question-circle" })
          )
    )
  }
}
