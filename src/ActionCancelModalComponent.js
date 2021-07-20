PropTypes = require('prop-types')
React = require 'react'
R = React.createElement
_ = require 'lodash'
ModalPopupComponent = require('./ModalPopupComponent')

# Modal with action and cancel buttons
module.exports = class ActionCancelModalComponent extends React.Component
  @propTypes: 
    title: PropTypes.node # Title of modal. Any react element
    actionLabel: PropTypes.node # Action button. Defaults to "Save"
    cancelLabel: PropTypes.node # Cancel button. Defaults to "Cancel" if action, "Close" otherwise
    onAction: PropTypes.func # Called when action button is clicked
    onCancel: PropTypes.func # Called when cancel is clicked
    onDelete: PropTypes.func # Big red destuctive action in footer. Not present if null
    deleteLabel: PropTypes.node # Label of delete button. Default "Delete"
    size: PropTypes.string # "large" for large, "full" for full width
    actionBusy: PropTypes.bool  # True for action button to show spinner and be disabled

  render: ->
    React.createElement(ModalPopupComponent,
      size: @props.size
      header: @props.title
      footer: [
        if @props.onAction 
          R 'button', 
            key: "action"
            type: "button"
            onClick: @props.onAction
            disabled: @props.actionBusy
            className: "btn btn-primary",
              if @props.actionBusy
                [
                  R 'i', className: "fa fa-spinner fa-spin"
                  "\u00A0"
                ]
              @props.actionLabel or "Save"
        R 'button', 
          key: "cancel"
          type: "button"
          onClick: @props.onCancel
          className: "btn btn-default", 
            @props.cancelLabel or (if @props.onAction then "Cancel" else "Close")
        if @props.onDelete 
          R 'button', 
            key: "delete"
            type: "button"
            style: { float: "left" }
            onClick: @props.onDelete
            className: "btn btn-danger",
              @props.deleteLabel or "Delete"
      ],
      @props.children)
