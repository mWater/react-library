PropTypes = require('prop-types')
_ = require 'lodash'
React = require 'react'
ReactDOM = require 'react-dom'
H = React.DOM
R = React.createElement

CrossComponent = require './CrossComponent'

# Makes a vertical tree component with lines between
module.exports = class VerticalTreeLayoutComponent extends React.Component
  @propTypes:
    headElem: PropTypes.node
    height: PropTypes.number # e.g. 50
    line: PropTypes.string.isRequired # e.g. "solid 1px gray"

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

        # It sets {flexShrink: 0} because without it the boxes where overlapping (on iPad at least)
        #   Note: that fix is based on that article: https://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs/
        #         (It contains many other interesting fixes for flexBox)
        children.push(H.div key: i, className: "flexBox", style: { flexFlow: "column nowrap", justifyContent: "flex-start", flexShrink: 0 },
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
    
  # Make sure to always use className flexBox and not style: {display: 'flex'} (or else it won't work on all browsers)
  render: ->
    H.div className: "flexBox", style: { flexFlow: "column nowrap", alignItems: "center" },
      # Center head
      @props.headElem
      if React.Children.count(@props.children) > 0
        R(CrossComponent, collapseTop: true, height: @props.height, s: @props.line)
        # Put children
      H.div key: "children", className: "flexBox", style: { flexFlow: "row nowrap", justifyContent: "flex-start", width: "100%" },
        @renderChildren()
