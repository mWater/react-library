PropTypes = require('prop-types')
React = require 'react'
ReactDOM = require 'react-dom'
R = React.createElement
ReactResizeDetector = require('react-resize-detector').default

# Automatically injects the width or height of the DOM element into the
# child component, updating as window resizes. 
# If children is a function, calls with with { width:,  height: } depending on injectHeight or injectWidth
module.exports = class AutoSizeComponent extends React.Component
  @propTypes:
    injectWidth: PropTypes.bool # True to inject width
    injectHeight: PropTypes.bool # True to inject height

  render: ->
    return R ReactResizeDetector, handleWidth: @props.injectWidth, handleHeight: @props.injectHeight,
      ({ width, height, targetRef }) => 
        # Set style of outer div
        style = {}
        if @props.injectWidth
          style.width = "100%"
        if @props.injectHeight
          style.height = "100%"

        # Return placeholder until width/height known
        if not width? or not height?
          return R 'div', style: style, ref: targetRef

        overrides = {}
        if @props.injectWidth
          overrides.width = width
        if @props.injectHeight
          overrides.height = height

        if typeof(@props.children) == "function"
          innerElem = @props.children(overrides)
        else
          innerElem = React.cloneElement(React.Children.only(@props.children), overrides)

        # Call children to get element if function
        return R 'div', style: style, ref: targetRef,
          innerElem
