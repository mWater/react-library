React = require 'react'
ReactDOM = require 'react-dom'
H = React.DOM
R = React.createElement

SampleComponent = require './SampleComponent'
ModalPopupComponent = require './ModalPopupComponent'
VerticalTreeLayoutComponent = require './VerticalTreeLayoutComponent'

class Block extends React.Component
  render: ->
    H.div style: { height: 200, width: 200, border: "solid 2px blue" }, " "

class Block2 extends React.Component
  render: ->
    H.div style: { height: 300, width: 200, border: "solid 2px blue" }, " "

# Wait for DOM to load
$ ->
  # elem = R VerticalTreeLayoutComponent,
  #   line: "solid 1px red"
  #   height: 50
  #   headElem: R(Block)
  #   R(Block)
  #   R(Block2)
  #   R(Block)
  #   R(Block)
  
  # ModalPopupComponent.show((onClose) =>
  #   return React.createElement(ModalPopupComponent, {
  #     footer: H.button(type: "button", className: "btn btn-default", onClick: onClose, "TEST")
  #     }, "TEST")
  #   )
  # elem = H.div null,
  #   React.createElement(SampleComponent)
  #   H.br()

  elem = R ModalPopupComponent, { header: "OUTER", size: "large" }, 
    H.div null, "OUTER MODAL"
    H.div null, "OUTER MODAL"
    H.div null, "OUTER MODAL"
    H.div null, "OUTER MODAL"
    H.div null, "OUTER MODAL"
    R ModalPopupComponent, { header: "INNER" }, 
      H.div null, "INNER MODAL"
      H.div null, "INNER MODAL"


  ReactDOM.render(elem, document.getElementById("main"))
