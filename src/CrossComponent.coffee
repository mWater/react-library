React = require 'react'
H = React.DOM

# Displays a box with a cross in it with any segments optionally drawn
module.exports = class CrossComponent extends React.Component
  @propTypes:
    n: React.PropTypes.string # north border style (e.g. "solid 1px blue")
    e: React.PropTypes.string # east border style (e.g. "solid 1px blue")
    s: React.PropTypes.string # south border style (e.g. "solid 1px blue")
    w: React.PropTypes.string # west border style (e.g. "solid 1px blue")
    width: React.PropTypes.any  # 100% or 20. Default: 100%
    height: React.PropTypes.any

  @defaultProps:
    width: "100%"
    height: "100%"

  render: ->
    # Make horizontal two boxes
    H.div style: { display: "flex", flexDirection: "column", width: @props.width, height: @props.height },
      H.div style: { display: "flex", flex: "1 1 0px" }, 
        H.div style: { flex: "1 1 0px", borderRight: @props.n, borderBottom: @props.w }
        H.div style: { flex: "1 1 0px", borderBottom: @props.e }
      H.div style: { display: "flex", flex: "1 1 0px" },
        H.div style: { flex: "1 1 0px", borderRight: @props.s }
        H.div style: { flex: "1 1 0px" }
