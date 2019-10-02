PropTypes = require('prop-types')
classnames = require 'classnames'
React = require 'react'
R = React.createElement
_ = require 'lodash'

# Bootstrap components

# Simple spinner
exports.Spinner = () -> R 'i', className: "fa fa-spinner fa-spin"

# Standard button
exports.Button = class Button extends React.Component
  @propTypes:
    type: PropTypes.string.isRequired # e.g. "primary"
    onClick: PropTypes.func
    disabled: PropTypes.bool
    active: PropTypes.bool
    size: PropTypes.string # e.g. "sm", "xs"

  @defaultProps:
    type: "default"

  render: ->
    R 'button', type: "button", className: classnames("btn", "btn-#{@props.type}", { active: @props.active }, { "btn-#{@props.size}": @props.size? }), onClick: @props.onClick, disabled: @props.disabled,
      @props.children

# Icon, either font-awesome or glyphicon
exports.Icon = class Icon extends React.Component
  @propTypes:
    id: PropTypes.string.isRequired # e.g. "fa-check", 'glyphicon-ok', 'fa-check fa-fw'

  render: ->
    if @props.id.match(/^fa-/)
      return R 'i', className: "fa #{@props.id}"
    else if @props.id.match(/^glyphicon-/)
      return R 'i', className: "glyphicon #{@props.id}"
    else
      return null

# Indented form group with a label, optional help text. Label and indented contents
exports.FormGroup = class FormGroup extends React.Component
  @propTypes:
    label: PropTypes.node  # Label to display
    labelMuted: PropTypes.bool  # True to mute label
    hint: PropTypes.node # Hint to append to label. Makes label faded if only hint presented
    help: PropTypes.node # Help block at bottom
    hasSuccess: PropTypes.bool # True to display as success
    hasWarning: PropTypes.bool # True to display as warning
    hasError: PropTypes.bool # True to display as error

  render: ->
    classes = {
      "form-group": true
      "has-error": @props.hasErrors
      "has-warning": @props.hasWarnings
      "has-success": @props.hasSuccess
    }
    
    R 'div', className: classnames(classes),
      R 'label', key: "label", 
        if @props.labelMuted
          R 'span', className: "text-muted", @props.label
        else
          @props.label

        if @props.hint
          R 'span', className: "text-muted", style: { fontWeight: if @props.label then "normal" },
            if @props.label
              " - "
            @props.hint

      R 'div', key: "contents", style: { marginLeft: 5 }, 
        @props.children
      if @props.help
        R 'p', key: "help", className: "help-block", style: { marginLeft: 5 },
          @props.help

exports.Checkbox = class Checkbox extends React.Component
  @propTypes:
    value: PropTypes.bool
    onChange: PropTypes.func
    inline: PropTypes.bool    # Makes horizontal
    nullForFalse: PropTypes.bool # Uses null for false

  handleChange: (ev) =>
    if @props.nullForFalse
      @props.onChange(ev.target.checked or null)
    else
      @props.onChange(ev.target.checked)

  render: ->
    if @props.inline
      return R 'label', className: "checkbox-inline",
        R 'input', type: "checkbox", checked: @props.value or false, onChange: if @props.onChange then @handleChange
        @props.children
    else
      return R 'div', className: "checkbox",
        R 'label', null,
          R 'input', type: "checkbox", checked: @props.value or false, onChange: if @props.onChange then @handleChange
          @props.children

exports.Radio = class Radio extends React.Component
  @propTypes:
    value: PropTypes.any       # Value to display
    radioValue: PropTypes.any  # Value that radio button represents. If equal to value, button is checked
    onChange: PropTypes.func   # Called with radio value
    inline: PropTypes.bool    # Makes horizontal

  render: ->
    if @props.inline
      return R 'label', className: "radio-inline",
        R 'input', 
          type: "radio"
          checked: @props.value == @props.radioValue
          onChange: ->  # Do nothing
          onClick: if @props.onChange then (ev) => @props.onChange(@props.radioValue)
        @props.children      
    else
      return R 'div', className: "radio",
        R 'label', null,
          R 'input', 
            type: "radio"
            checked: @props.value == @props.radioValue
            onChange: ->  # Do nothing
            onClick: if @props.onChange then (ev) => @props.onChange(@props.radioValue)
          @props.children

# Select dropdown. Note: stringifies the value of the option so that null, strings, numbers, booleans etc.
# all work as possible options.
exports.Select = class Select extends React.Component
  @propTypes:
    value: PropTypes.any
    onChange: PropTypes.func
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any # Can be any JS type that has a consistent stringification (boolean, null, string, number)
      label: PropTypes.string
      }))
    size: PropTypes.string # "sm" or "lg"
    nullLabel: PropTypes.string  # True to make extra option of null with the label. Can be ""
    style: PropTypes.object     # Will be merged with style of select box
    inline: PropTypes.bool  # True to make auto-width, inline

  handleChange: (ev) =>
    value = JSON.parse(ev.target.value)
    @props.onChange(value)

  render: ->
    options = @props.options.slice()
    if @props.nullLabel?
      options.unshift({ value: null, label: @props.nullLabel })

    style = {}
    if @props.inline
      style = { width: "auto", display: "inline-block" }
    _.extend(style, @props.style or {})

    return R 'select',
      style: style
      disabled: not @props.onChange?
      className: classnames("form-control", { "input-sm": @props.size == "sm" }, { "input-lg": @props.size == "lg" })
      value: JSON.stringify(if @props.value? then @props.value else null)
      onChange: (if @props.onChange then @handleChange else (->)),
        _.map(options, (option) => R 'option', key: JSON.stringify(option.value), value: JSON.stringify(option.value), option.label)

exports.TextInput = class TextInput extends React.Component
  @propTypes:
    value: PropTypes.string
    onChange: PropTypes.func
    placeholder: PropTypes.string
    size: PropTypes.string # "sm" or "lg"
    emptyNull: PropTypes.bool  # True to make empty null
    style: PropTypes.object     # Will be merged with style of input box

  handleChange: (ev) =>
    value = ev.target.value
    if @props.emptyNull
      value = value or null

    @props.onChange(value)

  render: ->
    return R 'input', 
      type: "text"
      className: classnames("form-control", { "input-sm": @props.size == "sm" }, { "input-lg": @props.size == "lg" })
      value: @props.value or ""
      style: @props.style
      onChange: if @props.onChange then @handleChange 
      placeholder: @props.placeholder
      disabled: not @props.onChange?


# Number input component that handles parsing and maintains state when number is invalid
exports.NumberInput = class NumberInput extends React.Component
  @propTypes:
    decimal: PropTypes.bool.isRequired
    value: PropTypes.number
    onChange: PropTypes.func
    style: PropTypes.object     # Will be merged with style of input box
    size: PropTypes.string      # "sm", "lg"
    onTab: PropTypes.func
    onEnter: PropTypes.func
    decimalPlaces: PropTypes.number # Force an exact number of decimal places, rounding value as necessary
    placeholder: PropTypes.string  
    min: PropTypes.number # The minimum number allowed
    max: PropTypes.number # The maximum number allowed

  constructor: (props) ->
    super(props)

    # Parsing happens on blur
    @state = {
      inputText: @formatInput(props)
    }

  componentWillReceiveProps: (nextProps) ->
    # If different, override text
    if nextProps.value != @props.value
      @setState(inputText: @formatInput(nextProps))

  # Format the input based on props
  formatInput: (props) ->
    # Blank
    if not props.value?
      return ""

    # Integer
    if not props.decimal
      return "" + Math.floor(props.value)

    # Decimal
    if props.decimalPlaces?
      return props.value.toFixed(props.decimalPlaces)

    return "" + props.value

  focus: () ->
    @input?.focus()

  handleKeyDown: (ev) =>
    # When pressing ENTER or TAB
    if ev.keyCode == 13
      # First parse value as if blur will be done
      @handleBlur()

      if @props.onEnter
        @props.onEnter(ev)
        ev.preventDefault()

    if ev.keyCode == 9
      # First parse value as if blur will be done
      @handleBlur()

      if @props.onTab 
        @props.onTab(ev)
        # It's important to prevent the default behavior when handling tabs (or else the tab is applied after the focus change)
        ev.preventDefault()

  handleBlur: =>
    # Parse and set value if valid
    if @isValid()
      val = @getNumericValue()
      if val != @props.value
        @props.onChange?(val)

  getNumericValue: =>
    val = if @props.decimal then parseFloat(@state.inputText) else parseInt(@state.inputText)
    if isNaN(val)
      return null
    else
      # Round if necessary
      if @props.decimalPlaces?
        val = parseFloat(val.toFixed(@props.decimalPlaces))
    
    return val

  # Check regex matching of numbers
  isValid: ->
    if @state.inputText.length == 0
      return true

    if @props.decimal
      valid = @state.inputText.match(/^-?[0-9]*\.?[0-9]+$/) and not isNaN(parseFloat(@state.inputText))
      if not valid
        return false
    else
      valid = @state.inputText.match(/^-?\d+$/)

      if not valid
        return false
    
    val = @getNumericValue()
    
    if val and @props.max? and val > @props.max
      return false
    
    if val and @props.min? and val < @props.min
      return false

    return true

  render: ->
    # Display red border if not valid
    style = _.clone(@props.style or {})
    style.width = style.width or "8em"
    if not @isValid()
      style.borderColor = "#a94442"
      style.boxShadow = "inset 0 1px 1px rgba(0,0,0,.075)"
      style.backgroundColor = "rgba(132, 53, 52, 0.12)" # Faded red

    inputType = if @props.decimal then "number" else "tel"

    # Special problem with Galaxy Tab 3V (SM-T116NU) missing decimal place
    if @props.decimal and navigator.userAgent.match(/SM-/)
      inputType = "text"

    R 'input',
      ref: (c) => @input = c
      type: inputType
      className: "form-control #{if @props.size then "input-#{@props.size}" else ""}"
      lang: "en"
      style: style
      value: @state.inputText
      onChange: if @props.onChange then (ev) => @setState(inputText: ev.target.value) else (->)
      onBlur: @handleBlur
      onKeyDown: @handleKeyDown
      placeholder: @props.placeholder
      disabled: not @props.onChange?

# Indented section than can be opened and closed. Defaults closed
exports.CollapsibleSection = class CollapsibleSection extends React.Component
  @propTypes:
    initiallyOpen: PropTypes.bool
    label: PropTypes.node  # Label to display
    labelMuted: PropTypes.bool  # True to mute label
    hint: PropTypes.node # Hint to append to label. Makes label faded if only hint presented

  constructor: (props) ->
    super(props)

    @state = {
      open: props.initiallyOpen or false
    }

  handleToggle: =>
    @setState(open: not @state.open)

  render: ->
    R 'div', className: "form-group",
      R 'label', key: "label", onClick: @handleToggle, style: { cursor: "pointer" },
        if @state.open
          R 'i', className: "fa fa-fw fa-caret-down #{if @props.labelMuted then "text-muted"}"
        else
          R 'i', className: "fa fa-fw fa-caret-right #{if @props.labelMuted then "text-muted"}"

        if @props.labelMuted
          R 'span', className: "text-muted", @props.label
        else
          @props.label

        if @props.hint
          R 'span', className: "text-muted", style: { fontWeight: if @props.label then "normal" },
            if @props.label
              " - "
            @props.hint

      if @state.open
        R 'div', key: "contents", style: { marginLeft: 5 }, 
          @props.children
    
# Displays bootstrap pills with one active    
exports.NavPills = class NavPills extends React.Component
  @propTypes:
    pills: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired  # Id of the tab
      label: PropTypes.node.isRequired  # Label of the tab
      href: PropTypes.string           # href optional
      }))

    activePill: PropTypes.string
    onPillClick: PropTypes.func        # Called with id

  render: ->
    R 'ul', className: "nav nav-pills", 
      _.map @props.pills, (pill) =>
        R 'li', key: pill.id, className: (if pill.id == @props.activePill then "active" else ""),
          R 'a', href: pill.href, onClick: (=> @props.onPillClick?(pill.id)),
            pill.label

# Button toggle component
exports.Toggle = class Toggle extends React.Component
  @propTypes:
    value: PropTypes.any
    options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.any, label: PropTypes.node.isRequired })).isRequired
    onChange: PropTypes.func
    size: PropTypes.string  # "xs", "sm"
    allowReset: PropTypes.bool

  renderOption: (option, index) =>
    value = if ((@props.value == option.value) and @props.allowReset) then null else option.value
    btnClasses = classnames("btn", {
      "btn-default": not (@props.value == option.value),
      "btn-primary": (@props.value == option.value),
      active: (@props.value == option.value)
    })

    props = 
      key: index
      type: "button"
      className: btnClasses
    
    if not (@props.value == option.value) or @props.allowReset
      props['onClick'] = (if @props.onChange then @props.onChange.bind(null, value) else null)

    R 'button', props,
      option.label

  render: ->
    R 'div', className: "btn-group #{if @props.size then "btn-group-#{@props.size}" else ""}",
      _.map @props.options, @renderOption

