PropTypes = require('prop-types')
React = require 'react'
R = React.createElement

# Displays a spinner with loading in the center
module.exports = class LoadingComponent extends React.Component
  @propTypes:
    width: PropTypes.any # Defaults to 100%
    height: PropTypes.any # Defaults to 100%
    label: PropTypes.node # Defaults to Loading...

  @defaultProps:
    width: "100%"
    height: "100%"
    label: R 'div', className: "text-muted", style: { fontSize: 30 },
      R 'i', className: "fa fa-spin fa-spinner"
      " Loading..."

  render: ->
    R 'div', style: { 
      width: @props.width
      height: @props.height
      display: "flex"
      alignItems: "center"
      justifyContent: "center"
    },
      @props.label
