PropTypes = require('prop-types')
React = require 'react'
ReactDOM = require 'react-dom'
R = React.createElement
_ = require 'lodash'

# Modal window that fills screen
module.exports = class ModalWindowComponent extends React.Component
  @propTypes: 
    isOpen: PropTypes.bool.isRequired
    onRequestClose: PropTypes.func
    backgroundColor: PropTypes.string
    outerPadding: PropTypes.number  # Outer padding default 40
    innerPadding: PropTypes.number  # Inner padding default 20

  constructor: (props) ->
    super(props)

    # Add special region to body
    @modalNode = document.createElement("div")
    document.body.append(@modalNode)

  componentWillUnmount: ->
    @modalNode.remove()

  render: -> 
    ReactDOM.createPortal(R(InnerModalComponent, @props), @modalNode)
    
  # Static version that displays a modal until the onClose is called.
  # modalFunc takes close function as a single parameter and returns a ModalWindowComponent
  @show: (modalFunc, onClose) =>
    # Create temporary div to render into
    tempDiv = document.createElement("div")

    # Create close function
    close = () =>
      # Unrender
      ReactDOM.unmountComponentAtNode(tempDiv)

      # Remove div
      tempDiv.remove()

      # Call onClose
      if onClose
        onClose()

    popupElem = modalFunc(close)
    ReactDOM.render(popupElem, tempDiv)    

# Content must be rendered at body level to prevent weird behaviour, so this is the inner component
class InnerModalComponent extends React.Component
  @propTypes: 
    isOpen: PropTypes.bool.isRequired
    onRequestClose: PropTypes.func
    outerPadding: PropTypes.number  # Outer padding default 40
    innerPadding: PropTypes.number  # Inner padding default 20
    backgroundColor: PropTypes.string

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

    R 'div', className: "modal-window-component",
      R 'style', null, '''body { overflow-y: hidden }'''
      R 'div', style: overlayStyle, onClick: @props.onRequestClose, className: "modal-window-component-overlay"
      R 'div', style: windowStyle, className: "modal-window-component-window",
        if @props.onRequestClose
          R 'div', style: closeStyle,
            R 'span', className: "glyphicon glyphicon-remove", onClick: @props.onRequestClose
        R 'div', style: contentStyle,
          @props.children