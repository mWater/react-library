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
    size: React.PropTypes.string # e.g. "sm", "xs"

  @defaultProps:
    type: "default"

  render: ->
    H.button type: "button", className: classnames("btn", "btn-#{@props.type}", { active: @props.active }, { "btn-#{@props.size}": @props.size? }), onClick: @props.onClick, disabled: @props.disabled,
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

# Indented form group with a label, optional help text. Label and indented contents
exports.FormGroup = class FormGroup extends React.Component
  @propTypes:
    label: React.PropTypes.node  # Label to display
    labelMuted: React.PropTypes.bool  # True to mute label
    hint: React.PropTypes.node # Hint to append to label. Makes label faded if only hint presented
    help: React.PropTypes.node # Help block at bottom

  render: ->
    H.div className: "form-group",
      H.label key: "label", 
        if @props.labelMuted
          H.span className: "text-muted", @props.label
        else
          @props.label

        if @props.hint
          H.span className: "text-muted", style: { fontWeight: if @props.label then "normal" },
            if @props.label
              " - "
            @props.hint

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
        H.input 
          type: "radio"
          checked: @props.value == @props.radioValue
          onChange: ->  # Do nothing
          onClick: (ev) => @props.onChange(@props.radioValue)
        @props.children

# Select dropdown. Note: stringifies the value of the option so that null, strings, numbers, booleans etc.
# all work as possible options.
exports.Select = class Select extends React.Component
  @propTypes:
    value: React.PropTypes.any
    onChange: React.PropTypes.func
    options: React.PropTypes.arrayOf(React.PropTypes.shape({
      value: React.PropTypes.any # Can be any JS type that has a consistent stringification (boolean, null, string, number)
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


# Number input component that handles parsing and maintains state when number is invalid
exports.NumberInput = class NumberInput extends React.Component
  @propTypes:
    decimal: React.PropTypes.bool.isRequired
    value: React.PropTypes.number
    onChange: React.PropTypes.func.isRequired
    style: React.PropTypes.object     # Will be merged with style of input box
    size: React.PropTypes.string      # "sm", "lg"
    onTab: React.PropTypes.func
    onEnter: React.PropTypes.func

  constructor: (props) ->
    super
    # Parsing happens on blur
    @state = {
      inputText: if @props.value? then "" + @props.value else ""
    }

  componentWillReceiveProps: (nextProps) ->
    # If different, override text
    if nextProps.value != @props.value
      @setState(inputText: if nextProps.value? then "" + nextProps.value else "")

  focus: () ->
    @input?.focus()

  handleKeyDown: (ev) =>
    # When pressing ENTER or TAB
    if @props.onEnter and ev.keyCode == 13
      @props.onEnter(ev)
      ev.preventDefault()

    if @props.onTab and ev.keyCode == 9 and @props.onTab
      @props.onTab(ev)
      # It's important to prevent the default behavior when handling tabs (or else the tab is applied after the focus change)
      ev.preventDefault()

  handleBlur: =>
    # Parse and set value
    if @isValid()
      val = if @props.decimal then parseFloat(@state.inputText) else parseInt(@state.inputText)
      if isNaN(val)
        @props.onChange(null)
      else
        @props.onChange(val)
    else
      @props.onChange(@props.value)

  # Check regex matching of numbers
  isValid: ->
    if @state.inputText.length == 0
      return true

    if @props.decimal
      return @state.inputText.match(/^-?[0-9]*\.?[0-9]+$/) and not isNaN(parseFloat(@state.inputText))
    else
      return @state.inputText.match(/^-?\d+$/)

  render: ->
    # Display red border if not valid
    style = _.clone(@props.style or {})
    style.width = style.width or "8em"
    if not @isValid()
      style.borderColor = "#a94442"
      style.boxShadow = "inset 0 1px 1px rgba(0,0,0,.075)"
      style.backgroundColor = "rgba(132, 53, 52, 0.12)" # Faded red

    H.input
      ref: (c) => @input = c
      type: if @props.decimal then "number" else "tel"
      className: "form-control #{if @props.size then "input-#{@props.size}" else ""}"
      lang: "en"
      style: style
      value: @state.inputText
      onChange: (ev) => @setState(inputText: ev.target.value)
      onBlur: @handleBlur
      onKeyDown: @handleKeyDown

# Indented section than can be opened and closed. Defaults closed
exports.CollapsibleSection = class CollapsibleSection extends React.Component
  @propTypes:
    initiallyOpen: React.PropTypes.bool
    label: React.PropTypes.node  # Label to display
    labelMuted: React.PropTypes.bool  # True to mute label
    hint: React.PropTypes.node # Hint to append to label. Makes label faded if only hint presented

  constructor: (props) ->
    super(props)

    @state = {
      open: props.initiallyOpen or false
    }

  handleToggle: =>
    @setState(open: not @state.open)

  render: ->
    H.div className: "form-group",
      H.label key: "label", onClick: @handleToggle, style: { cursor: "pointer" },
        if @state.open
          H.i className: "fa fa-fw fa-caret-down #{if @props.labelMuted then "text-muted"}"
        else
          H.i className: "fa fa-fw fa-caret-right #{if @props.labelMuted then "text-muted"}"
            
        if @props.labelMuted
          H.span className: "text-muted", @props.label
        else
          @props.label

        if @props.hint
          H.span className: "text-muted", style: { fontWeight: if @props.label then "normal" },
            if @props.label
              " - "
            @props.hint

      if @state.open
        H.div key: "contents", style: { marginLeft: 5 }, 
          @props.children
    
