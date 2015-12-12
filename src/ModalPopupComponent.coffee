React = require 'react'
ReactDOM = require 'react-dom'
H = React.DOM
_ = require 'lodash'
Modal = require 'react-overlays/lib/Modal'
className = require "react-overlays/node_modules/classnames"

# Modal popup
module.exports = class ModalPopupComponent extends React.Component
  constructor: ->
    super
    @state = {
      show: false
    }

  @propTypes: 
    header: React.PropTypes.node # Header of modal. Any react element
    footer: React.PropTypes.node # Footer of modal. Any react element
    size: React.PropTypes.string # "large" for large
    trigger: React.PropTypes.node #the trigger

#  componentDidMount: ->
#    # Add special region to body
#    @modalNode = $('<div></div>').get(0)
#    $("body").append(@modalNode)
#
#    elem = React.createElement(ModalComponentContent, @props)
#    ReactDOM.unstable_renderSubtreeIntoContainer(this, elem, @modalNode)
#
#    _.defer () =>
#      $(@modalNode).children().modal({
#        show: true,
#        backdrop: "static",
#        keyboard: false
#        })

#  componentDidUpdate: (prevProps) ->
#    elem = React.createElement(ModalComponentContent, @props)
#    ReactDOM.render(elem, @modalNode)

#  componentWillUnmount: ->
#    $(@modalNode).children().modal("hide")
#    ReactDOM.unmountComponentAtNode(@modalNode)
#    $(@modalNode).remove()

  open: =>
    @setState(show: true)

  close: =>
    @setState(show: false)

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
      show: @state.show
      onHide: @close
      backdropStyle: backdropStyle
      style: modalStyle
      ariaLabelledby:'modal-label'

    modalContent =
      H.div className: dialogClass, style: {outline: 0},
        React.createElement(ModalComponentContent, @props)

    modal = React.createElement( Modal, modalProps, modalContent)

    triggerElement = @props.trigger

    trigger = React.cloneElement(triggerElement, { onClick: @open})

    H.span null,
      trigger
      modal

  # Static version that displays a modal until the onClose is called.
  # modalFunc takes onClose as a single parameter and returns a ModalPopupComponent
#  @show: (modalFunc) =>
#    # Create temporary div to render into
#    tempDiv = $('<div></div>').get(0)
#
#    # Create onClose
#    onClose = () =>
#      # Unrender
#      ReactDOM.unmountComponentAtNode(tempDiv)
#
#      # Remove div
#      $(tempDiv).remove()
#
#    popupElem = modalFunc(onClose)
#    ReactDOM.render(popupElem, tempDiv)
    
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
          @props.header
      H.div className: "modal-body",
        @props.children
      if @props.footer
        H.div className: "modal-footer",
          @props.footer

#    H.div ref: "modal", className: "modal",
#      H.div className: "modal-dialog#{dialogExtraClass}",

