React = require 'react'
ReactDOM = require 'react-dom'
H = React.DOM
_ = require 'lodash'

# Modal popup based on react
module.exports = class ModalPopupComponent extends React.Component
  @propTypes: 
    header: React.PropTypes.node # Header of modal. Any react element
    footer: React.PropTypes.node # Footer of modal. Any react element
    size: React.PropTypes.string # "large" for large, "full" for full-width
    showCloseX: React.PropTypes.bool # True to show close 'x' at top right
    onClose: React.PropTypes.func # callback function to be called when close is requested

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
    header: React.PropTypes.node # Header of modal. Any react element
    footer: React.PropTypes.node # Footer of modal. Any react element
    size: React.PropTypes.string # "large" for large, "full" for full-width
    showCloseX: React.PropTypes.bool # True to show close 'x' at top right
    onClose: React.PropTypes.func # callback function to be called when close is requested

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

    H.div style: rootStyle,
      H.style null, '''body { overflow-y: hidden }'''
      H.div style: overlayStyle, onClick: @props.onClose
      H.div className: dialogClass, style: dialogStyle,
        H.div className: "modal-content",
          if @props.header
            H.div className: "modal-header", 
              if @props.showCloseX
                H.button className: "close",
                  H.span onClick: @props.onClose, "\u00d7"
              H.h4 className: "modal-title",
                @props.header

          H.div className: "modal-body", style: { maxHeight: window.innerHeight - 56 - 65 - 30 - 30, overflowY: "auto" }, 
            @props.children
          if @props.footer
            H.div className: "modal-footer", 
              @props.footer

          if not @props.header and @props.showCloseX
            H.button className: "close", style: { position: "absolute", right: 10, top: 10 },  # Put above body
              H.span onClick: @props.onClose, "\u00d7"
