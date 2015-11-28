React = require 'react'
H = React.DOM

module.exports = class Divider extends React.Component
  constructor: ->
    super
    @state = { 
      
    }

  onMouseDown: (event) => 
    @props.onMouseDown(event)

  render: ->
    classNames = ["divider"]
    style = {}

    if @props.split is "vertical"
      classNames.push("vertical")
    if @props.split is "horizontal"
      classNames.push("horizontal")
      
    H.div {style: style, className: classNames.join(" "), onMouseDown: @onMouseDown}