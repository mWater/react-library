// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
let PopoverHelpComponent
import PropTypes from "prop-types"
import _ from "lodash"
import React from "react"
const R = React.createElement

import Popover from "react-bootstrap/lib/Popover"
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger"

// Shows a popover when help icon is clicked. Needs bootstrap
export default PopoverHelpComponent = (function () {
  PopoverHelpComponent = class PopoverHelpComponent extends React.Component {
    static initClass() {
      this.propTypes = {
        placement: PropTypes.string, // "top", "right", "bottom", "left"
        trigger: PropTypes.string, // "hover", "click"
        content: PropTypes.node // Defaults to gray question circle
      }

      this.defaultProps = {
        placement: "top",
        trigger: "hover"
      }
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
  PopoverHelpComponent.initClass()
  return PopoverHelpComponent
})()
