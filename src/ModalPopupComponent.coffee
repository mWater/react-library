React = require 'react'
ReactDOM = require 'react-dom'
H = React.DOM
_ = require 'lodash'
Modal = require 'react-overlays/lib/Modal'
className = require "classnames"

# Modal popup
module.exports = class ModalPopupComponent extends React.Component
  @propTypes:
    header: React.PropTypes.node # Header of modal. Any react element
    footer: React.PropTypes.node # Footer of modal. Any react element
    size: React.PropTypes.string # "large" for large,  "small" for small and none for standard
    onClose: React.PropTypes.func # callback function to be called when close is requested

  close: =>
    @props.onClose?()

  render: ->

    modalStyle =
      position: 'fixed'
      zIndex: 1040
      top: 0
      bottom: 0
      left: 0
      right: 0
      outline: 0

    backdropStyle =
      position: 'fixed'
      zIndex: 1040
      top: 0
      bottom: 0
      left: 0
      right: 0
      zIndex: 'auto',
      backgroundColor: '#000',
      opacity: 0.5

    dialogClass =
      className
        "modal-dialog": true
        "modal-lg": @props.size == "large"
        "modal-sm": @props.size == "small"

    modalProps =
      show: true
      onHide: @close
      backdrop: true
      backdropStyle: backdropStyle
      style: modalStyle
      ariaLabelledby:'modal-label'

    modalContent =
      H.div className: dialogClass, style: {outline: 0},
        React.createElement(ModalComponentContent, @props)

    H.div null,
      React.createElement( Modal, modalProps, modalContent)
    
# Content must be rendered at body level to prevent weird behaviour, so this is the inner component
class ModalComponentContent extends React.Component
  @propTypes: 
    header: React.PropTypes.node # Header of modal. Any react element
    footer: React.PropTypes.node # Footer of modal. Any react element
    size: React.PropTypes.string # "large" for large

  render: ->

    H.div className: "modal-content",
      if @props.header
        H.div className: "modal-header",
          H.button className: "close",
            H.span onClick: @props.onClose, "X"
          H.h4 className: "modal-title",
            @props.header
      H.div className: "modal-body",
        @props.children
      if @props.footer
        H.div className: "modal-footer",
          @props.footer

