PropTypes = require('prop-types')
#
# SplitPane component
# 
# Create a resizable split pane with a draggable divider
# 
# React.createElement(SplitPane, {split: "vertical", firstPaneSize: "20%", minFirstPaneSize: 200}, [
#   H.div null
#   H.div null
# ]) 
#
# Vertical splitpane gets the classes "splitpane vertical"
# Horizontal splitpane divider gets the classes "splitpane horizontal"

React = require 'react'
H = React.DOM
Pane = require './Pane'
Divider = require './Divider'
ReactDOM = require 'react-dom'

module.exports = class SplitPane extends React.Component
  
  @propTypes = {
    # The split type "vertical" or "horizontal"
    split: PropTypes.oneOf(['vertical', 'horizontal'])

    # Size of the first pane. Takes a string with percentage value ("20%") or a number in pixels (300)
    firstPaneSize: PropTypes.oneOfType([PropTypes.string,PropTypes.number])

    # Minimum size of the first pane. The first pane cannot be resized past this size. Takes a number in pixels
    minFirstPaneSize: PropTypes.number

    # Callback function that will be called when the resizing is done. 
    # The current size of the firstpane is passed as first argument
    onResize: PropTypes.func
  }

  constructor: ->
    super
    @state = { 
      resizing: false
      firstPaneSize: @props.firstPaneSize
    }

  @defaultProps: ->
    split: 'vertical'

  onMouseUp: => 
    if @state.resizing
      @setState(resizing: false)
      @props.onResize?(@state.firstPaneSize)

  onMouseDown: (event) =>
    dragStartAt = if @props.split == "vertical" then event.clientX else event.clientY
    @setState({ resizing: true, dragStartAt: dragStartAt })

  onMouseMove: (event) =>
    if @state.resizing
      if @props.split == "vertical"
        firstPaneSize = ReactDOM.findDOMNode(@refs.firstPane).offsetWidth
        currentPosition = event.clientX
      else
        firstPaneSize = ReactDOM.findDOMNode(@refs.firstPane).offsetHeight
        currentPosition = event.clientY

      newSize = firstPaneSize - (@state.dragStartAt - currentPosition)
      @setState(dragStartAt: currentPosition)

      if @props.minFirstPaneSize < newSize
        @setState(firstPaneSize: newSize)
        

  render: ->
    classNames = ["splitpane"]
    style = 
      display: "flex"
      flex: 1
      height: "100%"
      position: "absolute"

    if @props.split is "horizontal"  
      style.width = "100%" 
      style.top = 0
      style.bottom = 0
      style.flexDirection = "column"
      classNames.push('horizontal')

    if @props.split is "vertical"  
      style.right = 0 
      style.left = 0
      style.flexDirection = "row"
      classNames.push('vertical')

    H.div {style: style, className: classNames.join(" "), onMouseMove: @onMouseMove, onMouseUp: @onMouseUp},
      React.createElement(Pane,  {split: @props.split, width: @state.firstPaneSize , ref: "firstPane"}, @props.children[0]),
      React.createElement(Divider, {ref: "divider", split: @props.split, onMouseDown: @onMouseDown }),
      React.createElement(Pane,  {split: @props.split, ref:"rightPane"}, @props.children[1])