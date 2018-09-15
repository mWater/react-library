PropTypes = require('prop-types')
React = require 'react'
ReactDOM = require 'react-dom'
R = React.createElement
_ = require 'lodash'

# Modal popup based on react
module.exports = class ModalPopupComponent extends React.Component
  @propTypes: 
    header: PropTypes.node # Header of modal. Any react element
    footer: PropTypes.node # Footer of modal. Any react element
    size: PropTypes.string # "large" for large, "full" for full-width
    showCloseX: PropTypes.bool # True to show close 'x' at top right
    onClose: PropTypes.func # callback function to be called when close is requested

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
    header: PropTypes.node # Header of modal. Any react element
    footer: PropTypes.node # Footer of modal. Any react element
    size: PropTypes.string # "large" for large, "full" for full-width
    showCloseX: PropTypes.bool # True to show close 'x' at top right
    onClose: PropTypes.func # callback function to be called when close is requested

  render: ->
    dialogClass = "modal-dialog"
    if @props.size == "large"
      dialogClass += " modal-lg"
    if @props.size == "small"
      dialogClass += " modal-sm"
    if @props.size == "full"
      dialogStyle = { width: "95%" }

    rootStyle = {
      position: "fixed"
      left: 0
      right: 0
      top: 0
      bottom: 0
      zIndex: 1040 # Same as bootstrap modals
    }

    overlayStyle = {
      position: "absolute"
      left: 0
      right: 0
      top: 0
      bottom: 0
      backgroundColor: "rgba(0, 0, 0, 0.7)"
    }

    R 'div', style: rootStyle,
      R 'style', null, '''body { overflow-y: hidden }'''
      R 'div', style: overlayStyle, onClick: @props.onClose
      R 'div', className: dialogClass, style: dialogStyle,
        R 'div', className: "modal-content",
          if @props.header
            R 'div', className: "modal-header", 
              if @props.showCloseX
                R 'button', className: "close", onClick: @props.onClose, 
                  R 'span', null, "\u00d7"
              R 'h4', className: "modal-title",
                @props.header

          R 'div', className: "modal-body", style: { maxHeight: window.innerHeight - 56 - 65 - 30 - 30, overflowY: "auto" }, 
            @props.children
          if @props.footer
            R 'div', className: "modal-footer", 
              @props.footer

          if not @props.header and @props.showCloseX
            R 'button', className: "close", style: { position: "absolute", right: 10, top: 10 },  # Put above body
              R 'span', onClick: @props.onClose, "\u00d7"
