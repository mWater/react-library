React = require 'react'
H = React.DOM

# Displays a spinner with loading in the center
module.exports = class LoadingComponent extends React.Component
  @propTypes:
    width: React.PropTypes.any # Defaults to 100%
    height: React.PropTypes.any # Defaults to 100%
    label: React.PropTypes.node # Defaults to Loading...

  @defaultProps:
    width: "100%"
    height: "100%"
    label: H.div className: "text-muted", style: { fontSize: 30 },
      H.i className: "fa fa-spin fa-spinner"
      " Loading..."

  render: ->
    H.div style: { 
      width: @props.width
      height: @props.height
      display: "flex"
      alignItems: "center"
      justifyContent: "center"
    },
      @props.label
