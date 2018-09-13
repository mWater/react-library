React = require 'react'
ReactDOM = require 'react-dom'
H = React.DOM
R = React.createElement
Resizable = require './react-component-resizable'

# Component which sets its height to automatically fill all remaining vertical space
module.exports = class FillDownwardComponent extends React.Component
  constructor: ->
    @state = { height: null }

  componentDidMount: ->
    # Listen for changes
    $(window).on('resize', @updateSize)
    @updateSize()

  componentWillUnmount: ->
    # Stop listening to resize events
    $(window).off('resize', @updateSize)

  updateSize: =>
    self = @self
    if not self
      return

    # Get vertical position of self
    vpos = self.getBoundingClientRect().top + window.scrollY

    # Get vertical space remaining
    height = window.innerHeight - vpos

    # Limit to 50 at smallest
    @setState(height: Math.max(height, 50))

  render: ->
    # If height is not known, render placeholder
    if not @state.height
      return H.div style: { height: 100 }, ref: (c) => @self = c

    # Render with correct height
    return H.div style: { height: @state.height }, ref: ((c) => @self = c),
      @props.children

