React = require 'react'
H = React.DOM
SplitPane = require './SplitPane'

# This is a nice sample component
module.exports = class SampleComponent extends React.Component
  render: ->
    React.createElement(SplitPane, {split: "vertical", firstPaneSize: "20%", minFirstPaneSize: 100}, [
      H.div null
      React.createElement(SplitPane, {split: "horizontal", firstPaneSize: "20%", minFirstPaneSize: 100}, [
        H.div null
        React.createElement(SplitPane, {split: "vertical", firstPaneSize: "20%", minFirstPaneSize: 100}, [
          H.div null
          H.div null
        ])
      ])
    ])
