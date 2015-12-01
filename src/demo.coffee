React = require 'react'
ReactDOM = require 'react-dom'
H = React.DOM

SampleComponent = require './SampleComponent'

# Wait for DOM to load
$ ->
  elem = H.div null,
    React.createElement(SampleComponent)
    H.br()

  ReactDOM.render(elem, document.getElementById("main"))
