PropTypes = require('prop-types')
_ = require 'lodash'
React = require 'react'
H = React.DOM

ui = require './bootstrap'

# Number input component that handles parsing and maintains state when number is invalid
module.exports = class NumberInputComponent extends React.Component
  @propTypes:
    decimal: PropTypes.bool
    value: PropTypes.number
    onChange: PropTypes.func.isRequired

    style: PropTypes.object     # Will be merged with style of input box
    small: PropTypes.bool       # True to render with input-sm
    placeholder: PropTypes.string # Placeholder text

  @defaultProps:
    decimal: true

  render: ->
    return React.createElement(ui.NumberInput, {
      decimal: @props.decimal
      value: @props.value
      onChange: @props.onChange
      style: @props.style
      size: if @props.small then "sm" else null
    })
