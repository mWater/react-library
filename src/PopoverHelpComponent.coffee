PropTypes = require('prop-types')
_ = require 'lodash'
React = require 'react'
R = React.createElement

Popover = require 'react-bootstrap/lib/Popover'
OverlayTrigger = require 'react-bootstrap/lib/OverlayTrigger'
 
# Shows a popover when help icon is clicked. Needs bootstrap
module.exports = class PopoverHelpComponent extends React.Component
  @propTypes:
    placement: PropTypes.string # "top", "right", "bottom", "left"
    trigger: PropTypes.string # "hover", "click"

  @defaultProps:
    placement: "top"
    trigger: "hover"

  render: ->
    R OverlayTrigger, trigger: (if @props.trigger == "hover" then ["hover", "focus"] else ["click"]), placement: @props.placement, overlay: R(Popover, null, @props.children),
      R 'span', className: "text-muted", style: { cursor: "pointer" },
        R 'span', className: "glyphicon glyphicon-question-sign"
