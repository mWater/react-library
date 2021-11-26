import PropTypes from "prop-types"
import _ from "lodash"
import React from "react"
import ReactDOM from "react-dom"
const R = React.createElement

import CrossComponent from "./CrossComponent"

export interface VerticalTreeLayoutComponentProps {
  headElem?: any
  /** e.g. 50 */
  height?: number
  line: string
}

// Makes a vertical tree component with lines between
export default class VerticalTreeLayoutComponent extends React.Component<VerticalTreeLayoutComponentProps> {
  renderChildren() {
    const len = React.Children.count(this.props.children)

    const children = []

    // Alternate spacer and items, ending with spacer
    for (let i = 0, end = len * 2 + 1, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
      const isCenter = i === len

      // Add spacer at start
      if (i === 0) {
        children.push(R(CrossComponent, { key: i, collapseTop: true, height: this.props.height }))

        // Add spacer at end
      } else if (i === len * 2) {
        children.push(R(CrossComponent, { key: i, collapseTop: true, height: this.props.height }))

        // Add spacer if odd
      } else if (i % 2 === 0) {
        children.push(
          R(CrossComponent, {
            key: i,
            collapseTop: true,
            height: this.props.height,
            e: this.props.line,
            w: this.props.line,
            n: isCenter ? this.props.line : undefined
          })
        )
      } else {
        const child = React.Children.toArray(this.props.children)[Math.floor(i / 2)]

        // It sets {flexShrink: 0} because without it the boxes where overlapping (on iPad at least)
        //   Note: that fix is based on that article: https://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs/
        //         (It contains many other interesting fixes for flexBox)
        children.push(
          R(
            "div",
            {
              key: i,
              style: { display: "flex", flexFlow: "column nowrap", justifyContent: "flex-start", flexShrink: 0 }
            },
            React.createElement(CrossComponent, {
              collapseTop: true,
              n: isCenter ? this.props.line : undefined,
              s: this.props.line,
              e: i < len * 2 - 1 ? this.props.line : undefined,
              w: i > 1 ? this.props.line : undefined,
              height: this.props.height
            }),
            child
          )
        )
      }
    }

    return children
  }

  render() {
    return R(
      "div",
      { style: { display: "flex", flexFlow: "column nowrap", alignItems: "center" } },
      // Center head
      this.props.headElem,
      React.Children.count(this.props.children) > 0
        ? R(CrossComponent, { collapseTop: true, height: this.props.height, s: this.props.line })
        : undefined,
      // Put children
      R(
        "div",
        {
          key: "children",
          style: { display: "flex", flexFlow: "row nowrap", justifyContent: "flex-start", width: "100%" }
        },
        this.renderChildren()
      )
    )
  }
}
