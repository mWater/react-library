import PropTypes from "prop-types"
import _ from "lodash"
import React, { ReactNode } from "react"
const R = React.createElement

import Popover from "react-bootstrap/lib/Popover"
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger"

interface PopoverHelpComponentProps {
  placement?: "top" | "right" | "bottom" | "left"

  /** hover is default */
  trigger?: "hover" | "click"

  /** Override content. Defaults to gray question circle */
  content?: ReactNode
}

/** Shows a popover when help icon is clicked. Needs bootstrap */
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
