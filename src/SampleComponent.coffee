React = require 'react'
H = React.DOM
SplitPane = require './SplitPane'
AutoSizeComponent = require './AutoSizeComponent'
R = React.createElement

# This is a nice sample component
module.exports = class SampleComponent extends React.Component
  render: ->

    style1 =
      height: 300
      width: 300
      border: "1px solid #000"

    React.createElement(SplitPane, {split: "vertical", firstPaneSize: "20%", minFirstPaneSize: 100}, [
#      H.div null
      R AutoSizeComponent, {injectWidth: true, injectHeight: true},
        H.div null,
          "width only"
      React.createElement(SplitPane, {split: "horizontal", firstPaneSize: "20%", minFirstPaneSize: 100}, [
        R AutoSizeComponent, {injectWidth: true, injectHeight: true},
          H.div {height: 300},
            "height"
        React.createElement(SplitPane, {split: "vertical", firstPaneSize: 300, minFirstPaneSize: 200}, [
          R AutoSizeComponent, {injectWidth: true, injectHeight: true},
            H.div {height: 300},
              "width and height"
          H.div null
        ])
      ])
    ])