#
# Divider
# 
# Internally used by SplitPane to create the draggable divider between 2 panes
#
# Vertical splitpane divider gets the classes "divider vertical"
# Horizontal splitpane divider gets the classes "divider horizontal"


React = require 'react'
H = React.DOM

module.exports = class Divider extends React.Component
  
  @propTypes: {
    split: React.PropTypes.oneOf(['vertical', 'horizontal'])
  }

  @defaultProps: ->
    split: 'vertical'

  onMouseDown: (event) => 
    @props.onMouseDown(event)

  render: ->
    classNames = ["divider"]

    if @props.split is "vertical"
      classNames.push("vertical")
    if @props.split is "horizontal"
      classNames.push("horizontal")
      
    H.div {className: classNames.join(" "), onMouseDown: @onMouseDown}