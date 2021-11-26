import PropTypes from "prop-types"

//
// Divider
//
// Internally used by SplitPane to create the draggable divider between 2 panes
//
// Vertical splitpane divider gets the classes "divider vertical"
// Horizontal splitpane divider gets the classes "divider horizontal"

import React, { CSSProperties } from "react"

const R = React.createElement

export default class Divider extends React.Component<{
  split?: "vertical" | "horizontal"
  onMouseDown: (ev: any) => void
}> {
  onMouseDown = (event: any) => {
    return this.props.onMouseDown(event)
  }

  render() {
    const classNames = ["divider"]
    const style: CSSProperties = {
      backgroundColor: "#aeaeae"
    }

    if (this.props.split === "horizontal") {
      classNames.push("horizontal")
      style.height = 4
      style.cursor = "row-resize"
    } else {
      classNames.push("vertical")
      style.width = 4
      style.cursor = "col-resize"
    }

    return R("div", { className: classNames.join(" "), onMouseDown: this.onMouseDown })
  }
}
