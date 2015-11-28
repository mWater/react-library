React = require 'react'
H = React.DOM
SplitPane = require './SplitPane'

# This is a nice sample component
module.exports = class SampleComponent extends React.Component
  constructor: ->
    super
    @state = { 
    }

  handleClick: => 

  render: ->
    React.createElement(SplitPane, {split: "vertical", leftPaneSize: "20%", minLeftPaneSize: 100}, [
      H.div null
      React.createElement(SplitPane, {split: "horizontal", leftPaneSize: "20%", minLeftPaneSize: 100}, [
        H.div null
        React.createElement(SplitPane, {split: "vertical", leftPaneSize: "20%", minLeftPaneSize: 100}, [
          H.div null
          H.div null
        ])
      ])
    ])
