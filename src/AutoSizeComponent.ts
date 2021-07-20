// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
let AutoSizeComponent
import PropTypes from "prop-types"
import React from "react"
import ReactDOM from "react-dom"
const R = React.createElement
import { default as ReactResizeDetector } from "react-resize-detector"

// Automatically injects the width or height of the DOM element into the
// child component, updating as window resizes.
// If children is a function, calls with with { width:,  height: } depending on injectHeight or injectWidth
export default AutoSizeComponent = (function () {
  AutoSizeComponent = class AutoSizeComponent extends React.Component {
    static initClass() {
      this.propTypes = {
        injectWidth: PropTypes.bool, // True to inject width
        injectHeight: PropTypes.bool
      }
      // True to inject height
    }

    render() {
      return R(
        ReactResizeDetector,
        { handleWidth: this.props.injectWidth, handleHeight: this.props.injectHeight },
        ({ width, height, targetRef }) => {
          // Set style of outer div
          let innerElem
          const style = {}
          if (this.props.injectWidth) {
            style.width = "100%"
          }
          if (this.props.injectHeight) {
            style.height = "100%"
          }

          // Return placeholder until width/height known
          if (width == null || height == null) {
            return R("div", { style, ref: targetRef })
          }

          const overrides = {}
          if (this.props.injectWidth) {
            overrides.width = width
          }
          if (this.props.injectHeight) {
            overrides.height = height
          }

          if (typeof this.props.children === "function") {
            innerElem = this.props.children(overrides)
          } else {
            innerElem = React.cloneElement(React.Children.only(this.props.children), overrides)
          }

          // Call children to get element if function
          return R("div", { style, ref: targetRef }, innerElem)
        }
      )
    }
  }
  AutoSizeComponent.initClass()
  return AutoSizeComponent
})()
