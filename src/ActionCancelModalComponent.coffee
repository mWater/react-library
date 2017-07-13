PropTypes = require('prop-types')
React = require 'react'
H = React.DOM
_ = require 'lodash'
ModalPopupComponent = require('./ModalPopupComponent')

# Modal with action and cancel buttons
module.exports = class ActionCancelModalComponent extends React.Component
  @propTypes: 
    title: PropTypes.node # Title of modal. Any react element
    actionLabel: PropTypes.node # Action button. Defaults to "Save"
    onAction: PropTypes.func # Called when action button is clicked
    onCancel: PropTypes.func # Called when cancel is clicked
    onDelete: PropTypes.func # Big red destuctive action in footer. Not present if null
    deleteLabel: PropTypes.node # Label of delete button. Default "Delete"
    size: PropTypes.string # "large" for large, "full" for full width

  render: ->
    React.createElement(ModalPopupComponent,
      size: @props.size
      header: @props.title
      footer: [
        H.button 
          key: "cancel"
          type: "button"
          onClick: @props.onCancel
          className: "btn btn-default", 
            if @props.onAction then "Cancel" else "Close"
        if @props.onAction 
          H.button 
            key: "action"
            type: "button"
            onClick: @props.onAction
            className: "btn btn-primary",
              @props.actionLabel or "Save"
        if @props.onDelete 
          H.button 
            key: "delete"
            type: "button"
            style: { float: "left" }
            onClick: @props.onDelete
            className: "btn btn-danger",
              @props.deleteLabel or "Delete"
      ],
      @props.children)
