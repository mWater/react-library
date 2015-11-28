React = require 'react'
H = React.DOM

module.exports = class Pane extends React.Component
  constructor: ->
    super
    @state = { 
      
    }

  handleClick: => 
    @setState(count: @state.count + 1)

  render: ->
    classNames = ["pane"]
    style =
      flex: "0 0 auto"
      position: "relative"

    if @props.split == 'vertical'
      classNames.push('vertical')
      style.width = @props.width if @props.width?
    else
      classNames.push('horizontal')
      style.height = @props.width if @props.width?

    style.flex = 1 if !@props.width?
    
    H.div {style: style, className: classNames.join(" ")}, @props.children