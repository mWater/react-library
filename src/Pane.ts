import PropTypes from "prop-types"

// Pane
//
// Internally used by SplitPane to create the resizable panes
//
// Vertical splitpane panes gets the classes "pane vertical"
// Horizontal splitpane panes gets the classes "pane horizontal"
//
// The first pane gets an added class "first"

import React, { CSSProperties } from "react"

const R = React.createElement

export default class Pane extends React.Component<{
  split?: "vertical" | "horizontal"
  width?: number | string
}> {
  static defaultProps() {
    return { split: "vertical" }
  }

  render() {
    const classNames = ["pane"]
    const style: CSSProperties = {
      flex: "0 0 auto",
      position: "relative"
    }

    if (this.props.split === "vertical") {
      classNames.push("vertical")
      if (this.props.width != null) {
        style.width = this.props.width
      }
    } else {
      classNames.push("horizontal")
      if (this.props.width != null) {
        style.height = this.props.width
      }
    }

    if (this.props.width) {
      classNames.push("first")
    } else {
      style.flex = 1
      if (this.props.split === "vertical") {
        style.width = "100%"
      } else {
        style.height = "100%"
      }
    }

    return R("div", { style, className: classNames.join(" ") }, this.props.children)
  }
}
