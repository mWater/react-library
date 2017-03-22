classnames = require 'classnames'
React = require 'react'
H = React.DOM
R = React.createElement

# Bootstrap components

# Simple spinner
exports.Spinner = () -> H.i className: "fa fa-spinner fa-spin"

# Standard button
exports.Button = class Button extends React.Component
  @propTypes:
    type: React.PropTypes.string # e.g. "primary"
    onClick: React.PropTypes.func
    disabled: React.PropTypes.bool
    active: React.PropTypes.bool

  @defaultProps:
    type: "default"

  render: ->
    H.button type: "button", className: classnames("btn", "btn-#{@props.type}", { active: @props.active }), onClick: @props.onClick, disabled: @props.disabled,
      @props.children

# Icon, either font-awesome or glyphicon
exports.Icon = class Icon extends React.Component
  @propTypes:
    id: React.PropTypes.string.isRequired # e.g. "fa-check", 'glyphicon-ok', 'fa-check fa-fw'

  render: ->
    if @props.id.match(/^fa-/)
      return H.i className: "fa #{@props.id}"
    else if @props.id.match(/^glyphicon-/)
      return H.i className: "glyphicon #{@props.id}"
    else
      return null

# Indented form group with a label, optional help text. Faded label and indented contents
exports.FormGroup = class FormGroup extends React.Component
  @propTypes:
    label: React.PropTypes.node
    help: React.PropTypes.node

  render: ->
    H.div className: "form-group",
      H.label key: "label", className: "text-muted", 
        @props.label
      H.div key: "contents", style: { marginLeft: 5 }, 
        @props.children
      if @props.help
        H.p key: "help", className: "help-block", style: { marginLeft: 5 },
          @props.help

exports.Checkbox = class Checkbox extends React.Component
  @propTypes:
    value: React.PropTypes.bool
    onChange: React.PropTypes.func
    inline: React.PropTypes.bool    # Makes horizontal

  render: ->
    if @props.inline
      return H.label className: "checkbox-inline",
        H.input type: "checkbox", checked: @props.value or false, onChange: (ev) => @props.onChange(ev.target.checked)
        @props.children
    else
      return H.div className: "checkbox",
        H.label null,
          H.input type: "checkbox", checked: @props.value or false, onChange: (ev) => @props.onChange(ev.target.checked)
          @props.children

exports.Radio = class Radio extends React.Component
  @propTypes:
    value: React.PropTypes.any       # Value to display
    radioValue: React.PropTypes.any  # Value that radio button represents. If equal to value, button is checked
    onChange: React.PropTypes.func   # Called with radio value
    inline: React.PropTypes.bool    # Makes horizontal

  render: ->
    return H.div className: (if @props.inline then "radio-inline" else "radio"),
      H.label null,
        H.input type: "radio", checked: @props.value == @props.radioValue, onClick: (ev) => @props.onChange(@props.radioValue)
        @props.children

# Select dropdown
exports.Select = class Select extends React.Component
  @propTypes:
    value: React.PropTypes.any
    onChange: React.PropTypes.func
    options: React.PropTypes.arrayOf(React.PropTypes.shape({
      value: React.PropTypes.any
      label: React.PropTypes.string
      }))
    size: React.PropTypes.string # "sm" or "lg"
    nullLabel: React.PropTypes.string  # True to make extra option of null with the label. Can be ""

  handleChange: (ev) =>
    value = JSON.parse(ev.target.value)
    @props.onChange(value)

  render: ->
    options = @props.options.slice()
    if @props.nullLabel?
      options.unshift({ value: null, label: @props.nullLabel })

    return H.select
      className: classnames("form-control", { "input-sm": @props.size == "sm" }, { "input-lg": @props.size == "lg" })
      value: JSON.stringify(if @props.value? then @props.value else null)
      onChange: @handleChange,
        _.map(options, (option) => H.option key: JSON.stringify(option.value), value: JSON.stringify(option.value), option.label)

exports.TextInput = class TextInput extends React.Component
  @propTypes:
    value: React.PropTypes.string
    onChange: React.PropTypes.func
    placeholder: React.PropTypes.string
    size: React.PropTypes.string # "sm" or "lg"
    emptyNull: React.PropTypes.bool  # True to make empty null

  handleChange: (ev) =>
    value = ev.target.value
    if @props.emptyNull
      value = value or null

    @props.onChange(value)

  render: ->
    return H.input 
      type: "text"
      className: classnames("form-control", { "input-sm": @props.size == "sm" }, { "input-lg": @props.size == "lg" })
      value: @props.value or ""
      onChange: @handleChange 
      placeholder: @props.placeholder



