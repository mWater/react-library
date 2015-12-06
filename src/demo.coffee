React = require 'react'
ReactDOM = require 'react-dom'
H = React.DOM

# SampleComponent = require './SampleComponent'

ModalPopupComponent = require './ModalPopupComponent'


# Wait for DOM to load
$ ->
  ModalPopupComponent.show((onClose) =>
    return React.createElement(ModalPopupComponent, {
      footer: H.button(type: "button", className: "btn btn-default", onClick: onClose, "TEST")
      }, "TEST")
    )
  # elem = H.div null,
  #   React.createElement(SampleComponent)
  #   H.br()

  # ReactDOM.render(elem, document.getElementById("main"))
