React = require 'react'
ReactDOM = require 'react-dom'
H = React.DOM

SampleComponent = require './SampleComponent'

# Wait for DOM to load
$ ->
  elem = React.createElement(SampleComponent)

  ReactDOM.render(elem, document.getElementById("main"))
