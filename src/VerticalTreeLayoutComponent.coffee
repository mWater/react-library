_ = require 'lodash'
React = require 'react'
ReactDOM = require 'react-dom'
H = React.DOM
R = React.createElement

CrossComponent = require './CrossComponent'

# Makes a vertical tree component with lines between
module.exports = class VerticalTreeLayoutComponent extends React.Component
  @propTypes:
    headElem: React.PropTypes.node
    height: React.PropTypes.number # e.g. 50
    line: React.PropTypes.string.isRequired # e.g. "solid 1px gray"

  renderChildren: ->
    len = React.Children.count(@props.children)

    children = []

    # Alternate spacer and items, ending with spacer
    for i in [0...len * 2 + 1]
      isCenter = i == len

      # Add spacer at start
      if i == 0
        children.push(R(CrossComponent, key: i, collapseTop: true, height: @props.height))

      # Add spacer at end
      else if i == len * 2
        children.push(R(CrossComponent, key: i, collapseTop: true, height: @props.height))
      
      # Add spacer if odd
      else if i % 2 == 0
        children.push(R(CrossComponent, key: i, collapseTop: true, height: @props.height, e: @props.line, w: @props.line, n: (if isCenter then @props.line)))

      else
        child = React.Children.toArray(@props.children)[Math.floor(i/2)]

        children.push(H.div key: i, style: { display: "flex", flexFlow: "column nowrap", justifyContent: "flex-start" },
          React.createElement(CrossComponent, 
            collapseTop: true, 
            n: (if isCenter then @props.line)
            s: @props.line, 
            e: if i < (len * 2 - 1) then @props.line,
            w: if i > 1 then @props.line
            height: @props.height)
          child
        )

    return children
    
  render: ->
    H.div style: { display: "flex", flexFlow: "column nowrap", alignItems: "center" },
      # Center head
      @props.headElem
      if React.Children.count(@props.children) > 0
        R(CrossComponent, collapseTop: true, height: @props.height, s: @props.line)
        # Put children
      H.div key: "children", style: { display: "flex", flexFlow: "row nowrap", justifyContent: "flex-start", width: "100%" }, 
        @renderChildren()
