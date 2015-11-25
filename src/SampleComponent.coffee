React = require 'react'
H = React.DOM

# This is a nice sample component
module.exports = class SampleComponent extends React.Component
  constructor: ->
    super
    @state = { 
      count: 0
    }

  handleClick: => 
    @setState(count: @state.count + 1)

  render: ->
    H.div style: { padding: 10 },
      H.button type: "button", onClick: @handleClick, "Increment"
      "I'm at #{@state.count}"
