PropTypes = require('prop-types')
_ = require 'lodash'
React = require 'react'
H = React.DOM
R = React.createElement

Popover = require 'react-bootstrap/lib/Popover'
OverlayTrigger = require 'react-bootstrap/lib/OverlayTrigger'
 
# Shows a popover when help icon is clicked. Needs bootstrap
module.exports = class PopoverHelpComponent extends React.Component
  @propTypes:
    placement: PropTypes.string # "top", "right", "bottom", "left"

  @defaultProps:
    placement: "top"

  render: ->
    R OverlayTrigger, ref: "overlay", trigger: ["hover", "focus"], placement: @props.placement, overlay: R(Popover, null, @props.children),
      H.span className: "text-muted", style: { cursor: "pointer" },
        H.span className: "glyphicon glyphicon-question-sign"
