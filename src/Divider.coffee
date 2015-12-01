React = require 'react'
H = React.DOM

module.exports = class Divider extends React.Component
  
  @propTypes: {
    split: React.PropTypes.oneOf(['vertical', 'horizontal']).isRequired
  }

  onMouseDown: (event) => 
    @props.onMouseDown(event)

  render: ->
    classNames = ["divider"]

    if @props.split is "vertical"
      classNames.push("vertical")
    if @props.split is "horizontal"
      classNames.push("horizontal")
      
    H.div {className: classNames.join(" "), onMouseDown: @onMouseDown}