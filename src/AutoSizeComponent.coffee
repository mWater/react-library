React = require 'react'
ReactDOM = require 'react-dom'
H = React.DOM

# Automatically injects the width or height of the DOM element into the
# child component, updating as window resizes. 
# If children is a function, calls with with { width:,  height: } depending on injectHeight or injectWidth
module.exports = class AutoSizeComponent extends React.Component
  @propTypes:
    injectWidth: React.PropTypes.bool # True to inject width
    injectHeight: React.PropTypes.bool # True to inject height

  constructor: ->
    @state = { width: null, height: null }

  componentDidMount: ->
    # Listen for changes
    $(window).on('resize', @updateSize)
    @updateSize()

  componentWillUnmount: ->
    # Stop listening to resize events
    $(window).off('resize', @updateSize)

  updateSize: =>
    # Get width of self
    node = ReactDOM.findDOMNode(this)
    @setState(width: node.clientWidth, height: node.clientHeight)

  render: ->
    innerElem = null
    if @state.width? and @state.height?
      overrides = {}
      if @props.injectWidth
        overrides.width = @state.width
      if @props.injectHeight
        overrides.height = @state.height

      # Call children to get element if function
      if typeof(@props.children) == "function"
        innerElem = @props.children(overrides)
      else
        innerElem = React.cloneElement(React.Children.only(@props.children), overrides)

    style = {}
    if @props.injectWidth
      style.width = "100%"
    if @props.injectHeight
      style.height = "100%"

    return H.div(style: style, innerElem)
