PropTypes = require('prop-types')
# Pane
# 
# Internally used by SplitPane to create the resizable panes
#
# Vertical splitpane panes gets the classes "pane vertical"
# Horizontal splitpane panes gets the classes "pane horizontal"
# 
# The first pane gets an added class "first"

React = require 'react'
H = React.DOM

module.exports = class Pane extends React.Component
  
  @propTypes: {
    split: PropTypes.oneOf(['vertical', 'horizontal'])
    width: PropTypes.oneOfType([PropTypes.string,PropTypes.number])
  }

  @defaultProps: ->
    split: 'vertical'

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

    if @props.width
      classNames.push("first")
    else
      style.flex = 1 
      if @props.split == 'vertical'
        style.width = "100%"
      else
        style.height = "100%"
    
    H.div {style: style, className: classNames.join(" ")}, @props.children