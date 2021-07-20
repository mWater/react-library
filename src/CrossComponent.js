PropTypes = require('prop-types')
React = require 'react'
R = React.createElement

# Displays a box with a cross in it with any segments optionally drawn
module.exports = class CrossComponent extends React.Component
  @propTypes:
    n: PropTypes.string # north border style (e.g. "solid 1px blue")
    e: PropTypes.string # east border style (e.g. "solid 1px blue")
    s: PropTypes.string # south border style (e.g. "solid 1px blue")
    w: PropTypes.string # west border style (e.g. "solid 1px blue")
    width: PropTypes.any  # 100% or 20, etc. Default: 100%
    height: PropTypes.any # 100% or 20, etc. Default: 100%
    collapseTop: PropTypes.bool   # True to collapse top half of box

  @defaultProps:
    width: "100%"
    height: "100%"

  # Make sure to always use className flexBox and not style: {display: 'flex'} (or else it won't work on all browsers)
  render: ->
    # Make horizontal two boxes
    R 'div', className: "flexBox", style: { display: "flex", flexDirection: "column", width: @props.width, height: @props.height },
      R 'div', className: "flexBox", style: { display: "flex", flex: (if @props.collapseTop then "0 1 0px" else "1 1 0px") },
        R 'div', className: "flexBox", style: { flex: "1 1 0px", borderRight: @props.n, borderBottom: @props.w }
        R 'div', className: "flexBox", style: { flex: "1 1 0px", borderBottom: @props.e }
      R 'div', className: "flexBox", style: { display: "flex", flex: "1 1 0px" },
        R 'div', className: "flexBox", style: { flex: "1 1 0px", borderRight: @props.s }
        R 'div', className: "flexBox", style: { flex: "1 1 0px" }
