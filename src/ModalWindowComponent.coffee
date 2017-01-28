React = require 'react'
ReactDOM = require 'react-dom'
H = React.DOM
_ = require 'lodash'

# Modal window that fills screen
module.exports = class ModalWindowComponent extends React.Component
  @propTypes: 
    isOpen: React.PropTypes.bool.isRequired
    onRequestClose: React.PropTypes.func
    backgroundColor: React.PropTypes.string
    outerPadding: React.PropTypes.number  # Outer padding default 40
    innerPadding: React.PropTypes.number  # Inner padding default 20

  componentDidMount: ->
    # Add special region to body
    @modalNode = $('<div></div>').get(0)
    $("body").append(@modalNode)

    @update(@props)

  componentWillReceiveProps: (nextProps) ->
    @update(nextProps)

  update: (props) ->
    elem = React.createElement(InnerModalComponent, props)
    ReactDOM.unstable_renderSubtreeIntoContainer(this, elem, @modalNode)
    
  componentWillUnmount: ->
    ReactDOM.unmountComponentAtNode(@modalNode)
    $(@modalNode).remove()

  render: -> null
    
  # Static version that displays a modal until the onClose is called.
  # modalFunc takes close function as a single parameter and returns a ModalWindowComponent
  @show: (modalFunc, onClose) =>
    # Create temporary div to render into
    tempDiv = $('<div></div>').get(0)

    # Create close function
    close = () =>
      # Unrender
      ReactDOM.unmountComponentAtNode(tempDiv)

      # Remove div
      $(tempDiv).remove()

      # Call onClose
      if onClose
        onClose()

    popupElem = modalFunc(close)
    ReactDOM.render(popupElem, tempDiv)    

# Content must be rendered at body level to prevent weird behaviour, so this is the inner component
class InnerModalComponent extends React.Component
  @propTypes: 
    isOpen: React.PropTypes.bool.isRequired
    onRequestClose: React.PropTypes.func
    outerPadding: React.PropTypes.number  # Outer padding default 40
    innerPadding: React.PropTypes.number  # Inner padding default 20
    backgroundColor: React.PropTypes.string

  @defaultProps:
    outerPadding: 40
    innerPadding: 20
    backgroundColor: "white"

  render: ->
    if not @props.isOpen
      return null

    overlayStyle = {
      position: "fixed"
      left: 0
      right: 0
      top: 0
      bottom: 0
      zIndex: 1040 # Same as bootstrap modals
      backgroundColor: "rgba(0, 0, 0, 0.7)"
    }

    windowStyle = {
      position: "fixed"
      left: @props.outerPadding
      right: @props.outerPadding
      top: @props.outerPadding
      bottom: @props.outerPadding
      zIndex: 1040 # Same as bootstrap modals
      backgroundColor: @props.backgroundColor
      borderRadius: 10
      border: "solid 1px #AAA"
    }

    contentStyle = {
      position: "absolute"
      left: @props.innerPadding
      right: @props.innerPadding
      top: @props.innerPadding
      bottom: @props.innerPadding
      overflowY: "auto"  # Allow scrolling
    }

    closeStyle = {
      position: "absolute"
      right: 8
      top: 8
      color: "#888"
    }

    H.div className: "modal-window-component",
      H.style null, '''body { overflow-y: hidden }'''
      H.div style: overlayStyle, onClick: @props.onRequestClose, className: "modal-window-component-overlay"
      H.div style: windowStyle, className: "modal-window-component-window",
        if @props.onRequestClose
          H.div style: closeStyle,
            H.span className: "glyphicon glyphicon-remove", onClick: @props.onRequestClose
        H.div style: contentStyle,
          @props.children