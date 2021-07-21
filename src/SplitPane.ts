import PropTypes from "prop-types"

//
// SplitPane component
//
// Create a resizable split pane with a draggable divider
//
// React.createElement(SplitPane, {split: "vertical", firstPaneSize: "20%", minFirstPaneSize: 200}, [
//   R 'div', null
//   R 'div', null
// ])
//
// Vertical splitpane gets the classes "splitpane vertical"
// Horizontal splitpane divider gets the classes "splitpane horizontal"

import React, { CSSProperties } from "react"

const R = React.createElement
import Pane from "./Pane"
import Divider from "./Divider"
import ReactDOM from "react-dom"

export interface SplitPaneProps {
  // The split type "vertical" or "horizontal"
  split: "vertical" | "horizontal"

  // Size of the first pane. Takes a string with percentage value ("20%") or a number in pixels (300)
  firstPaneSize?: string | number

  // Minimum size of the first pane. The first pane cannot be resized past this size. Takes a number in pixels
  minFirstPaneSize?: number

  // Callback function that will be called when the resizing is done.
  // The current size of the firstpane is passed as first argument
  onResize: (size?: number | string) => void
}

export default class SplitPane extends React.Component<SplitPaneProps, { resizing: boolean, firstPaneSize?: string | number, dragStartAt?: any }> {
  firstPane: any

  constructor(props: SplitPaneProps) {
    super(props)
    this.state = {
      resizing: false,
      firstPaneSize: this.props.firstPaneSize
    }
  }

  static defaultProps() {
    return { split: "vertical" }
  }

  onMouseUp = () => {
    if (this.state.resizing) {
      this.setState({ resizing: false })
      return this.props.onResize?.(this.state.firstPaneSize)
    }
  }

  onMouseDown = (event: any) => {
    const dragStartAt = this.props.split === "vertical" ? event.clientX : event.clientY
    return this.setState({ resizing: true, dragStartAt })
  }

  onMouseMove = (event: any) => {
    if (this.state.resizing) {
      let currentPosition, firstPaneSize
      if (this.props.split === "vertical") {
        firstPaneSize = (ReactDOM.findDOMNode(this.firstPane) as HTMLElement).offsetWidth
        currentPosition = event.clientX
      } else {
        firstPaneSize = (ReactDOM.findDOMNode(this.firstPane) as HTMLElement).offsetHeight
        currentPosition = event.clientY
      }

      const newSize = firstPaneSize - (this.state.dragStartAt - currentPosition)
      this.setState({ dragStartAt: currentPosition })

      if (this.props.minFirstPaneSize != null && this.props.minFirstPaneSize < newSize) {
        return this.setState({ firstPaneSize: newSize })
      }
    }
  }

  render() {
    const classNames = ["splitpane"]
    const style: CSSProperties = {
      display: "flex",
      flex: 1,
      height: "100%",
      position: "absolute"
    }

    if (this.props.split === "horizontal") {
      style.width = "100%"
      style.top = 0
      style.bottom = 0
      style.flexDirection = "column"
      classNames.push("horizontal")
    }

    if (this.props.split === "vertical") {
      style.right = 0
      style.left = 0
      style.flexDirection = "row"
      classNames.push("vertical")
    }

    return R(
      "div",
      { style, className: classNames.join(" "), onMouseMove: this.onMouseMove, onMouseUp: this.onMouseUp },
      React.createElement(
        Pane,
        {
          split: this.props.split,
          width: this.state.firstPaneSize,
          ref: (c) => {
            return (this.firstPane = c)
          }
        },
        this.props.children![0]
      ),
      React.createElement(Divider, { ref: "divider", split: this.props.split, onMouseDown: this.onMouseDown }),
      React.createElement(Pane, { split: this.props.split, ref: "rightPane" }, this.props.children![1])
    )
  }
}
